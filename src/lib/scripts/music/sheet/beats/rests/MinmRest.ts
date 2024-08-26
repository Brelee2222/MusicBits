import { RestBeat } from "./RestBeat";

export class MinmRest extends RestBeat {
    readonly beats = 2;

    getWidth(): number {
        return 20;
    }
    getHeight(): number {
        return 20;
    }
    getSVGPath(): string {
        return "/rests/MinmRest.svg";
    }
}