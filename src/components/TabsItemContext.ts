import { createContext } from 'react';

type ItemState = {
  id: string | undefined;
  selected: boolean;
  selectedClassName?: string;
} & (
  | {
      kind: 'tab';
      focus: boolean;
      disabledClassName?: string;
      registerNode: (node: HTMLLIElement | null) => void;
    }
  | { kind: 'panel'; forceRender?: boolean }
);

// Reset the item context at each group and inside each item's content.
export const TabsItemContext = createContext<ItemState | null>(null);
