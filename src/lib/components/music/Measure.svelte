<script lang="ts">
    import { Beat, NoteBeat, RestBeat, restTypes } from "$lib/scripts/music/sheet/beats";
	import { onMount } from "svelte";
	import { Measure } from "$lib/scripts/music/sheet/Measure";
	import type { BeatElement } from "./types";
	import NoteStemElement from "./NoteStemElement.svelte";
	import RestElement from "./RestElement.svelte";
	import { CLEFF_MIN_HEIGHT } from "./consts";

    let measure : Measure = new Measure();

    let beatElements : BeatElement[] = [];

    let measureID : string = "measure1";

    function makeBeat() : Beat {
        const beat = NoteBeat.makeBeat(restTypes.MinmRest, {
            "dotted" : false,
            "notes" : [
                {
                    "pitch" : 0,
                    "accidental" : "natural",
                },
                {
                    "pitch" : 2,
                    "accidental" : "natural",
                },
                {
                    "pitch" : 4,
                    "accidental" : "natural",
                },
                // {
                //     "pitch" : 4,
                //     "accidental" : "natural",
                // },
                // {
                //     "pitch" : 5,
                //     "accidental" : "natural",
                // },
                // {
                //     "pitch" : 7,
                //     "accidental" : "natural",
                // },
                // {
                //     "pitch" : 11,
                //     "accidental" : "natural",
                // }
            ],
            "staccato" : false,
            "value" : 0
        });

        return beat;
    }

    function appendBeat() {
        const beat = makeBeat();
        const options = {
            props : {
                beat
            },
            target : document.getElementById("beats") as unknown as SVGGElement
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

    function computePositions() {
        let x = 0;

        for(let beatIndex = 0; beatIndex < beatElements.length; beatIndex++) {
            const beat = beatElements[beatIndex];

            beat.x = x;

            x += beat.width! + beat.rightPadding!;
        }

        const measureElement = document.querySelector(`#${measureID}`) as SVGElement;
        measureElement.setAttribute("width", `${x}`);
        measureElement.setAttribute("viewBox", `0 -200 ${x} 400`);
    }

    for(let i = 0; i != 5; i++)
        onMount(appendBeat);

    onMount(() => setTimeout(computePositions, 2000));
</script>

<svg id={measureID} height="400px" preserveAspectRatio="xMinYMid meet">
    <pattern id="staffsPattern" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect id="staff" y="-100" width="100%" height="{CLEFF_MIN_HEIGHT}" fill="url(#staffsPattern)"/>

    <g id="beats"/>
</svg>