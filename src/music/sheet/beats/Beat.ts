import { MusicalSymbol } from "../MusicalSymbol";
import { BeatData, NoteData } from "./types";

export abstract class Beat implements MusicalSymbol {
    readonly data : NoteData | BeatData;

    constructor(data : NoteData | BeatData) {
        this.data = data;
    }

    abstract readonly beats : number;
}