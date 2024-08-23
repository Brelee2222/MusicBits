import { GENERIC_NOTE_DIMENSIONS, GENERIC_NOTE_SVG_PATH } from "./consts";
import { NoteBeat } from "./NoteBeat";

// Quaver Note with 0 quavers can be treated as a crotchet note.

export class QuaverNote extends NoteBeat {
    readonly beats = 1/(1 << this.data.value);

    beam? : QuaverNote[];

    getWidth(): number {
        return GENERIC_NOTE_DIMENSIONS.WIDTH;
    }

    getHeight(): number {
        return GENERIC_NOTE_DIMENSIONS.HEIGHT;
    }

    getSVGPath(): string {
        return GENERIC_NOTE_SVG_PATH;
    }
}