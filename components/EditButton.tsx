"use client";
import Link from "next/link";
import { useDictionary } from "@/context/DictionaryContext";
import { buttonClass } from "@/lib/styles";

function EditButton({ seriesId, size = "sm" }: { seriesId: number; size?: "sm" | "md" }) {
    const { dict, lang } = useDictionary();
    
    return (
        <Link href={`/${lang}/series/${seriesId}/edit`} className={buttonClass("edit", size)}>
            {dict.actions.edit}
        </Link>
    );
}

export default EditButton;