// src/hooks/useModal.ts
import { useDisclosure } from "@heroui/react";

export const useModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
  };
};
