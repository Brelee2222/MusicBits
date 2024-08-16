import { NoteBeat } from "../NoteBeat";
import { Note } from "../types";

export class QuaverNote extends NoteBeat {
    readonly beats : number;
    readonly quavers : number;

    constructor(dotted : boolean, staccato : boolean, note : Note, quavers : number) {
        super(dotted, staccato, note);
        this.quavers = quavers;

        this.beats = 1/(4 << quavers);
    }
}