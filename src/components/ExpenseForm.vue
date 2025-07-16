<script setup lang="ts">
import { ref } from "vue";
import { useCreateExpense } from "../composables/useExpenses";
import { useCloseActions } from "../utils/useCloseActions";

const userId = ref(1);
const expenseTitle = ref("");
const expensePrice = ref<number | null>(null);
const isoDate = new Date().toISOString().slice(0, 10);
const expenseDate = ref(isoDate);
const isCreating = ref(false);
const editFormRef = ref<HTMLFormElement | null>(null);

const startCreate = () => {
    isCreating.value = true;
};

// add
const create = useCreateExpense();

const canceCreating = () => {
    if (!isCreating.value) return;
    isCreating.value = false;
};
useCloseActions(isCreating, canceCreating, editFormRef);

const handleCreate = () => {
    create.mutate({
        user_id: userId.value,
        title: expenseTitle.value,
        price: expensePrice.value || 0,
        date: expenseDate.value,
    }),
        (expenseTitle.value = ""),
        (expensePrice.value = null),
        (expenseDate.value = isoDate);
    isCreating.value = false;
};
</script>

<template>
    <form class="expense-list-form" ref="editFormRef">
        <input
            v-if="isCreating"
            v-model="expenseTitle"
            type="text"
            placeholder="Название"
            required
        />
        <input
            v-if="isCreating"
            v-model="expensePrice"
            type="number"
            placeholder="Цена"
        />
        <input
            v-if="isCreating"
            v-model="expenseDate"
            type="date"
            placeholder="Дата"
        />
        <div class="expense-list-form-action-buttons">
            <button
                v-if="isCreating"
                @click="handleCreate"
                class="add-expense-button"
                :disabled="!expenseTitle.trim()"
            >
                галка Сохранить
            </button>
            <button v-else @click="startCreate" class="add-expense-button">
                + Добавить
            </button>
        </div>
    </form>
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
</style>
