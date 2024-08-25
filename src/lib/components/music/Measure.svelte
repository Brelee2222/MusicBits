<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
	import { onMount } from "svelte";
	import { Measure } from "$lib/scripts/music/sheet/Measure";
	import type { BeatElement } from "./types";
	import NoteStemElement from "./NoteStemElement.svelte";
	import RestElement from "./RestElement.svelte";

    let measure : Measure = new Measure();

    let beatElements : BeatElement[] = [];

    function makeBeat() {
        const beat = NoteBeat.makeBeat<CrotchetNote>(CrotchetNote, {
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
        
        beatElements[measure.beats.push(beat) - 1] = new (beat instanceof NoteBeat ? NoteStemElement : RestElement)({
            props : {
                beat
            },
            target : document.getElementById("beats") as unknown as SVGGElement
        });
    }

    function computePositions() {
        let x = 0;

        for(let beatIndex = 0; beatIndex < beatElements.length; beatIndex++) {
            const beat = beatElements[beatIndex];

            beat.x = x;

            x += beat.width! + beat.rightPadding!;
        }
    }

    for(let i = 0; i != 3; i++)
        onMount(appendBeat);

    onMount(() => setTimeout(computePositions, 2000));
</script>

<svg width="400px" height="400px" viewBox="-200 -200 400 400" id="measure">
    <pattern id="staffs" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect y="-100" width="100" height="100" fill="url(#staffs)"/>

    <g id="beats"/>
</svg>