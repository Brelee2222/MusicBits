<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
	import { onMount } from "svelte";
	import NoteStem from "./NoteStem.svelte";
	import type { BeatID } from "$lib/scripts/music/sheet/beats/types";

    const testNote = NoteBeat.makeBeat<CrotchetNote>(CrotchetNote, {
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

    function removeBeat(beatID : BeatID) {

    }

    function addBeat() {
        const beatsElement = document.getElementById("beats") as unknown as SVGGElement;

        new NoteStem({
            target: beatsElement,
            props: {
                beatID : "beat-1",
                noteBeat : testNote
            }
        });
    }

    onMount(addBeat);
</script>
<svg width="400px" height="400px" viewBox="-200 -200 400 400">

    <pattern id="staffs" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect y="-100" width="100" height="100" fill="url(#staffs)"/>

    <g id="beats"/>
</svg>