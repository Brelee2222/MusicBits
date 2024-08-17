import { Beat } from "../Beat";

export abstract class Rest implements Beat {
    abstract readonly beats: number;
    readonly dotted: boolean;

    constructor(dotted : boolean) {
        this.dotted = dotted;
    }
}