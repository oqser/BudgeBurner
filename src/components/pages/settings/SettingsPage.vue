<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import SortSelector from "../../SelectorSort.vue";
import SizeSelector from "../../SelectorSize.vue";
import { useSettings } from "../../../composables/useSettings";

const currentSort = ref("-date");
const itemsPerPage = ref(10);

const { data: settingsData } = useSettings(1);
watchEffect(() => {
    const settings = settingsData.value?.[0];
    if (!settings) return;

    currentSort.value = settings.sorting || currentSort.value;
    itemsPerPage.value = settings.pagination || itemsPerPage.value;
});

const settings = computed(() => ({
    user_id: 1,
    sorting: currentSort.value,
    pagination: itemsPerPage.value,
}));
</script>

<template>
    <div class="settings-block">
        <div class="set-item">
            <span>Сортировка</span>
            <SortSelector v-model="currentSort" :settings="settings" />
        </div>
        <div class="set-item">
            <span>Объектов на странице</span>
            <SizeSelector v-model="itemsPerPage" :settings="settings" />
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
.settings-block .set-item {
    display: flex;
    gap: 1rem;
}
</style>
