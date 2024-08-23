import { GENERIC_NOTE_DIMENSIONS } from "./consts";
import { NoteBeat } from "./NoteBeat";

export class MinmNote extends NoteBeat {
    readonly beats = 2;

    getWidth(): number {
        return GENERIC_NOTE_DIMENSIONS.WIDTH;
    }

    getHeight(): number {
        return GENERIC_NOTE_DIMENSIONS.HEIGHT;
    }

    getSVGPath(): string {
        return "/notes/minmNote.svg";
    }
}