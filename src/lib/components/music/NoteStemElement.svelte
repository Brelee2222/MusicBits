<script lang="ts">
    import { onMount } from "svelte";
	import { OVERHANG_STAFF_MARGIN, STAFF_LINE_WIDTH, HALF_STAFF_SIZE, STEM_LINE_WIDTH, STEM_CONNECTION_Y, BEAT_ELEMENT_RIGHT_PADDING } from "./consts";
	import type { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let beat : NoteBeat;

    export let width : number = 0;

    export let x : number = 0;

    export let stemEnd : number = -200;

    export let rightPadding : number = BEAT_ELEMENT_RIGHT_PADDING;
    
    let stackNotes : boolean = false;
    let connectionTop : number;
    let connectionBottom : number;

    function renderNotes() {
        const notes = beat.data.notes;

        const
            noteWidth = beat.getWidth(),
            noteHeight = beat.getHeight(),
            noteSVGPath = beat.getSVGPath();

        const xOffset = 0;

        const notesElement = document.querySelector(`#${beat.beatID} #notes`) as SVGLineElement;

        notesElement.textContent = ""; // Clear current notes

        stackNotes = false; // Reset stack note

        let 
            leftOverhangTop : number = - HALF_STAFF_SIZE,
            leftOverhangBottom : number = - HALF_STAFF_SIZE,
            rightOverhangTop : number = - HALF_STAFF_SIZE,
            rightOverhangBottom : number = - HALF_STAFF_SIZE;

        let lastUnstackedPitch = NaN;

        const noteElementTemplate = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;

        noteElementTemplate.classList.add("note");

        noteElementTemplate.setAttribute("href", noteSVGPath);
        noteElementTemplate.setAttribute("height", `${noteHeight}`);

        notes.forEach(note => {
            const noteElement = noteElementTemplate.cloneNode() as SVGImageElement;

            const y = note.pitch * - HALF_STAFF_SIZE;
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

        connectionBottom = STEM_CONNECTION_Y - notes[0].pitch * HALF_STAFF_SIZE;
        connectionTop = (notes[notes.length-1].pitch != lastUnstackedPitch || !stackNotes? noteHeight - STEM_CONNECTION_Y : STEM_CONNECTION_Y) - notes[notes.length-1].pitch * HALF_STAFF_SIZE;

        const leftOverhang = document.querySelector(`#${beat.beatID} #leftOverhangStaffs`) as SVGRectElement;

        leftOverhang.setAttribute("x", `${xOffset - OVERHANG_STAFF_MARGIN}`);
        leftOverhang.setAttribute("width", `${OVERHANG_STAFF_MARGIN * 2 + noteWidth}`);

        leftOverhang.setAttribute("y", `${leftOverhangTop + HALF_STAFF_SIZE + STAFF_LINE_WIDTH}`);
        leftOverhang.setAttribute("height", `${leftOverhangBottom - leftOverhangTop}`);

        const rightOverhang = document.querySelector(`#${beat.beatID} #rightOverhangStaffs`) as SVGRectElement;

        rightOverhang.setAttribute("x", `${noteWidth - STEM_LINE_WIDTH + xOffset - OVERHANG_STAFF_MARGIN}`);
        rightOverhang.setAttribute("width", `${OVERHANG_STAFF_MARGIN * 2 + noteWidth}`);

        rightOverhang.setAttribute("y", `${rightOverhangTop + HALF_STAFF_SIZE + STAFF_LINE_WIDTH}`);
        rightOverhang.setAttribute("height", `${rightOverhangBottom - rightOverhangTop}`);

        width = stackNotes ? noteWidth * 2 - STAFF_LINE_WIDTH : noteWidth;
    }

    function renderStemLine() {
        if(!beat.showStem)
            return;

        const noteWidth = beat.getWidth();

        const xOffset = 0;

        const stemLine = document.querySelector(`#${beat.beatID} #stemLine`) as unknown as SVGLineElement;

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

<svelte:options accessors={true}/>

<g id={beat.beatID} transform="translate({x} 0)">
    {#if beat.showStem}
        <line id="stemLine" stroke-width={STEM_LINE_WIDTH} stroke="black"/>
    {/if}
    <g id="notes"/>

    <rect id="leftOverhangStaffs" fill="url(#staffs)"/>
    <rect id="rightOverhangStaffs" fill="url(#staffs)"/>
</g>