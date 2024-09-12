<script lang="ts">
    import { Beat, NoteBeat, RestBeat } from "$lib/scripts/music/sheet/beats";
	import { Measure } from "$lib/scripts/music/sheet/Measure";
	import type { BeatElement } from "./types";
	import NoteStemElement from "./NoteStemElement.svelte";
	import RestElement from "./RestElement.svelte";

    let beatElements : BeatElement[] = [];

    let measureWidth : number = 0;

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
        let x = 0;

        for(let beatIndex = 0; beatIndex < beatElements.length; beatIndex++) {
            const beat = beatElements[beatIndex];

            beat.x = x;

            x += beat.width! + beat.rightPadding!;
        }

        const measureElement = document.querySelector(`#${measure.measureID}`) as SVGElement;
        // measureElement.setAttribute("width", `${x}`);
        measureElement.setAttribute("viewBox", `0 -200 ${x} 400`);

        measureWidth = x;
    }
</script>

<svelte:options accessors={true}/>

<g id={measure.measureID} transform="translate({xOffset} 0)" preserveAspectRatio="xMinYMid meet">
    <g id="beats"/>
</g>