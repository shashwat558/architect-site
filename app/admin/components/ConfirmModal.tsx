"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { IconAlertTriangle, IconX } from "@tabler/icons-react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onCancel, 150);
  }, [onCancel]);

  const handleConfirm = useCallback(() => {
    setVisible(false);
    setTimeout(onConfirm, 150);
  }, [onConfirm]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={`relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transition-all duration-150 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <IconX size={16} />
        </button>

        {/* Icon + title */}
        <div className="flex items-start gap-4">
          {destructive && (
            <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
              <IconAlertTriangle size={20} className="text-red-600" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              destructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-slate-900 hover:bg-slate-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook returning a [modal element, openConfirm fn] tuple.
 * Usage:
 *   const [modal, confirm] = useConfirm();
 *   await confirm({ message: "Delete this?" });
 */
export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    message: string;
    title?: string;
    confirmLabel?: string;
    resolve?: (v: boolean) => void;
  }>({ open: false, message: "" });

  const confirm = useCallback(
    (opts: { message: string; title?: string; confirmLabel?: string }) => {
      return new Promise<boolean>((resolve) => {
        setState({ open: true, ...opts, resolve });
      });
    },
    []
  );

  const modal = (
    <ConfirmModal
      open={state.open}
      title={state.title}
      message={state.message}
      confirmLabel={state.confirmLabel}
      onConfirm={() => {
        setState((s) => ({ ...s, open: false }));
        state.resolve?.(true);
      }}
      onCancel={() => {
        setState((s) => ({ ...s, open: false }));
        state.resolve?.(false);
      }}
    />
  );

  return [modal, confirm] as const;
}
