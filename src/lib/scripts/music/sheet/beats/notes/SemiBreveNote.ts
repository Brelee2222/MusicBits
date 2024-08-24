import { NoteBeat } from "./NoteBeat";

export class SemiBreveNote extends NoteBeat {
    readonly beats = 4;
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