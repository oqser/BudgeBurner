<script setup lang="ts">
import { ref } from "vue";
import { useDeleteExpense, useUpdateExpense } from "../composables/useExpenses";
import { toast } from "vue3-toastify";
import editIcon from "/src/assets/edit-pencil-icon1.svg";
import saveIcon from "/src/assets/save-icon1.svg";
import deleteIcon from "/src/assets/delete-icon1.svg";
import cancelIcon from "/src/assets/delete-icon.svg";

const props = defineProps<{
    expense: {
        id: number;
        title: string;
        price: number;
    };
}>();

const isEditing = ref(false);
const editTitle = ref(props.expense.title);
const editPrice = ref(props.expense.price);

const { mutate: deleteExpense } = useDeleteExpense(props.expense);
const { mutate: updateExpense, isPending } = useUpdateExpense();

// update expense
const updateData = () => {
    updateExpense({
        id: props.expense.id,
        title: editTitle.value,
        price: editPrice.value,
    });
    isEditing.value = false;
};

// delete expense
const handleDelete = () => deleteExpense();

const vFocus = {
    mounted: (el: any) => el.focus(),
};
</script>

<template>
    <div class="expense-item">
        <form
            v-if="isEditing"
            @submit.prevent="updateData"
            class="expense-edit-form"
        >
            <input
                class="expense-input-title"
                type="text"
                v-model="editTitle"
                @keyup.esc="isEditing = false"
                required
            />

            <input
                class="expense-input-price"
                type="number"
                v-model.number="editPrice"
                @keyup.esc="isEditing = false"
                required
                min="0"
            />

            <div class="expense-item-actions">
                <button type="submit" class="save-button" v-focus>
                    <img :src="saveIcon" class="save-button-img" alt="Save" />
                </button>
                <button
                    type="button"
                    class="cancel-button"
                    @click="isEditing = false"
                >
                    <img
                        :src="cancelIcon"
                        class="cancel-button-img"
                        alt="Cancel"
                    />
                </button>
            </div>
        </form>

        <div v-else class="expense-view">
            <div class="expense-item-title">
                <p>{{ expense.title }}</p>
            </div>
            <div class="expense-item-price">
                <p>{{ expense.price }}</p>
            </div>
            <div class="expense-item-actions">
                <button @click="isEditing = true" class="edit-button">
                    <img :src="editIcon" class="edit-button-img" alt="Edit" />
                </button>
                <button class="delete-button" @click="handleDelete">
                    <img
                        :src="deleteIcon"
                        class="delete-button-img"
                        alt="Delete"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.expense-item {
    display: flex;
    width: 100%;
    box-sizing: border-box;
}

.expense-view {
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

.expense-edit-form {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    gap: 0.5rem;
    align-items: center;
}

.expense-item input {
    border-radius: 8px;
    font-size: 20px;
    outline: none;
    border: none;
    width: 100%;
    color: green;
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
    transform: rotate(30deg);
}
.expense-item .save-button-img {
    width: 15px;
    cursor: pointer;
}
.expense-item .delete-button-img {
    width: 15px;
    cursor: pointer;
}
.expense-item .cancel-button-img {
    width: 15px;
    cursor: pointer;
}

.expense-item-actions button {
    display: inline-block;
    transition: transform 0.3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;
}

.expense-item-actions button:hover {
    transform: scale(1.4);
}
</style>
