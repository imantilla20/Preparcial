"use client";
import { useDictionary } from "@/context/DictionaryContext";
import { buttonClass } from "@/lib/styles";

interface FavoriteButtonProps {
    isFavorite: boolean;
    onToggle: () => void;
    size?: "sm" | "md";
}

function FavoriteButton({ isFavorite, onToggle, size = "sm" }: FavoriteButtonProps) {
    const { dict } = useDictionary();
    return (
        <button
            onClick={onToggle}
            aria-pressed={isFavorite}
            className={buttonClass(isFavorite ? "favorite" : "ghost", size)}
        >
            {isFavorite ? dict.actions.favorite : dict.actions.addFavorite}
        </button>
    );
}

export default FavoriteButton;