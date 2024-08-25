import type { MusicalSymbol } from "./MusicalSymbol";
import { Beat } from "./beats";

export class Measure {
    id : string = "";

    symbols : MusicalSymbol[] = [];

    beats : Beat[] = [];
}