<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import { STEM_CONNECTION_Y } from "$lib/scripts/music/sheet/beats/notes/consts";
	import { OVERHANG_STAFF_MARGIN, STAFF_LINE_WIDTH, STAFF_SIZE, STEM_LINE_WIDTH } from "./consts";

    export let noteBeat : NoteBeat;

    export let stemId : `stem${number}`;

    export let stemEnd : number = -200;

    let stackNotes : boolean = false;
    let connectionTop : number;
    let connectionBottom : number;

    function renderNotes() {
        const notes = noteBeat.data.notes;

        const noteWidth = noteBeat.getWidth();
        const noteHeight = noteBeat.getHeight();

        const noteSVGPath = noteBeat.getSVGPath();

        const notesElement = document.querySelector(`#${stemId} #notes`) as SVGLineElement;

        notesElement.textContent = "";

        stackNotes = false;

        let leftOverhangTop : number = - STAFF_SIZE;
        let leftOverhangBottom : number = - STAFF_SIZE;

        let rightOverhangTop : number = - STAFF_SIZE;
        let rightOverhangBottom : number = - STAFF_SIZE;

        let lastUnstackedPitch = NaN;
        notes.forEach(note => {
            const noteElement = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;
            
            noteElement.classList.add("note");

            noteElement.setAttribute("href", noteSVGPath);
            noteElement.setAttribute("height", `${noteHeight}`);

            const y = note.pitch * - STAFF_SIZE;
            noteElement.setAttribute("y", `${y}`);

            let noteX : number = 0;
            
            if(lastUnstackedPitch + 1 >= note.pitch) {
                stackNotes = true;
                noteX = noteWidth - STEM_LINE_WIDTH;

                rightOverhangTop = Math.min(rightOverhangTop, y);
                rightOverhangBottom = Math.max(rightOverhangBottom, y);
            } else {
                lastUnstackedPitch = note.pitch;

                leftOverhangTop = Math.min(leftOverhangTop, y);
                leftOverhangBottom = Math.max(leftOverhangBottom, y);
            }

            noteElement.setAttribute("x", `${noteX}`);

            notesElement.appendChild(noteElement);
        });

        connectionBottom = STEM_CONNECTION_Y - notes[0].pitch * STAFF_SIZE;
        connectionTop = (notes[notes.length-1].pitch != lastUnstackedPitch || !stackNotes? noteHeight - STEM_CONNECTION_Y : STEM_CONNECTION_Y) - notes[notes.length-1].pitch * STAFF_SIZE;

        const leftOverhang = document.querySelector(`#${stemId} #leftOverhangStaffs`) as SVGRectElement;

        leftOverhang.setAttribute("x", `${-OVERHANG_STAFF_MARGIN}`);
        leftOverhang.setAttribute("width", `${OVERHANG_STAFF_MARGIN * 2 + noteWidth}`);

        leftOverhang.setAttribute("y", `${leftOverhangTop + STAFF_SIZE + STAFF_LINE_WIDTH}`);
        leftOverhang.setAttribute("height", `${leftOverhangBottom - leftOverhangTop}`);

        console.log(leftOverhangBottom - leftOverhangTop);

        const rightOverhang = document.querySelector(`#${stemId} #rightOverhangStaffs`) as SVGRectElement;

        rightOverhang.setAttribute("x", `${-OVERHANG_STAFF_MARGIN + noteWidth - STEM_LINE_WIDTH}`);
        rightOverhang.setAttribute("width", `${OVERHANG_STAFF_MARGIN * 2 + noteWidth}`);

        rightOverhang.setAttribute("y", `${rightOverhangTop + STAFF_SIZE + STAFF_LINE_WIDTH}`);
        rightOverhang.setAttribute("height", `${rightOverhangBottom - rightOverhangTop}`);
        
        console.log(rightOverhangBottom - rightOverhangTop);
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

<g id={stemId}>
    {#if noteBeat.showStem}
        <line id="stemLine" stroke-width={STEM_LINE_WIDTH} stroke="black"/>
    {/if}
    <g id="notes"/>
    <rect id="leftOverhangStaffs" fill="url(#staffs)"/>
    <rect id="rightOverhangStaffs" fill="url(#staffs)"/>
</g>