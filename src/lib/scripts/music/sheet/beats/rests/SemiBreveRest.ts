import { RestBeat } from "./RestBeat";

export class SemiBreveRest extends RestBeat {
    readonly beats = 4;

    getWidth(): number {
        return 20;
    }
    getHeight(): number {
        return 20;
    }
    getSVGPath(): string {
        return "/rests/SemiBreveRest.svg";
    }
}