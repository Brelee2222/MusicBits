import type { MusicalSymbol } from "./MusicalSymbol";
import { Beat } from "./beats";
import type { MeasureID } from "./types";

export class Measure {
    readonly measureID : MeasureID;

    symbols : MusicalSymbol[] = [];

    beats : Beat[] = [];
}