<script lang="ts">
	import MeasureElement from "./MeasureElement.svelte";
	import { Measure } from "$lib/scripts/music/sheet/Measure";
	import { onMount } from "svelte";
	import { MinmRest } from "$lib/scripts/music/sheet/beats/rests/MinmRest";
	import { CLEFF_MIN_HEIGHT } from "./consts";

	const measureElements : MeasureElement[] = [];

	function computePositions() {
		let xOffset = 0;

		measureElements.forEach(measureElement => {
			measureElement.computePositions();

			measureElement.xOffset = xOffset;
			xOffset += measureElement.getWidth();
		});
	}
	onMount(() => {
		for(let i = 0; i != 5; i++) {
			const measureElement = new MeasureElement({
				target : document.getElementById("hihi") as unknown as HTMLElement,
				props : {
					measure : new Measure(),
					xOffset : i * 60
				}
			})
			measureElements.push(measureElement);

			measureElement.appendBeat(new MinmRest({dotted : false, staccato : false, value : 0}));
			measureElement.appendBeat(new MinmRest({dotted : false, staccato : false, value : 0}));
		}
		computePositions();
	});

	
</script>

<svg id="hihi" viewBox="0 -100 800 200">
	<pattern id="staffsPattern" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect id="staff" y="-100" width="100%" height="{CLEFF_MIN_HEIGHT}" fill="url(#staffsPattern)"/>
</svg>