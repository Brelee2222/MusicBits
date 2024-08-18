import type { MusicalSymbol } from "../MusicalSymbol";
import type { BeatData, NoteData } from "./beatData";

export abstract class Beat implements MusicalSymbol {
    readonly data : NoteData | BeatData;

    constructor(data : NoteData | BeatData) {
        this.data = data;
    }

    static makeBeat<T extends Beat>(BeatType : T, data : NoteData) : T {
        return new (BeatType as any)(data) as T;
    }

    abstract readonly beats : number;
}