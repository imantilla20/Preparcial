"use client";
import Link from "next/link";
import { useDictionary } from "@/context/DictionaryContext";
import { buttonClass } from "@/lib/styles";

function ErrorMessage({ message }: { message: string }) {
    const { dict, lang } = useDictionary();
    return (
        <section className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 py-20 text-center">
            <span aria-hidden="true" className="grid size-16 place-items-center rounded-full border-2 border-lyons bg-piercing font-display text-3xl font-black text-sleeve shadow-print-sm">
                !
            </span>
            <p className="text-lg">{message}</p>
            <Link href={`/${lang}`} className={buttonClass("primary", "md")}>
                {dict.actions.back}
            </Link>
        </section>
    );
}

export default ErrorMessage;