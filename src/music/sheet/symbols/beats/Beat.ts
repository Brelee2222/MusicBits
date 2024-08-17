import { MusicalSymbol } from "../MusicalSymbol";

export interface Beat extends MusicalSymbol {
    getBeats() : number;
    readonly dotted : boolean;
}