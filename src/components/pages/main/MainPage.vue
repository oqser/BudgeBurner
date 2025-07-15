<script setup lang="ts">
import ExpenseForm from "../../ExpenseForm.vue";
import ExpenseItem from "../../ExpenseItem.vue";
import { computed, ref } from "vue";
import { useExpenses } from "../../../composables/useExpenses";
import Pagination from "../../Pagination.vue";

const currentPage = ref(1);
const itemsPerPage = ref(10);

const { data: expensesData } = useExpenses(currentPage, itemsPerPage);

const expenses = computed(() => {
    if (!expensesData.value) return [];
    return [...expensesData.value.items];
});

const paginationMeta = computed(
    () =>
        expensesData.value?.meta || {
            total_items: 0,
            total_pages: 1,
            current_page: 1,
            per_page: itemsPerPage.value,
            remaining_count: 0,
        }
);

const handlePageChange = (page: number) => {
    currentPage.value = page;
};

const handlePerPageChange = (perPage: number) => {
    itemsPerPage.value = perPage;
};
</script>

<template>
    <h2>Лист затрат</h2>

    <ExpenseForm />

    <div class="expense-list-block">
        <ExpenseItem
            v-for="expense in expenses"
            :key="expense.id"
            :expense="expense"
        />
    </div>

    <Pagination
        :meta="paginationMeta"
        :modelValue="currentPage"
        @update:modelValue="handlePageChange"
        @update:perPage="handlePerPageChange"
    />
</template>

<style scoped>
.expense-list-block {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    justify-content: space-between;
    max-width: 50vh;
    width: 100%;
}

h2 {
    margin: 0;
}
</style>
