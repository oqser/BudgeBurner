<script setup lang="ts">
import ExpenseForm from "../../ExpenseForm.vue";
import ExpenseItem from "../../ExpenseItem.vue";
import { computed, ref } from "vue";
import { useExpenses } from "../../../composables/useExpenses";
import Pagination from "../../Pagination.vue";

type Expense = {
    id: number;
    title: string;
    price: number | null;
};

const currentPage = ref(1);
const itemsPerPage = 10;

const { data: expensesData } = useExpenses();

const paginatedExpenses = computed(() => {
    if (!expensesData.value) return [];

    const sorted = [...expensesData.value].sort((a, b) => b.id - a.id);
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => {
    if (!expensesData.value) return 0;
    return Math.ceil(expensesData.value.length / itemsPerPage);
});

const handlePageChange = (page: number) => {
    currentPage.value = page;
};
</script>

<template>
    <h2>Лист затрат</h2>

    <ExpenseForm />

    <div class="expense-list-block">
        <ExpenseItem
            v-for="expense in paginatedExpenses"
            :key="expense.id"
            :expense="expense"
        />
    </div>

    <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
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
