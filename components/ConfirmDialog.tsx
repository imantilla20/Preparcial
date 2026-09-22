"use client";
import { useEffect } from "react";
import { useDictionary } from "@/context/DictionaryContext";
import { buttonClass } from "@/lib/styles";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
    const { dict } = useDictionary();


    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onCancel]);

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-lyons/60 p-4" onClick={onCancel}>
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-msg"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border-2 border-lyons bg-sleeve p-6 shadow-print"
            >
                <p id="confirm-msg" className="mb-6 text-lg font-semibold">{message}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} autoFocus className={buttonClass("ghost", "md")}>
                        {dict.actions.cancel}
                    </button>
                    <button onClick={onConfirm} className={buttonClass("danger", "md")}>
                        {dict.actions.confirm}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;