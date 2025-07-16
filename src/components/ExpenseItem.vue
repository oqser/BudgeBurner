<script setup lang="ts">
import { computed, ref } from "vue";
import { useDeleteExpense, useUpdateExpense } from "../composables/useExpenses";
import { useCloseActions } from "../utils/useCloseActions";
import ActionButtons from "./ActionButtons.vue";
import type { Expense } from ".././types/Expense";
import { formatDate } from "../utils/dateFormatter";

const props = defineProps<{
    expense: Expense;
}>();

const isEditing = ref(false);
const editFormRef = ref<HTMLFormElement | null>(null);
const formState = ref({
    title: props.expense.title,
    price: props.expense.price,
    date: props.expense.date,
});

const update = useUpdateExpense();
const remove = useDeleteExpense();

const resetForm = () => {
    formState.value = { ...props.expense };
};

const cancelEditing = () => {
    if (!isEditing.value) return;
    resetForm();
    isEditing.value = false;
};

useCloseActions(isEditing, cancelEditing, editFormRef);

const handleUpdate = () => {
    if (
        formState.value.title !== props.expense.title ||
        formState.value.price !== props.expense.price ||
        formState.value.date !== props.expense.date
    ) {
        update.mutate({
            id: props.expense.id,
            user_id: props.expense.user_id,
            ...formState.value,
        });
    }
    isEditing.value = false;
};

const handleRemove = () => {
    remove.mutate({
        id: props.expense.id,
        title: props.expense.title,
    });
};

const fullDate = computed(() => formatDate(props.expense.date, "DD.MM.YYYY"));
const longDate = computed(() => formatDate(props.expense.date, "DD.month"));
</script>

<template>
    <div class="expense-item">
        <form
            v-if="isEditing"
            ref="editFormRef"
            class="expense-edit-form"
            @submit.prevent="handleUpdate"
        >
            <input
                class="expense-input-title"
                type="text"
                v-model="formState.title"
                required
            />

            <input
                class="expense-input-price"
                type="number"
                v-model.number="formState.price"
            />
            <input
                class="expense-input-date"
                type="date"
                v-model.date="formState.date"
            />

            <ActionButtons
                :isEditing="isEditing"
                @edit="isEditing = true"
                @cancel="cancelEditing"
                @delete="handleRemove"
            />
        </form>

        <div v-else class="expense-view">
            <div class="expense-item-title" :title="expense.title">
                {{ expense.title }}
            </div>
            <div class="expense-item-price" :title="expense.price + ' руб.'">
                {{ expense.price === 0 ? "" : expense.price }}
            </div>
            <div class="expense-item-date" :title="fullDate">
                {{ longDate }}
            </div>

            <ActionButtons
                :isEditing="isEditing"
                @edit="isEditing = true"
                @cancel="cancelEditing"
                @delete="handleRemove"
            />
        </div>
    </div>
</template>
<style scoped>
.expense-item {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    max-width: 70vh;
}

.expense-view {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

.expense-item-title {
    flex: 4;
    min-width: 0;
    overflow: hidden;
    text-align: start;
}

.expense-item-price {
    flex: 1;
    justify-content: flex-end;
}

.expense-item-date {
    flex: 2;
    justify-content: center;
    width: 100%;
}

.expense-edit-form {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    gap: 0.5rem;
    align-items: center;
}

.expense-edit-form input {
    padding: 2px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    font-size: 20px;
    outline: none;
    border-radius: 0.3rem;
    width: 100%;
}
.expense-item input.expense-input-title {
    flex: 5;
}
.expense-item input.expense-input-price {
    text-align: center;
    flex: 1;
}
.expense-item input.expense-input-date {
    text-align: center;
    flex: 1;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
