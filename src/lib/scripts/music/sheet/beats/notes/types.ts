type Accidental = "flat" | "sharp" | "natural" | "none";

type NoteLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Note = {
    letter : NoteLetter,
    accidental : Accidental,
    octave : number
};