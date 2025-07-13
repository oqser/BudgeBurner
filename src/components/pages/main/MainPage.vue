<script setup lang="ts">
import ExpenseForm from "../../ExpenseForm.vue";
import ExpenseItem from "../../ExpenseItem.vue";
import { computed, ref, watch } from "vue";
import { useExpenses } from "../../../composables/useExpenses";

type Expense = {
    id: number;
    title: string;
    price: number | null;
};

// get
const { data: expensesData } = useExpenses();
const expenses = computed(() => {
    if (!expensesData.value) return [];
    return [...expensesData.value].sort((a, b) => b.id - a.id);
});
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
