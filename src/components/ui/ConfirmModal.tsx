"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "default",
  isLoading = false,
}: ConfirmModalProps) {
  const [internalLoading, setInternalLoading] = React.useState(false);

  const handleConfirm = async () => {
    setInternalLoading(true);
    try {
      await onConfirm();
    } finally {
      setInternalLoading(false);
      onClose();
    }
  };

  const loading = isLoading || internalLoading;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !loading && !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden border-none shadow-2xl p-0 gap-0">
        <DialogHeader className="p-6 bg-muted/30">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${variant === 'destructive' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="p-6">
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            {description}
          </DialogDescription>
        </div>
        <DialogFooter className="p-6 pt-2 bg-muted/10 flex sm:justify-end gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="hover:bg-muted"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={loading}
            className={`min-w-[100px] shadow-lg ${variant === 'default' ? 'bg-primary hover:bg-primary/90' : ''}`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
