<script setup lang="ts">
import ExpenseForm from "../../ExpenseForm.vue";
import ExpenseItem from "../../ExpenseItem.vue";
import { ref } from "vue";

type Expense = {
    id: number;
    title: string;
    price: number;
};



const expenses = ref<Expense[]>([
    { 
        id: Date.now(), 
        title: "Заправка", 
        price: 2000 
    },
    { 
        id: Date.now() + 1, 
        title: "Колодки", 
        price: 4000 
    },
    { 
        id: Date.now() + 2, 
        title: "Фары", 
        price: 40000 
    },
]);

const addExpense = (newExpense: Omit<Expense, 'id'>) => {
  expenses.value.push({
    id: Date.now(),
    ...newExpense
  })
}

const deleteExpense = (expense: Expense) => {
    expenses.value = expenses.value.filter((t) => t !== expense);
};

const updateExpense = (updatedExpense: Expense) => {
    const index = expenses.value.findIndex((e) => e.id === updatedExpense.id);
    if (index !== -1) {
        expenses.value[index] = updatedExpense;
    }
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
            @delete-expense="deleteExpense"
            @update-expense="updateExpense"
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
