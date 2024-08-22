import { GENERIC_NOTE_WIDTH } from "./consts";
import { NoteBeat } from "./NoteBeat";

export class MinmNote extends NoteBeat {
    readonly beats = 2;

    getWidth(): number {
        return GENERIC_NOTE_WIDTH;
    }

    getSVGPath(): string {
        return "/notes/minmNote.svg";
    }
}