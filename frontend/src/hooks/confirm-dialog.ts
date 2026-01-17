import { captureException } from "@sentry/nextjs";
import { useConfirmStore } from "@/store/confirm-dialog/confirm-dialog.store";
import type { ConfirmItem } from "@/store/confirm-dialog/confirm-dialog.type";

export const useConfirmDialog = () => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const confirm = (item: Omit<ConfirmItem, "key"> & { key?: string }) => {
    const confirmItem: ConfirmItem = {
      ...item,
      key: item.key || `confirm-${Date.now()}-${Math.random()}`,
    };

    return new Promise<boolean>((resolve) => {
      const originalOnSuccess = confirmItem.onSuccess;
      const originalAction = confirmItem.action;

      confirmItem.action = async () => {
        try {
          const result = await originalAction();
          resolve(result);
          return result;
        } catch (error) {
          captureException(error, {
            extra: {
              action: "ConfirmDialog.confirm",
              confirmItem,
            },
          });
          resolve(false);
          throw error;
        }
      };

      confirmItem.onSuccess = () => {
        originalOnSuccess?.();
      };

      openConfirm(confirmItem);
    });
  };

  return { confirm };
};
