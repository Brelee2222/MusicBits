import type { MusicalSymbol } from "./MusicalSymbol";
import { Beat } from "./beats";
import { MeasureID } from "./types";

export class Measure {
    readonly measureID : MeasureID;

    symbols : MusicalSymbol[] = [];

    beats : Beat[] = [];
}