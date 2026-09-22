import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SeriesProvider } from "@/context/SeriesContext";
import { DictionaryProvider } from "@/context/DictionaryContext";
import Header from "@/components/Header";
import { getDictionary, hasLocale, locales } from "./dictionaries";

// Pre-genera /es y /en
export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

// Título de la pestaña también traducido
export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const dict = await getDictionary(lang);
    return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const dict = await getDictionary(lang); 
    return (
        <html lang={lang}>
            <body className="min-h-screen">
                <DictionaryProvider dict={dict} lang={lang}>
                    <Header dict={dict} lang={lang} />
                    <SeriesProvider>
                        <main>{children}</main>
                    </SeriesProvider>
                </DictionaryProvider>
            </body>
        </html>
    );
}