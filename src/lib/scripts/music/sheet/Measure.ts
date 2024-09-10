import type { MusicalSymbol } from "./MusicalSymbol";
import { Beat } from "./beats";
import type { MeasureID } from "./types";

const MAX_MEASURE_ID = 65025;

export class Measure {
    private static measures : {[key : MeasureID] : Measure} = {};

    private static generateMeasureID() : MeasureID {
        let measureID : MeasureID;

        do {
            measureID = `measure-${Math.floor(Math.random() * MAX_MEASURE_ID).toString(16)}`;
        } while(this.measures[measureID]);

        return measureID;
    }

    readonly measureID : MeasureID = Measure.generateMeasureID();

    symbols : MusicalSymbol[] = [];

    beats : Beat[] = [];
}