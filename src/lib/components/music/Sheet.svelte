<script lang="ts">
	import MeasureElement from "./MeasureElement.svelte";
	import { Measure } from "$lib/scripts/music/sheet/Measure";

	const testMeasure = new Measure();
</script>

<MeasureElement measure={testMeasure} xOffset={0}/>