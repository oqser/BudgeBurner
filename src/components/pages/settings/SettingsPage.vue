<script setup lang="ts">
import { computed, ref, watch } from "vue";
import SortSelector from "../../SortSelector.vue";
import { useSettings } from "../../../composables/useSettings";

const currentSort = ref("-date");
const itemsPerPage = ref(10);

const { data: settingsData } = useSettings(1);
watch(
    settingsData,
    (newSettings) => {
        if (newSettings?.[0]?.sorting) {
            currentSort.value = newSettings[0].sorting;
        }
    },
    { immediate: true }
);

const settings = computed(() => ({
    user_id: 1,
    sorting: currentSort.value,
    pagination: itemsPerPage.value,
}));
</script>

<template>
    <div class="settings-block">
        <div class="sort">
            <span>Сортировка</span
            ><SortSelector v-model="currentSort" :settings="settings" />
        </div>
    </div>
</template>

<style scoped>
.settings-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.settings-block .sort {
    display: flex;
    gap: 1rem;
}
</style>
