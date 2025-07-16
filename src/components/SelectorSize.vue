<script setup lang="ts">
import { toast } from "vue3-toastify";
import { useUpdateSettings } from "../composables/useSettings";
import type { Settings } from "../types/Settings";

const props = defineProps<{
    modelValue: number;
    settings: Settings;
}>();
const emit = defineEmits(["update:modelValue"]);

const updateSettings = useUpdateSettings();

const sizeOptions = [
    { value: 5, label: "5 на странице" },
    { value: 10, label: "10 на странице" },
    { value: 50, label: "50 на странице" },
    { value: 100, label: "100 на странице" },
];

const updateSize = (e: Event) => {
    const newValueSizing = Number((e.target as HTMLSelectElement).value);
    emit("update:modelValue", newValueSizing);
    {
        updateSettings.mutate({
            user_id: props.settings.user_id,
            pagination: newValueSizing,
        });
        toast.success(`Объектов на странице: ${newValueSizing} `);
    }
};
</script>

<template>
    <div class="size-block">
        <select
            class="size-select"
            :value="props.modelValue"
            @change="updateSize"
        >
            <option
                v-for="option in sizeOptions"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.size-select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
}
</style>
