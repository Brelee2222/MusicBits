import { Note } from "../Note";
import { Accidental } from "../types";

export class HalfNote extends Note {
    beats = 1/2;

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