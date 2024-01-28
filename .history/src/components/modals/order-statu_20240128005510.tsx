"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@nextui-org/react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  statu: boolean;
}

export const OrderStausAlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  statu
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setstatu] = useState(statu);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Update Status"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
        <Checkbox checked={status} onChange={()=>setstatu(!status)}/>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>Continue</Button>
      </div>
    </Modal>
  );
};
