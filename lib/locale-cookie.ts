import { i18n } from "@/i18n-config";

export function saveLocale(lang: string) {
    document.cookie = `${i18n.cookieName}=${lang}; path=/; max-age=31536000; samesite=lax`;
}