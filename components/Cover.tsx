"use client";
import { useState } from "react";
import { Serie } from "@/types/series";
import { swatchFor } from "@/lib/palette";


function Cover({ serie }: { serie: Serie }) {
    const [failed, setFailed] = useState(false);
    const swatch = swatchFor(serie.id);

    if (!serie.image || failed) {
        return (
            <div className={`flex size-full flex-col justify-between p-4 pr-12 ${swatch.bg} ${swatch.text}`}>
                <span className="font-display text-xl leading-tight font-black sm:text-2xl">{serie.title}</span>
                <span className="text-xs font-semibold opacity-80">{serie.platform}</span>
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element -- URLs externas arbitrarias del usuario
        <img src={serie.image} alt={serie.title} onError={() => setFailed(true)} className="size-full object-cover" />
    );
}

export default Cover;