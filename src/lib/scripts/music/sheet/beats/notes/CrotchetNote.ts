import { GENERIC_NOTE_SVG_PATH, GENERIC_NOTE_WIDTH } from "./consts";
import { NoteBeat } from "./NoteBeat";

export class CrotchetNote extends NoteBeat {
    readonly beats = 1;

    getWidth(): number {
        return GENERIC_NOTE_WIDTH;
    }

    getSVGPath(): string {
        return GENERIC_NOTE_SVG_PATH;
    }
}