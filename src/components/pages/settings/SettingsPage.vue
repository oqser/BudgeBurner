<script setup lang="ts">
import SortSelector from "../../SortSelector.vue";
</script>

<template>
    <div class="settings-block">
        <div class="sort"><span>Сортировка</span><SortSelector /></div>
    </div>
</template>

<style scoped>
.settings-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.settings-block .sort {
    
}
</style>
