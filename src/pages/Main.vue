<script setup lang="ts">
import { baseURL } from "./src/constants.ts";
import { ref } from "vue";

interface Expense {
    id: number;
    title: string;
    price: number;
}

let id = 0;

const expenseTitle = ref("");
const expensePrice = ref<number | null>(null);
const editingExpenseId = ref<number | null>(null);
const editTitle = ref("");
const editPrice = ref<number | null>(null);

const expenses = ref<Expense[]>([
    { id: id++, title: "Заправка", price: 2000 },
    { id: id++, title: "Колодки", price: 4000 },
    { id: id++, title: "Фары", price: 40000 },
]);

function addExpense() {
    expenses.value.push({
        id: id++,
        title: expenseTitle.value,
        price: expensePrice.value || 0,
    });
    expenseTitle.value = "";
    expensePrice.value = null;
}

function deleteExpense(expense: Expense) {
    expenses.value = expenses.value.filter((t) => t !== expense);
}

const startEdit = (id: number) => {
    editingExpenseId.value = id;
    const expense = expenses.value.find((expense) => expense.id === id);
    editTitle.value = expense.title;
    editPrice.value = expense.price;
};
const endEdit = () => {
    editingExpenseId.value = null;
    editTitle.value = "";
};

const updateData = (id: number) => {
    const expenseId = expenses.value.findIndex((expense) => expense.id === id);

    if (expenseId !== -1) {
        expenses.value[expenseId] = {
            ...expenses.value[expenseId],
            title: editTitle.value,
            price: editPrice.value || 0,
        };
    }

    endEdit();
};
</script>

<template>
    <h2>Лист затрат</h2>

    <div class="expense-list-form">
        <input
            v-model="expenseTitle"
            type="text"
            placeholder="Название"
            required
        />
        <input
            v-model="expensePrice"
            type="number"
            placeholder="Цена"
            required
        />
        <div class="expense-list-form-action-buttons">
            <button
                @click="addExpense()"
                class="add-expense-button"
                :disabled="!expenseTitle.trim()"
            >
                Добавить
            </button>
        </div>
    </div>

    <div class="expense-list-block">
        <div class="expense-item" v-for="expense in expenses" :key="expense.id">
            <div class="expense-item-title">
                <p v-if="editingExpenseId !== expense.id">
                    {{ expense.title }}
                </p>
                <input
                    class="expense-input-title"
                    v-else
                    type="text"
                    :value="expense.title"
                    @input="editTitle = $event.target.value"
                />
            </div>
            <div class="expense-item-price">
                <p v-if="editingExpenseId !== expense.id">
                    {{ expense.price }}
                </p>

                <input
                    class="expense-input-price"
                    v-else
                    type="number"
                    :value="expense.price"
                    @input="editPrice = $event.target.value"
                />
            </div>

            <div class="expense-item-actions">
                <span
                    @click="startEdit(expense.id)"
                    class="edit-button"
                    v-if="editingExpenseId !== expense.id"
                >
                    <img
                        src="../assets/edit-pencil.svg"
                        class="edit-button-img"
                    />
                </span>
                <span
                    @click="updateData(expense.id)"
                    class="save-button"
                    v-else
                >
                    <img
                        src="../assets/save-icon.svg"
                        class="save-button-img"
                    />
                </span>
                <span class="delete-button" @click="deleteExpense(expense)">
                    X
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.expense-list-form {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.expense-list-form input {
    height: 30px;
    font-size: 16px;
    outline: none;
    border: none;
}

.expense-list-form-action-buttons button {
    width: 100px;
    height: 40px;
    border-radius: 8px;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 12px;
    padding: 5px 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.add-expense-button {
    background: #000;
    outline: none;
}

.add-expense-button:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
}

.add-expense-button:active {
    transform: scale(0.95);
    opacity: 0.95;
}

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

.expense-item {
    display: flex;
    width: 100%;
    box-sizing: border-box;
}

.expense-item p {
    font-size: 18px;
    margin: 0;
}

.expense-item-title {
    display: flex;
    flex: 3;
}
.expense-item-price {
    display: flex;
    justify-content: flex-end;
    flex: 2;
}

.expense-item input {
    border-radius: 8px;
    font-size: 20px;
    outline: none;
    border: none;
    width: 100%;
    color: rgb(150, 61, 61);
}

.expense-item-actions {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    flex: 1;
    justify-content: flex-end;
}

.expense-item-actions .edit-button {
    cursor: pointer;
    font-size: 16px;
}

.expense-item-actions .delete-button {
    cursor: pointer;
    color: red;
    font-weight: bold;
}

.expense-item .edit-button-img {
    width: 15px;
    cursor: pointer;
}
.expense-item .save-button-img {
    width: 15px;
    cursor: pointer;
}

.expense-item-actions span {
    display: inline-block;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.expense-item-actions span:hover {
    transform: scale(1.4);
}

/* Убирает стрелки в Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}

/* Убирает стрелки в Chrome/Safari */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
