<script setup lang="ts">
import { ref, watch } from "vue";
import { useUpdateSettings } from "../composables/useSettings";
import type { Settings } from "../types/Settings";

const props = defineProps<{
    modelValue: string;
    settings: Settings;
}>();
const emit = defineEmits(["update:modelValue"]);

const updateSettings = useUpdateSettings();
const settingsState = ref({
    pagination: props.settings.pagination,
    sorting: props.settings.sorting,
});

const sortOptions = [
    { value: "-date", label: "Сначала новые" },
    { value: "date", label: "Сначала старые" },
    { value: "-price", label: "Сначала дорогие" },
    { value: "price", label: "Сначала дешевые" },
];

const updateSort = (e: Event) => {
    const newValueSorting = (e.target as HTMLSelectElement).value;
    emit("update:modelValue", newValueSorting);
    {
        updateSettings.mutate({
            user_id: props.settings.user_id,
            sorting: newValueSorting,
            pagination: settingsState.value.pagination,
        });
    }
};
</script>

<template>
    <div class="sort-block">
        <select
            :value="props.modelValue"
            @change="updateSort"
            class="sort-select"
        >
            <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.sort-select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
}
</style>
