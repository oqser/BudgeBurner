<script setup lang="ts">
import { ref } from "vue";
import { useDeleteExpense, useUpdateExpense } from "../composables/useExpenses";
import { useCloseActions } from "../utils/useCloseActions";
import ActionButtons from "./ActionButtons.vue";

const props = defineProps<{
    expense: {
        id: number;
        title: string;
        price: number;
    };
}>();

const isEditing = ref(false);
const editFormRef = ref<HTMLFormElement | null>(null);
const formState = ref({
    title: props.expense.title,
    price: props.expense.price,
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
        formState.value.price !== props.expense.price
    ) {
        update.mutate({
            id: props.expense.id,
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

            <ActionButtons
                :isEditing="isEditing"
                @edit="isEditing = true"
                @cancel="cancelEditing"
                @delete="handleRemove"
            />
        </form>

        <div v-else class="expense-view">
            <div class="expense-item-title">
                <p>{{ expense.title }}</p>
            </div>
            <div class="expense-item-price">
                <p>{{ expense.price === 0 ? "" : expense.price }}</p>
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
    gap: 1rem;
}

.expense-view {
    display: flex;
    width: 100%;
    box-sizing: border-box;
}

.expense-item p {
    font-size: 18px;
    margin: 0;
    padding: 0;
    border: 2px solid transparent;
}

.expense-item-title {
    display: flex;
    flex: 2;
}
.expense-item-price {
    display: flex;
    justify-content: flex-end;
    flex: 1;
}

.expense-edit-form {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    gap: 0.5rem;
    align-items: center;
}

.expense-item input {
    padding: 2px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    font-size: 20px;
    outline: none;
    border-radius: 0.3rem;
    width: 100%;
}
.expense-item input.expense-input-title {
    padding-left: 0.3rem;
    flex: 5;
}
.expense-item input.expense-input-price {
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
