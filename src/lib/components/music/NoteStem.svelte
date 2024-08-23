<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let noteBeat : NoteBeat;

    export let stemId : `stem${number}`;

    export let stemEnd : number = -100;

    function renderNotes() {
        const notes = noteBeat.data.notes;

        const noteSVGPath = noteBeat.getSVGPath();

        const noteWidth = noteBeat.getWidth();
        const noteHeight = noteBeat.getHeight();

        const notesElement = document.querySelector(`#${stemId} #notes`) as SVGLineElement;

        let lastPitch = NaN;
        let stackNotes = false;

        notes.forEach(note => {
            const noteElement = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;
            
            noteElement.setAttribute("href", noteSVGPath);
            noteElement.setAttribute("width", `${noteWidth}`);
            // noteElement.setAttribute("height", `${noteHeight}`);

            // bottom staff - pitch * 10
            noteElement.setAttribute("y", `${note.pitch * -10}`);
            
            if(lastPitch + 1 == note.pitch) {
                stackNotes = true;
                noteElement.setAttribute("x", `${noteWidth - 2}`);
            } else
                lastPitch = note.pitch;

            notesElement.appendChild(noteElement);
        });

        if(noteBeat.showStem) {
            const stemLine = document.querySelector(`#${stemId} #stemLine`) as unknown as SVGLineElement;

            stemLine.setAttribute("y1", `${Math.max(
                8.64 - notes[0].pitch * 10, // stemMax
                stemEnd
            )}`);

            stemLine.setAttribute("y2", `${Math.min(
                8.64 - notes[notes.length-1].pitch * 10, // stemMin
                stemEnd
            )}`);
        }
    }

    onMount(renderNotes);
</script>

<g id={stemId}>
    {#if noteBeat.showStem}
        <line id="stemLine" x1="25.458" y1="0" x2="25.458" y2="0" stroke="black" stroke-width="2"/>
    {/if}

    <g id="notes"/>
</g>