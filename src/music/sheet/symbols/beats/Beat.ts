import { MusicalSymbol } from "../MusicalSymbol";

export interface Beat extends MusicalSymbol {
    readonly beats : number;
    readonly dotted : boolean;
}