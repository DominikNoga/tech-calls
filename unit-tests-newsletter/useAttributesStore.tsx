import { create } from 'zustand';
import { Attribute } from '@worklogs/forge/src/typescript/types/Attribute';

interface AttributesStoreState {
  attributes: Attribute[];
}

interface AttributesActions {
  addAttribute: (attribute: Attribute) => void;
  setAttributes: (attributes: Attribute[]) => void;
  reset: () => void;
}

export type AttributesState = AttributesStoreState & {
  actions: AttributesActions;
};

const initialState: AttributesStoreState = {
  attributes: [],
};

export const useAttributesStore = create<AttributesState>((set) => ({
  ...initialState,

  actions: {
    addAttribute: (attribute: Attribute) => {
      set((state) => ({
        attributes: [...state.attributes, attribute],
      }));
    },
    setAttributes: (attributes: Attribute[]) => {
      set({ attributes });
    },
    reset: () => {
      set(initialState);
    },
  },
}));
