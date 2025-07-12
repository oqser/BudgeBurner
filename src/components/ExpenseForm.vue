<script setup lang="ts">
import { ref } from "vue";
import { useCreateExpense } from "../composables/useExpenses";

const expenseTitle = ref("");
const expensePrice = ref<number | null>(null);

// add
const create = useCreateExpense();
</script>

<template>
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
                @click="
                    () => {
                        create.mutate({
                            title: expenseTitle,
                            price: expensePrice || 0,
                        });
                        expenseTitle = '';
                        expensePrice = null;
                    }
                "
                class="add-expense-button"
                :disabled="!expenseTitle.trim()"
            >
                Добавить
            </button>
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
</style>
