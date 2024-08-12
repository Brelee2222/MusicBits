import { Note } from "../Note";
import { Accidental } from "../types";

export class QuaverNote extends Note {
    beats = 1/8;

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