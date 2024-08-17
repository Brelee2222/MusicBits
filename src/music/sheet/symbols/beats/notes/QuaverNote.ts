import { NoteBeat } from "./NoteBeat";
import { Note } from "./types";

export class QuaverNote extends NoteBeat {
    readonly beats : number;
    readonly quavers : number;

    constructor(dotted : boolean, quavers : number, staccato : boolean, notes : Note[]) {
        super(dotted, staccato, notes);
        this.quavers = quavers;

        this.beats = 1/(4 << quavers);
    }
}