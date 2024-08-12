import { Note } from "../Note";
import { Accidental } from "../types";

export class DoubleNote extends Note {
    beats = 2;

    pitch: number;
    accidental: Accidental;
    staccato: boolean;

    constructor(pitch : number, accidental : Accidental, staccato : boolean) {
        super();
        this.accidental = accidental;
        this.pitch = pitch;
        this.staccato = staccato;
    }
}