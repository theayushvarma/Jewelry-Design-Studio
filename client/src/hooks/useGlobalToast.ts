import { addToast } from "@heroui/react";

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastType;
}

export default function useGlobalToast() {
  const showToast = (options: ToastOptions) => {
    addToast({
      title: options.title,
      description: options.description,
      color: options.variant.toLowerCase(),
    });
  };

  return { showToast };
}
