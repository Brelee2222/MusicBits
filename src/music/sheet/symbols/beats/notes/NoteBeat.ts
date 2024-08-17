import { Beat } from "../Beat";
import { Note } from "./types";

export abstract class NoteBeat implements Beat {
    abstract readonly beats: number;
    readonly dotted: boolean;

    notes: Note[];
    staccato: boolean;

    constructor(dotted : boolean, staccato : boolean, notes : Note[]) {
        this.dotted = dotted;
        
        this.notes = notes;
        this.staccato = staccato;
    }

    getBeats(): number {
        return this.dotted ? this.beats * 1.5 : this.beats;
    }
}