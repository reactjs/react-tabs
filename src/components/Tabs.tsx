import cx from 'clsx';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { findTabTarget, getTabCollection } from '../helpers/tabCollection';
import type { TabEvent, TabKey, TabsProps } from '../types';
import { isTabKey, TabsContext } from './TabsContext';

const keyCodes: Record<number, string> = {
  13: 'Enter',
  32: 'Space',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
};

interface Availability {
  key: TabKey;
  paired: boolean;
  firstEnabled: TabKey | undefined;
}

interface Recovery {
  key: TabKey;
  previousKey: TabKey;
}

const Tabs = (props: TabsProps) => {
  const {
    children,
    className = 'react-tabs',
    defaultFocus = false,
    defaultKey,
    direction,
    disabledTabClassName,
    disableUpDownKeys,
    disableLeftRightKeys,
    domRef,
    environment,
    focusTabOnClick = true,
    forceRenderTabPanel,
    onSelect,
    selectedKey: controlledKey,
    selectedTabClassName,
    selectedTabPanelClassName,
    ...attributes
  } = props;

  const controlled = controlledKey !== undefined;
  const [isControlled] = useState(controlled);
  const initialKey = controlledKey ?? defaultKey;
  if (!isTabKey(initialKey) || (controlled && defaultKey !== undefined)) {
    throw new Error(
      'Tabs requires either selectedKey or defaultKey with a nonempty string or finite numeric key.',
    );
  }
  if ('selectedIndex' in props || 'defaultIndex' in props) {
    throw new Error(
      'Use selectedKey or defaultKey instead of selectedIndex or defaultIndex.',
    );
  }
  if (onSelect !== undefined && typeof onSelect !== 'function') {
    throw new Error('Tabs onSelect must be a function.');
  }
  if (controlled && typeof onSelect !== 'function') {
    throw new Error('Tabs requires onSelect when selectedKey is provided.');
  }
  if (isControlled !== controlled) {
    throw new Error(
      'Tabs cannot switch between controlled and uncontrolled mode.',
    );
  }

  const [localKey, setLocalKey] = useState(initialKey);
  const [availability, setAvailability] = useState<Availability>();
  const [focusRequest, setFocusRequest] = useState<{ key: TabKey }>();
  const handledFocusRequestRef = useRef(focusRequest);
  const previousSelectionRef = useRef<TabKey | undefined>(undefined);
  const checkedInitialFocusRef = useRef(false);
  const pendingRecoveryRef = useRef<Recovery | undefined>(undefined);
  const reportedProblemsRef = useRef(new Set<string>());
  const rootRef = useRef<HTMLDivElement | null>(null);
  const id = useId();
  const setRoot = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      domRef?.(node);
    },
    [domRef],
  );

  const requestedKey = controlledKey ?? localKey;
  const missing = availability?.key === requestedKey && !availability.paired;
  const selectedKey = missing ? undefined : requestedKey;
  const fallbackKey = missing ? availability.firstEnabled : undefined;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const refresh = () => {
      const { entries, problems } = getTabCollection(root);
      if (process.env.NODE_ENV !== 'production') {
        for (const problem of problems) {
          // eslint-disable-next-line no-console
          if (!reportedProblemsRef.current.has(problem)) console.error(problem);
        }
        reportedProblemsRef.current = problems;
      }
      const paired = entries.some(({ key }) => key === requestedKey);
      const firstEnabled = entries.find(({ disabled }) => !disabled)?.key;
      if (!isControlled && !paired && firstEnabled !== undefined) {
        pendingRecoveryRef.current = {
          key: firstEnabled,
          previousKey: pendingRecoveryRef.current?.previousKey ?? requestedKey,
        };
        setLocalKey(firstEnabled);
        return;
      }
      setAvailability((current) =>
        current?.key === requestedKey &&
        current.paired === paired &&
        current.firstEnabled === firstEnabled
          ? current
          : { key: requestedKey, paired, firstEnabled },
      );
    };

    const Observer = root.ownerDocument.defaultView?.MutationObserver;
    const observer = Observer && new Observer(refresh);
    observer?.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        'aria-disabled',
        'data-rttab',
        'data-rttabpanel',
        'data-rttablist',
      ],
    });
    refresh();
    return () => observer?.disconnect();
  }, [children, isControlled, requestedKey]);

  useEffect(() => {
    const recovery = pendingRecoveryRef.current;
    if (
      recovery &&
      recovery.key === selectedKey &&
      availability?.key === selectedKey &&
      availability.paired
    ) {
      pendingRecoveryRef.current = undefined;
      onSelect?.(recovery.key, recovery.previousKey, undefined);
    }
  }, [availability, onSelect, selectedKey]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const initialFocus = !checkedInitialFocusRef.current && defaultFocus;
    checkedInitialFocusRef.current = true;
    const explicitFocus =
      focusRequest !== handledFocusRequestRef.current &&
      focusRequest?.key === selectedKey;
    handledFocusRequestRef.current = focusRequest;
    const selectionChanged = previousSelectionRef.current !== selectedKey;
    previousSelectionRef.current = selectedKey;
    if (
      selectedKey === undefined ||
      (!initialFocus && !explicitFocus && !selectionChanged)
    )
      return;

    const { entries } = getTabCollection(root);
    const selected = entries.find(({ key }) => key === selectedKey);
    if (initialFocus || explicitFocus) {
      selected?.node.focus();
    } else {
      // Reading activeElement may fail in a detached or cross-origin frame.
      let active: Element | null;
      try {
        active = (environment?.document ?? root.ownerDocument).activeElement;
      } catch {
        return;
      }
      if (entries.some(({ node }) => node === active)) selected?.node.focus();
    }
  }, [defaultFocus, environment, focusRequest, selectedKey]);

  function select(key: TabKey, event: TabEvent) {
    if (onSelect?.(key, requestedKey, event) === false) return;
    if (focusTabOnClick) setFocusRequest({ key });
    if (!isControlled) {
      pendingRecoveryRef.current = undefined;
      setLocalKey(key);
    }
  }

  function handleClick(event: TabEvent) {
    const { entries } = getTabCollection(event.currentTarget);
    const target = findTabTarget(entries, event.target);
    if (target && !target.disabled) select(target.key, event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const { entries } = getTabCollection(event.currentTarget);
    const target = findTabTarget(entries, event.target);
    if (!target) return;
    const key = keyCodes[event.keyCode] ?? (event.code || event.key);
    if (key === 'Enter' || key === 'Space' || key === ' ') {
      event.preventDefault();
      if (!target.disabled) select(target.key, event);
      return;
    }

    if (key === 'Home' || key === 'End') {
      event.preventDefault();
      const enabled = key === 'Home' ? entries : entries.reverse();
      const next = enabled.find(({ disabled }) => !disabled);
      if (next) select(next.key, event);
      return;
    }

    const horizontal = key === 'ArrowLeft' || key === 'ArrowRight';
    const vertical = key === 'ArrowUp' || key === 'ArrowDown';
    if (
      !(horizontal && !disableLeftRightKeys) &&
      !(vertical && !disableUpDownKeys)
    )
      return;

    event.preventDefault();
    const movesForward = key === 'ArrowRight' || key === 'ArrowDown';
    const step = movesForward !== (direction === 'rtl') ? 1 : -1;
    const start = entries.findIndex((entry) => entry.key === selectedKey);
    const origin = start === -1 ? entries.indexOf(target) : start;
    for (let distance = 1; distance <= entries.length; distance++) {
      const next =
        entries[(origin + step * distance + entries.length) % entries.length];
      if (!next.disabled) {
        select(next.key, event);
        return;
      }
    }
  }

  return (
    <div
      {...attributes}
      className={cx(className)}
      dir={attributes.dir ?? direction}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={setRoot}
      data-rttabs
    >
      <TabsContext.Provider
        value={{
          id,
          selectedKey,
          fallbackKey,
          disabledTabClassName,
          selectedTabClassName,
          selectedTabPanelClassName,
          forceRenderTabPanel,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
};

export default Tabs;
