<script setup lang="ts">
const sortOptions = [
    { value: "-id", label: "Сначала новые" },
    { value: "id", label: "Сначала старые" },
    { value: "-price", label: "Сначала дорогие" },
    { value: "price", label: "Сначала дешевые" },
];

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateSort = (e: Event) => {
    emit("update:modelValue", (e.target as HTMLSelectElement).value);
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
