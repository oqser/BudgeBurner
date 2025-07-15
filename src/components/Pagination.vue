<script setup lang="ts">
import { ref, watch } from "vue";
import type { PaginationMeta } from "../types/Pagination";

const props = defineProps<{
    meta: PaginationMeta;
    modelValue: number;
}>();

const emit = defineEmits(["update:modelValue", "update:perPage"]);

const currentPage = ref(props.modelValue);
const itemsPerPage = ref(props.meta.per_page);

watch(currentPage, (newVal) => {
    emit("update:modelValue", newVal);
});

watch(itemsPerPage, (newVal) => {
    emit("update:perPage", newVal);
    currentPage.value = 1;
});

const nextPage = () => {
    if (currentPage.value < props.meta.total_pages) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>

<template>
    <div class="pagination">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="pagination-button"
        >
            Назад
        </button>

        <span class="pagination-info">
            {{ currentPage }} / {{ meta.total_pages }}
        </span>

        <button
            @click="nextPage"
            :disabled="currentPage === meta.total_pages"
            class="pagination-button"
        >
            Вперед
        </button>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5rem;
}

.pagination-button {
    color: black;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 16px;
    transition: all 0.3s;
    position: relative;
    outline: none;
}

.pagination-button::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 3px;
    border-radius: 3px;
    background-color: currentColor;
    transition: width 0.3s;
}

.pagination-button:hover:not(:disabled)::after {
    width: 100%;
}

.pagination-button:disabled {
    opacity: 0.5;
}

.pagination-info {
    font-size: 0.9rem;
    text-align: center;
}
</style>
