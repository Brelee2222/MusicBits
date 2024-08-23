import { GENERIC_NOTE_DIMENSIONS, GENERIC_NOTE_SVG_PATH } from "./consts";
import { NoteBeat } from "./NoteBeat";

export class CrotchetNote extends NoteBeat {
    readonly beats = 1;

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