import type { HTMLProps, KeyboardEvent, MouseEvent } from 'react';

type ClassName = string | string[] | { [name: string]: boolean };
export type TabEvent =
  KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;

export type TabKey = string | number;

type OnSelect = (
  key: TabKey,
  previousKey: TabKey,
  event: TabEvent | undefined,
) => boolean | void;

interface TabsOptions extends Omit<
  HTMLProps<HTMLDivElement>,
  'className' | 'onSelect' | 'ref'
> {
  className?: ClassName | undefined;
  defaultFocus?: boolean | undefined;
  direction?: 'rtl' | 'ltr' | undefined;
  disabledTabClassName?: string | undefined;
  disableUpDownKeys?: boolean | undefined;
  disableLeftRightKeys?: boolean | undefined;
  domRef?: ((node: HTMLDivElement | null) => void) | undefined;
  environment?: Window | undefined;
  focusTabOnClick?: boolean | undefined;
  forceRenderTabPanel?: boolean | undefined;
  selectedTabClassName?: string | undefined;
  selectedTabPanelClassName?: string | undefined;
}

export type TabsProps = TabsOptions &
  (
    | { selectedKey: TabKey; defaultKey?: never; onSelect: OnSelect }
    | { selectedKey?: never; defaultKey: TabKey; onSelect?: OnSelect }
  );

export interface TabListProps extends Omit<
  HTMLProps<HTMLUListElement>,
  'className'
> {
  className?: ClassName | undefined;
}

export interface TabProps extends Omit<HTMLProps<HTMLLIElement>, 'className'> {
  itemKey: TabKey;
  className?: ClassName | undefined;
  disabled?: boolean | undefined;
  disabledClassName?: string | undefined;
  selectedClassName?: string | undefined;
}

export interface TabPanelProps extends Omit<
  HTMLProps<HTMLDivElement>,
  'className'
> {
  itemKey: TabKey;
  className?: ClassName | undefined;
  forceRender?: boolean | undefined;
  selectedClassName?: string | undefined;
}
