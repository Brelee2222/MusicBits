import { NoteBeat } from "./NoteBeat";

// Quaver Note with 0 quavers can be treated as a crotchet note.

export class QuaverNote extends NoteBeat {
    beam? : QuaverNote[];

    beats = 1/(1 << this.data.value);
}