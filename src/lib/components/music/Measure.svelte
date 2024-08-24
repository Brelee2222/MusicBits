<script lang="ts">
    import { Beat, NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
	import { onMount } from "svelte";
	import NoteStem from "./NoteStem.svelte";
	import { addBeat } from "$lib/scripts/music/sheet";

    let beatInfos : {
        beatID: `beat-${string}`;
        beat: Beat;
        width?: number;
    }[] = [];

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
        
        beatInfos.push(beatInfo);
        beatInfos = beatInfos;
    }

    function computePositions() {
        let x = 0;

        const beatsElement = document.getElementById("beats");

        for(let beatIndex = 0; beatIndex < beatInfos.length; beatIndex++) {
            const beatInfo = beatInfos[beatIndex];

            beatsElement?.children[beatIndex].setAttribute("transform", `translate(${x} 0)`);

            x += beatInfo.width!;
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

    <g id="beats">
        {#each beatInfos as beatInfo}
            {#if beatInfo.beat instanceof NoteBeat}
                <NoteStem 
                    noteBeat={beatInfo.beat} 
                    beatID={beatInfo.beatID} 
                    bind:width={beatInfo.width} 
                />
            {/if}
        {/each}
    </g>
</svg>