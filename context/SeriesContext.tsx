"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Serie, SerieFormData } from "@/types/series";
import { mockSeries } from "@/data/mockSeries";

const STORAGE_KEY = "series";

interface SeriesContextType {
    series: Serie[];
    loading: boolean;
    addSerie: (data: SerieFormData) => void;
    updateSerie: (id: number, data: SerieFormData) => void;
    deleteSerie: (id: number) => void;
    toggleFavorite: (id: number) => void;
    getSerieById: (id: number) => Serie | undefined;
}

const SeriesContext = createContext<SeriesContextType | null>(null);

function toSerie(data: SerieFormData) {
    return {
        title: data.title.trim(),
        genre: data.genre,
        seasons: parseInt(data.seasons),
        platform: data.platform.trim(),
        rating: parseFloat(data.rating),
        image: data.image.trim(),
        description: data.description.trim(),
    };
}

export function SeriesProvider({ children }: { children: ReactNode }) {
    
    const [series, setSeries] = useState<Serie[]>([]);
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        let initial: Serie[] = mockSeries;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) initial = JSON.parse(stored);
        } catch (error) {
            console.warn("Error leyendo localStorage:", error);
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con un sistema externo (localStorage)
        setSeries(initial);
        setLoading(false);
    }, []);

    
    useEffect(() => {
        if (loading) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(series));
        } catch (error) {
            console.warn("Error guardando en localStorage:", error);
        }
    }, [series, loading]);

    const addSerie = (data: SerieFormData) => {
        setSeries((prev) => [...prev, { id: Date.now(), favorite: false, ...toSerie(data) }]);
    };

    const updateSerie = (id: number, data: SerieFormData) => {
        setSeries((prev) => prev.map((s) => (s.id === id ? { ...s, ...toSerie(data) } : s)));
    };

    const deleteSerie = (id: number) => {
        setSeries((prev) => prev.filter((s) => s.id !== id));
    };

    const toggleFavorite = (id: number) => {
        setSeries((prev) => prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s)));
    };

    const getSerieById = (id: number) => series.find((s) => s.id === id);

    return (
        <SeriesContext.Provider
            value={{ series, loading, addSerie, updateSerie, deleteSerie, toggleFavorite, getSerieById }}
        >
            {children}
        </SeriesContext.Provider>
    );
}

export function useSeries() {
    const context = useContext(SeriesContext);
    if (!context) throw new Error("useSeries debe usarse dentro de un SeriesProvider");
    return context;
}