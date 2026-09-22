"use client";
import { usePathname, useRouter } from "next/navigation";
import { useDictionary } from "@/context/DictionaryContext";
import { i18n } from "@/i18n-config";
import { saveLocale } from "@/lib/locale-cookie";

function LanguageSwitcher() {
    const { dict, lang } = useDictionary();
    const pathname = usePathname();
    const router = useRouter();

    const changeLanguage = (newLang: string) => {
        saveLocale(newLang); 
        const segments = pathname.split("/");
        segments[1] = newLang; 
        router.push(segments.join("/"));
    };

    return (
        <div role="group" aria-label={dict.language.label} className="flex rounded-full border-2 border-lyons bg-sleeve p-1 shadow-print-sm">
            {i18n.locales.map((l) => (
                <button
                    key={l}
                    onClick={() => changeLanguage(l)}
                    aria-pressed={l === lang}
                    className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                        l === lang ? "bg-lyons text-mikado" : "hover:bg-kraft"
                    }`}
                >
                    {dict.language[l]}
                </button>
            ))}
        </div>
    );
}

export default LanguageSwitcher;