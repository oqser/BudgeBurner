<script setup lang="ts">
import { ref, computed } from "vue";
import { useDeleteExpense, useUpdateExpense } from "../composables/useExpenses";
import editIcon from "/src/assets/edit-pencil-icon1.svg";
import saveIcon from "/src/assets/save-icon1.svg";
import deleteIcon from "/src/assets/delete-icon1.svg";
import cancelIcon from "/src/assets/delete-icon.svg";
import { useCloseActions } from "../utils/useCloseActions";

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

const actionButtons = computed(() => [
    ...(isEditing.value
        ? [
              {
                  type: "submit" as const,
                  class: "save-button",
                  icon: saveIcon,
                  handler: handleUpdate,
                  alt: "Save",
              },
              {
                  type: "button" as const,
                  class: "cancel-button",
                  icon: cancelIcon,
                  handler: cancelEditing,
                  alt: "Cancel",
              },
          ]
        : [
              {
                  type: "button" as const,
                  class: "edit-button",
                  icon: editIcon,
                  handler: () => (isEditing.value = true),
                  alt: "Edit",
              },
              {
                  type: "button" as const,
                  class: "delete-button",
                  icon: deleteIcon,
                  handler: handleRemove,
                  alt: "Delete",
              },
          ]),
]);
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

            <div class="expense-item-actions">
                <template v-for="action in actionButtons" :key="action">
                    <button
                        :type="action.type"
                        :class="action.class"
                        @click="action.handler"
                        alt="action.alt"
                    >
                        <img
                            :src="action.icon"
                            :class="`${action.class}-img`"
                            :alt="action.alt"
                        />
                    </button>
                </template>
            </div>
        </form>

        <div v-else class="expense-view">
            <div class="expense-item-title">
                <p>{{ expense.title }}</p>
            </div>
            <div class="expense-item-price">
                <p>{{ expense.price === 0 ? "" : expense.price }}</p>
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
