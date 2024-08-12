import { Beat } from "../Beat";
import { Note } from "./types";

export abstract class NoteBeat implements Beat {
    abstract readonly beats: number;
    readonly dotted: boolean;

    note: Note;
    staccato: boolean;

    constructor(dotted : boolean, staccato : boolean, note : Note) {
        this.dotted = dotted;
        this.note = note;
        this.staccato = staccato;
    }
}