<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { STEM_CONNECTION_Y } from "$lib/scripts/music/sheet/beats/notes/consts";

    const LINE_WIDTH = 2;

    export let noteBeat : NoteBeat;

    export let stemId : `stem${number}`;

    export let stemEnd : number = -100;

    function renderNotes() {
        const notes = noteBeat.data.notes;
        
        const noteWidth = noteBeat.getWidth();
        const noteHeight = noteBeat.getHeight();

        const noteSVGPath = noteBeat.getSVGPath();

        const notesElement = document.querySelector(`#${stemId} #notes`) as SVGLineElement;

        let lastPitch = NaN;
        let stackNotes = false;

        notes.forEach(note => {
            const noteElement = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;
            
            noteElement.setAttribute("href", noteSVGPath);
            noteElement.setAttribute("height", `${noteHeight}`);

            // bottom staff - pitch * 10
            noteElement.setAttribute("y", `${note.pitch * - 10}`);


            
            if(lastPitch + 1 == note.pitch) {
                stackNotes = true;
                noteElement.setAttribute("x", `${noteWidth - LINE_WIDTH}`);
            } else
                lastPitch = note.pitch;

            notesElement.appendChild(noteElement);
        });

        if(noteBeat.showStem) {
            const stemLine = document.querySelector(`#${stemId} #stemLine`) as unknown as SVGLineElement;

            stemLine.setAttribute("y1", `${Math.max(
                STEM_CONNECTION_Y - notes[0].pitch * 10, // stemMax
                stemEnd
            )}`);

            stemLine.setAttribute("y2", `${Math.min(
                STEM_CONNECTION_Y - notes[notes.length-1].pitch * 10, // stemMin
                stemEnd
            )}`);

            stemLine.setAttribute("x1", `${noteWidth - LINE_WIDTH/2}`);
            stemLine.setAttribute("x2", `${noteWidth - LINE_WIDTH/2}`);
        }
    }

    onMount(renderNotes);
</script>

<g id={stemId} stroke="black" >
    {#if noteBeat.showStem}
        <line id="stemLine" stroke-width={LINE_WIDTH}/>
    {/if}
    <g id="notes"/>
</g>