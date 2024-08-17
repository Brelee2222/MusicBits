import { Rest } from "./Rest";

export class QuaverRest extends Rest {
    readonly beats : number;
    readonly quavers : number;

    constructor(dotted : boolean, quavers : number) {
        super(dotted);

        this.quavers = quavers;
        this.beats = 1/(4 << quavers);
    }
}