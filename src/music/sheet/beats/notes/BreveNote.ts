import { NoteBeat } from "./NoteBeat";

// Breve note with -1 breves can be treated as a semi-breve note.

export class BreveNote extends NoteBeat {
    readonly beats : number = 4 << (this.data.value + 1);
}