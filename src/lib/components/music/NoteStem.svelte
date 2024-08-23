<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { STEM_CONNECTION_Y } from "$lib/scripts/music/sheet/beats/notes/consts";
	import { STAFF_SIZE, STEM_LINE_WIDTH } from "./consts";

    export let noteBeat : NoteBeat;

    export let stemId : `stem${number}`;

    export let stemEnd : number = 100;

    let stackNotes : boolean = false;
    let connectionTop : number;
    let connectionBottom : number;

    function renderNotes() {       
        const notes = noteBeat.data.notes;

        const noteWidth = noteBeat.getWidth();
        const noteHeight = noteBeat.getHeight();

        const noteSVGPath = noteBeat.getSVGPath();

        const notesElement = document.querySelector(`#${stemId} #notes`) as SVGLineElement;

        stackNotes = false;

        let lastUnstackedPitch = NaN;
        notes.forEach(note => {
            const noteElement = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;
            
            noteElement.classList.add("note");

            noteElement.setAttribute("href", noteSVGPath);
            noteElement.setAttribute("height", `${noteHeight}`);

            noteElement.setAttribute("y", `${note.pitch * - STAFF_SIZE}`);

            let noteX : number = 0;
            
            if(lastUnstackedPitch + 1 == note.pitch) {
                stackNotes = true;
                noteX = noteWidth - STEM_LINE_WIDTH;
            } else
                lastUnstackedPitch = note.pitch;

            noteElement.setAttribute("x", `${noteX}`);

            notesElement.appendChild(noteElement);
        });

        connectionBottom = STEM_CONNECTION_Y - notes[0].pitch * STAFF_SIZE;
        connectionTop = (notes[notes.length-1].pitch != lastUnstackedPitch ? noteHeight - STEM_CONNECTION_Y : STEM_CONNECTION_Y) - notes[notes.length-1].pitch * STAFF_SIZE;
    }

    function renderStemLine() {
        if(!noteBeat.showStem)
            return;

        const noteWidth = noteBeat.getWidth();

        const stemLine = document.querySelector(`#${stemId} #stemLine`) as unknown as SVGLineElement;

        let lineX : number;

        if(connectionBottom < stemEnd && !stackNotes)
            lineX = STEM_LINE_WIDTH/2;
        else
            lineX = noteWidth - STEM_LINE_WIDTH/2;

        stemLine.setAttribute("x1", `${lineX}`);
        stemLine.setAttribute("x2", `${lineX}`);

        stemLine.setAttribute("y1", `${Math.max(connectionBottom, stemEnd)}`);
        stemLine.setAttribute("y2", `${Math.min(connectionTop, stemEnd)}`);
    }

    onMount(renderNotes);
    onMount(renderStemLine);
</script>

<g id={stemId} stroke="black">
    {#if noteBeat.showStem}
        <line id="stemLine" stroke-width={STEM_LINE_WIDTH}/>
    {/if}
    <g id="notes"/>
</g>