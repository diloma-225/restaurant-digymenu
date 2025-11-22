<template>
    <div>
        <IconsSpainFlag v-if="props.contry == 'sp'" />
        <IconsFrenchFlag v-if="props.contry == 'fr'"/>
        <IconsEnglishFlag v-if="props.contry == 'en'" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    contry: { type: String, default: "fr" },
});
</script>

<style scoped>

</style>