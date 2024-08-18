import type { MusicalSymbol } from "../MusicalSymbol";

export interface Clef extends MusicalSymbol {
    readonly octave : number;
}