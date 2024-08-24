<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { OVERHANG_STAFF_MARGIN, STAFF_LINE_WIDTH, STAFF_SIZE, STEM_LINE_WIDTH, STEM_CONNECTION_Y } from "./consts";
	import type { BeatID } from "$lib/scripts/music/sheet/beats/types";

    export let noteBeat : NoteBeat;

    export let beatID : BeatID;

    export let width : number = 0;

    let stemEnd : number = -200;
    let stackNotes : boolean = false;
    let connectionTop : number;
    let connectionBottom : number;

    function renderNotes() {
        const notes = noteBeat.data.notes;

        const
            noteWidth = noteBeat.getWidth(),
            noteHeight = noteBeat.getHeight(),
            noteSVGPath = noteBeat.getSVGPath();

        const xOffset = 0;

        const notesElement = document.querySelector(`#${beatID} #notes`) as SVGLineElement;

        notesElement.textContent = ""; // Clear current notes

        stackNotes = false; // Reset stack note

        let 
            leftOverhangTop : number = - STAFF_SIZE,
            leftOverhangBottom : number = - STAFF_SIZE,
            rightOverhangTop : number = - STAFF_SIZE,
            rightOverhangBottom : number = - STAFF_SIZE;

        let lastUnstackedPitch = NaN;

        const noteElementTemplate = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;

        noteElementTemplate.classList.add("note");

        noteElementTemplate.setAttribute("href", noteSVGPath);
        noteElementTemplate.setAttribute("height", `${noteHeight}`);

        notes.forEach(note => {
            const noteElement = noteElementTemplate.cloneNode() as SVGImageElement;

            const y = note.pitch * - STAFF_SIZE;
            noteElement.setAttribute("y", `${y}`);

            let noteX : number = 0;
            
            if(lastUnstackedPitch + 1 >= note.pitch) {
                stackNotes = true;
                noteX = noteWidth - STEM_LINE_WIDTH;

                // update right overhang
                rightOverhangTop = Math.min(rightOverhangTop, y);
                rightOverhangBottom = Math.max(rightOverhangBottom, y);
            } else {
                lastUnstackedPitch = note.pitch;

                // update left overhang
                leftOverhangTop = Math.min(leftOverhangTop, y);
                leftOverhangBottom = Math.max(leftOverhangBottom, y);
            }

            noteElement.setAttribute("x", `${noteX + xOffset}`);

            notesElement.appendChild(noteElement);
        });

        connectionBottom = STEM_CONNECTION_Y - notes[0].pitch * STAFF_SIZE;
        connectionTop = (notes[notes.length-1].pitch != lastUnstackedPitch || !stackNotes? noteHeight - STEM_CONNECTION_Y : STEM_CONNECTION_Y) - notes[notes.length-1].pitch * STAFF_SIZE;

        const leftOverhang = document.querySelector(`#${beatID} #leftOverhangStaffs`) as SVGRectElement;

        leftOverhang.setAttribute("x", `${xOffset - OVERHANG_STAFF_MARGIN}`);
        leftOverhang.setAttribute("width", `${OVERHANG_STAFF_MARGIN * 2 + noteWidth}`);

        leftOverhang.setAttribute("y", `${leftOverhangTop + STAFF_SIZE + STAFF_LINE_WIDTH}`);
        leftOverhang.setAttribute("height", `${leftOverhangBottom - leftOverhangTop}`);

        const rightOverhang = document.querySelector(`#${beatID} #rightOverhangStaffs`) as SVGRectElement;

        rightOverhang.setAttribute("x", `${noteWidth - STEM_LINE_WIDTH + xOffset - OVERHANG_STAFF_MARGIN}`);
        rightOverhang.setAttribute("width", `${OVERHANG_STAFF_MARGIN * 2 + noteWidth}`);

        rightOverhang.setAttribute("y", `${rightOverhangTop + STAFF_SIZE + STAFF_LINE_WIDTH}`);
        rightOverhang.setAttribute("height", `${rightOverhangBottom - rightOverhangTop}`);

        width = stackNotes ? noteWidth * 2 - STAFF_LINE_WIDTH : noteWidth;
    }

    function renderStemLine() {
        if(!noteBeat.showStem)
            return;

        const noteWidth = noteBeat.getWidth();

        const xOffset = 0;

        const stemLine = document.querySelector(`#${beatID} #stemLine`) as unknown as SVGLineElement;

        let lineX : number;

        if(connectionBottom < stemEnd && !stackNotes)
            lineX = STEM_LINE_WIDTH/2;
        else
            lineX = noteWidth - STEM_LINE_WIDTH/2;

        stemLine.setAttribute("x1", `${lineX + xOffset}`);
        stemLine.setAttribute("x2", `${lineX + xOffset}`);

        stemLine.setAttribute("y1", `${Math.max(connectionBottom, stemEnd)}`);
        stemLine.setAttribute("y2", `${Math.min(connectionTop, stemEnd)}`);
    }

    onMount(renderNotes);
    onMount(renderStemLine);
</script>

<g id={beatID}>
    {#if noteBeat.showStem}
        <line id="stemLine" stroke-width={STEM_LINE_WIDTH} stroke="black"/>
    {/if}
    <g id="notes"/>

    <rect id="leftOverhangStaffs" fill="url(#staffs)"/>
    <rect id="rightOverhangStaffs" fill="url(#staffs)"/>
</g>