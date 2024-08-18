<script lang="ts">
    import Note from "./Note.svelte";
</script>

<svg>
    <pattern id="staffs" viewBox="0 0 10 10" width="10%" height="10%">
        <line x1="0" y1="0" x2="1000" y2="0" stroke="black" />
    </pattern>

    <rect width="100" height="100" fill="url(#staffs)"/>
    <Note></Note>
</svg>