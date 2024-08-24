import { NoteBeat } from "./NoteBeat";

// Breve note with 0 breves can be treated as a semi-breve note.

export class BreveNote extends NoteBeat {
    readonly beats : number = 4 << this.data.value;
    readonly showStem: boolean = false;

    getWidth(): number {
        return 28.875;
    }

    getHeight(): number {
        return 21;
    }

    getSVGPath(): string {
        return "/notes/semiBreveNote.svg";
    }
}