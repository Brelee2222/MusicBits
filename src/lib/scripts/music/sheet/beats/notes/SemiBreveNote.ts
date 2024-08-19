import { NoteBeat } from "./NoteBeat";

export class SemiBreveNote extends NoteBeat {
    readonly beats = 4;
    readonly showStem: boolean = false;
}