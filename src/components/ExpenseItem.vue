<script setup lang="ts">
import { ref, watch } from "vue";
import { useDeleteExpense, useUpdateExpense } from "../composables/useExpenses";
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

const update = useUpdateExpense();
const remove = useDeleteExpense();

watch(
    () => props.expense,
    (newVal) => {
        editTitle.value = newVal.title;
        editPrice.value = newVal.price;
    },
    { immediate: true, deep: true }
);

const handleUpdate = () => {
    if (
        editTitle.value === props.expense.title &&
        editPrice.value === props.expense.price
    ) {
        isEditing.value = false;
        return;
    }

    update.mutate({
        id: props.expense.id,
        title: editTitle.value,
        price: editPrice.value || 0,
    });
    isEditing.value = false;
};

const handleRemove = () => {
    remove.mutate({
        id: props.expense.id,
        title: props.expense.title,
    });
};
const vFocus = {
    mounted: (el: any) => el.focus(),
};
</script>

<template>
    <div class="expense-item">
        <form
            v-if="isEditing"
            class="expense-edit-form"
            @submit.prevent="handleUpdate"
            
        >
            <input
                class="expense-input-title"
                type="text"
                v-model="editTitle"
                @keyup.esc="isEditing = false"
                required
                v-focus
                
            />

            <input
                class="expense-input-price"
                type="number"
                v-model.number="editPrice"
                @keyup.esc="isEditing = false"
            />

            <div class="expense-item-actions">
                <button type="submit" class="save-button">
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
                <p>
                    {{ expense.price === 0 ? "" : `${expense.price}` }}
                </p>
            </div>
            <div class="expense-item-actions">
                <button @click="isEditing = true" class="edit-button">
                    <img :src="editIcon" class="edit-button-img" alt="Edit" />
                </button>
                <button class="delete-button" @click="handleRemove">
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
    padding: 0;
    border: 2px solid transparent;
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

.expense-item-actions {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    flex: 1;
    justify-content: flex-end;
}

.expense-item .edit-button-img {
    transform: rotate(45deg);
}
.expense-item img {
    width: 18px;
}

.expense-item-actions button {
    transition: transform 0.3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;
}

.expense-item-actions button:hover {
    transform: scale(1.4);
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
