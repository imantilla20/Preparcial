
"use client";
import { useState } from "react";
import { SerieFormData } from "@/types/series";
import { GENRES } from "@/data/genres";
import { useDictionary } from "@/context/DictionaryContext";
import { buttonClass, inputClass, labelClass } from "@/lib/styles";

type Field = keyof SerieFormData;
type FormErrors = Partial<Record<Field, string>>;
type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const EMPTY_FORM: SerieFormData = {
    title: "",
    genre: "",
    seasons: "",
    platform: "",
    rating: "",
    image: "",
    description: "",
};

interface SerieFormProps {
    initialData?: SerieFormData;
    onSubmit: (data: SerieFormData) => void;
}

function SerieForm({ initialData, onSubmit }: SerieFormProps) {
    const { dict } = useDictionary();
    const [form, setForm] = useState<SerieFormData>(initialData ?? EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});


    const validateField = (name: Field, value: string): string => {
        switch (name) {
            case "title":
                return value.trim() ? "" : dict.form.errTitle;
            case "genre":
                return value ? "" : dict.form.errGenre;
            case "seasons":
                return Number.isInteger(Number(value)) && Number(value) >= 1 ? "" : dict.form.errSeasons;
            case "rating":
                return value && Number(value) >= 1 && Number(value) <= 10 ? "" : dict.form.errRating;
            case "platform":
                return value.trim() ? "" : dict.form.errPlatform;
            case "image":
                return !value || /^https?:\/\//.test(value.trim()) ? "" : dict.form.errImage;
            case "description":
                return value.length <= 300 ? "" : dict.form.errDescription;
            default:
                return "";
        }
    };

    
    const handleChange = (e: React.ChangeEvent<FieldElement>) => {
        const name = e.target.name as Field;
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    
    const handleBlur = (e: React.FocusEvent<FieldElement>) => {
        const name = e.target.name as Field;
        setErrors((prev) => ({ ...prev, [name]: validateField(name, e.target.value) }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};
        (Object.keys(form) as Field[]).forEach((name) => {
            const error = validateField(name, form[name]);
            if (error) newErrors[name] = error;
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(form);
            
            setForm(EMPTY_FORM);
            setErrors({});
        }
    };

    
    const fieldProps = (name: Field) => ({
        id: name,
        name,
        value: form[name],
        onChange: handleChange,
        onBlur: handleBlur,
        "aria-invalid": Boolean(errors[name]),
        "aria-describedby": errors[name] ? `${name}-error` : undefined,
        className: inputClass,
    });

    const errorText = (name: Field) =>
        errors[name] ? (
            <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-piercing">
                {errors[name]}
            </p>
        ) : null;

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-2xl space-y-5 rounded-2xl border-2 border-lyons bg-sleeve/60 p-6 shadow-print sm:p-8"
        >
            <div>
                <label htmlFor="title" className={labelClass}>{dict.form.title}</label>
                <input {...fieldProps("title")} placeholder={dict.form.titlePh} />
                {errorText("title")}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="genre" className={labelClass}>{dict.form.genre}</label>
                    <select {...fieldProps("genre")}>
                        <option value="">{dict.form.selectGenre}</option>
                        {GENRES.map((g) => (
                            <option key={g} value={g}>{dict.genres[g]}</option>
                        ))}
                    </select>
                    {errorText("genre")}
                </div>
                <div>
                    <label htmlFor="platform" className={labelClass}>{dict.form.platform}</label>
                    <input {...fieldProps("platform")} placeholder={dict.form.platformPh} />
                    {errorText("platform")}
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="seasons" className={labelClass}>{dict.form.seasons}</label>
                    <input {...fieldProps("seasons")} type="number" min="1" />
                    {errorText("seasons")}
                </div>
                <div>
                    <label htmlFor="rating" className={labelClass}>{dict.form.rating}</label>
                    <input {...fieldProps("rating")} type="number" step="0.1" min="1" max="10" />
                    {errorText("rating")}
                </div>
            </div>

            <div>
                <label htmlFor="image" className={labelClass}>{dict.form.image}</label>
                <input {...fieldProps("image")} placeholder={dict.form.imagePh} />
                {errorText("image")}
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>{dict.form.description}</label>
                <textarea {...fieldProps("description")} rows={4} />
                <p className="mt-1 text-right text-xs text-lyons/60">{form.description.length}/300</p>
                {errorText("description")}
            </div>

            <button type="submit" className={buttonClass("primary", "md")}>
                {dict.actions.save}
            </button>
        </form>
    );
}

export default SerieForm;
