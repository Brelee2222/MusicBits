import type { MusicalSymbol } from "../MusicalSymbol";
import type { BeatData, NoteData } from "./beatData";

export abstract class Beat implements MusicalSymbol {
    readonly data : NoteData | BeatData;

    constructor(data : NoteData | BeatData) {
        this.data = data;
    }

    static makeBeat<T extends Beat>(BeatConstructor : new (data : NoteData | BeatData) => T, data : NoteData | BeatData) : T {
        return new BeatConstructor(data);
    }

    abstract readonly beats : number;
}