import * as beat from "./beats";

const MAX_BEAT_ID : number = 65025;

const beats : { [key: beat.BeatID] : beat.Beat } = {};

function generateBeatID() : beat.BeatID {
    let beatID : beat.BeatID;

    do {
        beatID = `beat-${Math.floor(Math.random() * MAX_BEAT_ID).toString(16)}`;
    } while(beats[beatID]);

    return beatID;
}

export function addBeat(beat : beat.Beat) : beat.BeatID {
    const beatID = generateBeatID();

    beats[beatID] = beat;

    return beatID;
}

export function removeBeat(beatID : beat.BeatID) : beat.Beat | null{
    const beat = beats[beatID];

    if(!beat)
        return null;

    delete beats[beatID];

    return beat;
}