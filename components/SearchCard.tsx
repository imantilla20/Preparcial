"use client";
import { useState } from "react";
import Link from "next/link";
import { Serie } from "@/types/series";
import { useDictionary } from "@/context/DictionaryContext";
import Cover from "./Cover";
import RatingSticker from "./RatingSticker";
import FavoriteButton from "./FavoriteButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ConfirmDialog from "./ConfirmDialog";

interface SeriesCardProps {
    serie: Serie;
    onDelete: () => void;
    onToggleFavorite: () => void;
}

function SeriesCard({ serie, onDelete, onToggleFavorite }: SeriesCardProps) {
    const { dict, lang } = useDictionary();
    const [showConfirm, setShowConfirm] = useState(false);
    const genre = dict.genres[serie.genre as keyof typeof dict.genres] ?? serie.genre;
    const seasonsLabel = serie.seasons === 1 ? dict.serie.seasonOne : dict.serie.seasons;

    return (
        <article className="group">
            <Link href={`/${lang}/series/${serie.id}`} className="relative block">
                <div className="aspect-[2/3] overflow-hidden rounded-md border-2 border-lyons shadow-print transition-transform group-hover:-translate-y-1">
                    <Cover serie={serie} />
                </div>
                <RatingSticker rating={serie.rating} className="absolute -top-3 -right-3" />
            </Link>

            <h2 className="mt-4 text-xl leading-tight font-bold">
                <Link href={`/${lang}/series/${serie.id}`} className="hover:underline">
                    {serie.title}
                </Link>
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-flat px-2.5 py-0.5 font-semibold text-sleeve">{genre}</span>
                <span>{serie.seasons} {seasonsLabel}</span>
            </div>
            <p className="mt-1 text-sm text-lyons/70">{serie.platform}</p>

            <div className="mt-3 flex flex-wrap gap-2">
                <FavoriteButton isFavorite={serie.favorite} onToggle={onToggleFavorite} />
                <EditButton seriesId={serie.id} />
                <DeleteButton onDelete={() => setShowConfirm(true)} />
            </div>

            {showConfirm && (
                <ConfirmDialog
                    message={dict.actions.confirmDelete}
                    onConfirm={() => {
                        onDelete();
                        setShowConfirm(false);
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </article>
    );
}

export default SeriesCard;