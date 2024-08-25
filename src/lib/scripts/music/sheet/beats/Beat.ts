import type { MusicalSymbol } from "../MusicalSymbol";
import type { BeatData, NoteData } from "./beatData";
import type { BeatID } from "./types";

const MAX_BEAT_ID = 65025;

export abstract class Beat implements MusicalSymbol {
    readonly beatID : BeatID;
    readonly data : NoteData | BeatData;

    private static beats : { [key: BeatID] : Beat } = {};

    private static generateBeatID() : BeatID {
        let beatID : BeatID;

        do {
            beatID = `beat-${Math.floor(Math.random() * MAX_BEAT_ID).toString(16)}`;
        } while(this.beats[beatID]);

        return beatID;
    }

    private static addBeat(beat : Beat) : BeatID {
        const beatID = this.generateBeatID();

        this.beats[beatID] = beat;

        return beatID;
    }

    static removeBeat(beatID : BeatID) : Beat | null{
        const beat = this.beats[beatID];

        if(!beat)
            return null;

        delete this.beats[beatID];

        return beat;
    }

    static getBeat(beatID : BeatID) : Beat | null {
        return this.beats[beatID] ?? null;
    }

    constructor(data : NoteData | BeatData) {
        this.beatID = Beat.generateBeatID();
        this.data = data;

        Beat.addBeat(this);
    }

    static makeBeat<T extends Beat>(BeatConstructor : new (data : NoteData | BeatData) => T, data : NoteData | BeatData) : T {
        return new BeatConstructor(data);
    }

    abstract readonly beats : number;

    abstract getWidth() : number;
    abstract getHeight() : number;
    abstract getSVGPath(): string;
}