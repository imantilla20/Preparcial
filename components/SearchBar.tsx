"use client";
import { useState, useEffect } from "react";
import { useDictionary } from "@/context/DictionaryContext";
import { inputClass } from "@/lib/styles";

function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    const { dict } = useDictionary();
    const [termino, setTermino] = useState("");

    
    useEffect(() => {
        const timer = setTimeout(() => onSearch(termino), 300);
        return () => clearTimeout(timer);
    }, [termino, onSearch]);

    return (
        <input
            type="search"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            placeholder={dict.home.search}
            aria-label={dict.home.searchLabel}
            className={inputClass}
        />
    );
}

export default SearchBar;