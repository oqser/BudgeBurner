<script setup lang="ts">
import { computed } from "vue";
import editIcon from "/src/assets/edit-pencil-icon1.svg";
import saveIcon from "/src/assets/save-icon1.svg";
import deleteIcon from "/src/assets/delete-icon1.svg";
import cancelIcon from "/src/assets/delete-icon.svg";

type ActionButton = {
    type: "button" | "submit";
    class: string;
    icon: string;
    handler: () => void;
    alt: string;
};

const props = defineProps<{
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
}>();

const emit = defineEmits<{
    (e: "edit"): void;
    (e: "save"): void;
    (e: "cancel"): void;
    (e: "delete"): void;
}>();

const actionButtons = computed<ActionButton[]>(() =>
    props.isEditing
        ? [
              {
                  type: "submit",
                  class: "save-button",
                  icon: saveIcon,
                  handler: () => emit("save"),
                  alt: "Save",
              },
              {
                  type: "button",
                  class: "cancel-button",
                  icon: cancelIcon,
                  handler: () => emit("cancel"),
                  alt: "Cancel",
              },
          ]
        : [
              {
                  type: "button",
                  class: "edit-button",
                  icon: editIcon,
                  handler: () => emit("edit"),
                  alt: "Edit",
              },
              {
                  type: "button",
                  class: "delete-button",
                  icon: deleteIcon,
                  handler: () => emit("delete"),
                  alt: "Delete",
              },
          ]
);
</script>

<template>
    <div class="expense-item-actions">
        <template v-for="action in actionButtons" :key="action.class">
            <button
                :type="action.type"
                :class="action.class"
                @click="action.handler"
                :alt="action.alt"
            >
                <img
                    :src="action.icon"
                    :class="`${action.class}-img`"
                    :alt="action.alt"
                />
            </button>
        </template>
    </div>
</template>

<style scoped>
.expense-item-actions {
    display: flex;
    align-items: flex-end;
    gap: 0.3rem;
    flex: 1;
    justify-content: flex-end;
}

.expense-item-actions img {
    width: 20px;
}

.expense-item-actions button {
    transition: transform 0.3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;
    background: none;
}

.expense-item-actions button:hover {
    transform: scale(1.4);
}

.edit-button-img {
    transform: rotate(45deg);
}
</style>
