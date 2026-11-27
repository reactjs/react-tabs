import type {
  FunctionComponent,
  HTMLProps,
  KeyboardEvent,
  MouseEvent,
} from 'react';

type ClassName = string | string[] | { [name: string]: boolean };
export type TabEvent =
  KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;

export interface TabsProps extends Omit<
  HTMLProps<HTMLDivElement>,
  'className' | 'onSelect' | 'ref'
> {
  className?: ClassName | undefined;
  defaultFocus?: boolean | undefined;
  defaultIndex?: number | undefined;
  direction?: 'rtl' | 'ltr' | undefined;
  disabledTabClassName?: string | undefined;
  disableUpDownKeys?: boolean | undefined;
  disableLeftRightKeys?: boolean | undefined;
  domRef?: ((node: HTMLDivElement | null) => void) | undefined;
  environment?: Window | undefined;
  focusTabOnClick?: boolean | undefined;
  forceRenderTabPanel?: boolean | undefined;
  onSelect?:
    | ((index: number, last: number, event: TabEvent) => boolean | void)
    | undefined;
  selectedIndex?: number | undefined;
  selectedTabClassName?: string | undefined;
  selectedTabPanelClassName?: string | undefined;
}

export interface TabListProps extends Omit<
  HTMLProps<HTMLUListElement>,
  'className'
> {
  className?: ClassName | undefined;
}

export interface TabProps extends Omit<HTMLProps<HTMLLIElement>, 'className'> {
  className?: ClassName | undefined;
  disabled?: boolean | undefined;
  disabledClassName?: string | undefined;
  selectedClassName?: string | undefined;
}

export interface TabPanelProps extends Omit<
  HTMLProps<HTMLDivElement>,
  'className'
> {
  className?: ClassName | undefined;
  forceRender?: boolean | undefined;
  selectedClassName?: string | undefined;
}

export interface ReactTabsFunctionComponent<
  P = Record<never, never>,
> extends FunctionComponent<P> {
  tabsRole: 'Tabs' | 'TabList' | 'Tab' | 'TabPanel';
}
