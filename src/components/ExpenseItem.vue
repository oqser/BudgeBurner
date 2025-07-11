<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    expense: {
        id: number;
        title: string;
        price: number;
    };
}>();

const emit = defineEmits(["delete-expense", "update-expense"]);

const isEditing = ref(false);
const editTitle = ref(props.expense.title);
const editPrice = ref(props.expense.price);

const updateData = () => {
    emit("update-expense", {
        id: props.expense.id,
        title: editTitle.value,
        price: editPrice.value,
    });
    isEditing.value = false;
};
</script>

<template>
    <div class="expense-item">
        <div class="expense-item-title">
            <p v-if="!isEditing">{{ expense.title }}</p>
            <input
                class="expense-input-title"
                v-else
                type="text"
                v-model="editTitle"
            />
        </div>
        <div class="expense-item-price">
            <p v-if="!isEditing">{{ expense.price }}</p>
            <input
                class="expense-input-price"
                v-else
                type="number"
                v-model="editPrice"
            />
        </div>
        <div class="expense-item-actions">
            <span
                @click="isEditing = true"
                class="edit-button"
                v-if="!isEditing"
            >
                <img
                    src="/src/assets/edit-pencil.svg"
                    class="edit-button-img"
                />
            </span>
            <span @click="updateData" class="save-button" v-else>
                <img src="/src/assets/save-icon.svg" class="save-button-img" />
            </span>
            <span
                class="delete-button"
                @click="$emit('delete-expense', expense)"
            >
                X
            </span>
        </div>
    </div>
</template>

<style scoped>
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
</style>
