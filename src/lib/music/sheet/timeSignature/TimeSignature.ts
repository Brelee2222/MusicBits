import type { MusicalSymbol } from "../MusicalSymbol";

export interface TimeSignature extends MusicalSymbol {
    readonly overhand : number;
    readonly underhand : number;
}