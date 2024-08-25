<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
	import { onMount } from "svelte";
	import { addBeat } from "$lib/scripts/music/sheet";
	import NoteStemElement from "./NoteStemElement.svelte";
	import { BeatElement } from "./types";
	import RestElement from "./RestElement.svelte";

    let beats : BeatElement[] = [];

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

        return {
            beatID : addBeat(beat),
            beat
        };
    }

    function appendBeat() {
        const beatInfo = makeBeat();
        
        beats.push(new (beatInfo.beat instanceof NoteBeat ? NoteStemElement : RestElement)({
            target: document.getElementById("beats") as unknown as SVGGElement,
            props: beatInfo
        }));
    }

    function computePositions() {
        let x = 0;

        for(let beatIndex = 0; beatIndex < beats.length; beatIndex++) {
            const beat = beats[beatIndex];

            beat.x = x;

            x += beat.width!;
        }
    }

    for(let i = 0; i != 3; i++)
        onMount(appendBeat);

    onMount(() => setTimeout(computePositions, 2000));
</script>

<svg width="400px" height="400px" viewBox="-200 -200 400 400">

    <pattern id="staffs" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect y="-100" width="100" height="100" fill="url(#staffs)"/>

    <g id="beats"/>
</svg>