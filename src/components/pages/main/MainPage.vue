<script setup lang="ts">
import ExpenseForm from "../../ExpenseForm.vue";
import ExpenseItem from "../../ExpenseItem.vue";
import { ref, watch } from "vue";
import { useGetExpenses } from "../../../composables/useExpenses";

type Expense = {
    id: number;
    title: string;
    price: number;
};

// get
const { data: expensesData } = useGetExpenses();
const expenses = ref<Expense[]>([]);
watch(
    expensesData,
    (newData) => {
        if (newData) {
            expenses.value = newData;
            console.log("Загружены траты:", newData);
        }
    },
    { immediate: true }
);

// add
const addExpense = (newExpense: Omit<Expense, "id">) => {
    expenses.value.push({
        id: Date.now(),
        ...newExpense,
    });
};
</script>

<template>
    <h2>Лист затрат</h2>

    <ExpenseForm @add-expense="addExpense" />

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
    gap: 0.5rem;
    justify-content: space-between;
    max-width: 50vh;
    width: 100%;
}

input[type="number"] {
    -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
