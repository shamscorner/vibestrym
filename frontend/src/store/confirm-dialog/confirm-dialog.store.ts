import { create } from "zustand";
import type { ConfirmItem } from "./confirm-dialog.type";

type ConfirmStore = {
  isOpen: boolean;
  item: ConfirmItem | null;
  openConfirm: (item: ConfirmItem) => void;
  closeConfirm: () => void;
  executeAction: () => Promise<void>;
};

export const useConfirmStore = create<ConfirmStore>((set, get) => ({
  isOpen: false,
  item: null,
  openConfirm: (item: ConfirmItem) => {
    set({ item, isOpen: true });
  },
  closeConfirm: () => {
    set({ isOpen: false, item: null });
  },
  executeAction: async () => {
    const { item } = get();
    if (!item) return;

    try {
      const success = await item.action();
      if (success && item.onSuccess) {
        item.onSuccess();
      }
    } finally {
      get().closeConfirm();
    }
  },
}));
