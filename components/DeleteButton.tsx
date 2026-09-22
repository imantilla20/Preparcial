"use client";
import { useDictionary } from "@/context/DictionaryContext";
import { buttonClass } from "@/lib/styles";

function DeleteButton({ onDelete, size = "sm" }: { onDelete: () => void; size?: "sm" | "md" }) {
    const { dict } = useDictionary();
    return (
        <button onClick={onDelete} className={buttonClass("danger", size)}>
            {dict.actions.delete}
        </button>
    );
}

export default DeleteButton;