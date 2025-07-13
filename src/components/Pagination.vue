<script setup lang="ts">
const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(["page-change"]);

const goToPage = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
        emit("page-change", page);
    }
};
</script>

<template>
    <div v-if="totalPages > 1" class="pagination">
        <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="pagination-button"
            :class="{ 'pagination-button--active': currentPage === 1 }"
        >
            Назад
        </button>

        <span class="page-info">
            Страница {{ currentPage }} из {{ totalPages }}
        </span>

        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="pagination-button"
            :class="{ 'pagination-button--active': currentPage === totalPages }"
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

.page-info {
    font-size: 0.9rem;
    text-align: center;
}
</style>
