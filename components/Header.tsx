import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { stripeColors } from "@/lib/palette";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
    dict: Dictionary;
    lang: Locale;
}

function Header({ dict, lang }: HeaderProps) {
    return (
        <header>
            {/* Franjas con los 6 colores de la paleta */}
            <div className="flex h-2" aria-hidden="true">
                {stripeColors.map((c) => (
                    <div key={c} className={`flex-1 ${c}`} />
                ))}
            </div>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                <Link href={`/${lang}`} className="font-display text-2xl font-black">
                    {dict.meta.title}
                </Link>
                <LanguageSwitcher />
            </div>
        </header>
    );
}

export default Header;