<script lang="ts">
    import { Beat, NoteBeat, RestBeat } from "$lib/scripts/music/sheet/beats";
	import { Measure } from "$lib/scripts/music/sheet/Measure";
	import type { BeatElement } from "./types";
	import NoteStemElement from "./NoteStemElement.svelte";
	import RestElement from "./RestElement.svelte";
	import { CLEFF_MIN_HEIGHT, HALF_STAFF_SIZE, MEASURE_ELEMENT_START_MARGIN } from "./consts";

    let beatElements : BeatElement[] = [];

    let measureWidth : number = 0;

    let startMargin : number = MEASURE_ELEMENT_START_MARGIN;

    export let minY : number = 0;

    export let maxY : number = 0; 

    export let xOffset : number;

    export let measure : Measure;

    export function getWidth() : number {
        return measureWidth;
    }

    export function appendBeat(beat : Beat) {
        const options = {
            props : {
                beat
            },
            target : document.querySelector(`#${measure.measureID} #beats`) as unknown as SVGGElement
        };

        let beatElement : BeatElement;

        if(beat instanceof NoteBeat) // @ts-ignore
            beatElement = new NoteStemElement(options);
        else if(beat instanceof RestBeat)
            beatElement = new RestElement(options);
        else
            throw new Error("Not a valid beat type");

        beatElements[measure.beats.push(beat) - 1] = beatElement;
    }

    export function computePositions() {
        let x = startMargin;

        for(let beatIndex = 0; beatIndex < beatElements.length; beatIndex++) {
            const beat = beatElements[beatIndex];

            beat.x = x;

            x += beat.width! + beat.rightPadding!;
        }

        const measureElement = document.querySelector(`#${measure.measureID}`) as SVGElement;
        const measureLine = document.querySelector(`#${measure.measureID} line`) as SVGLineElement;

        // measureElement.setAttribute("width", `${x}`);
        measureElement.setAttribute("viewBox", `0 -200 ${x} 400`);
        measureLine.setAttribute("x1", `${x}`);
        measureLine.setAttribute("x2", `${x}`);

        measureWidth = x;
    }
</script>

<svelte:options accessors={true}/>

<g id={measure.measureID} transform="translate({xOffset} 0)" preserveAspectRatio="xMinYMid meet">
    <g id="beats"/>
    <line y1="{-HALF_STAFF_SIZE}" y2="{-CLEFF_MIN_HEIGHT + HALF_STAFF_SIZE}" stroke="black"/>
</g>