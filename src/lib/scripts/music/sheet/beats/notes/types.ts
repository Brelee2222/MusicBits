type Accidental = "flat" | "sharp" | "natural";

type NotePitch = number;

export type Note = {
    pitch : NotePitch,
    accidental : Accidental,
};