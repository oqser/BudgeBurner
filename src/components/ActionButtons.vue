<script setup lang="ts">
import { computed } from "vue";
import editIcon from "/src/assets/edit-pencil-icon1.svg";
import saveIcon from "/src/assets/save-icon1.svg";
import deleteIcon from "/src/assets/delete-icon1.svg";
import cancelIcon from "/src/assets/delete-icon.svg";

const props = defineProps<{
    isEditing: boolean;
}>();

const emit = defineEmits(["edit", "save", "cancel", "delete"]);

const buttons = computed(() => {
    return props.isEditing
        ? [
              {
                  type: "submit" as const,
                  class: "save-button",
                  icon: saveIcon,
                  alt: "Save",
                  handler: () => emit("save"),
              },
              {
                  type: "button" as const,
                  class: "cancel-button",
                  icon: cancelIcon,
                  alt: "Cancel",
                  handler: () => emit("cancel"),
              },
          ]
        : [
              {
                  type: "button" as const,
                  class: "edit-button",
                  icon: editIcon,
                  alt: "Edit",
                  handler: () => emit("edit"),
              },
              {
                  type: "button" as const,
                  class: "delete-button",
                  icon: deleteIcon,
                  alt: "Delete",
                  handler: () => emit("delete"),
              },
          ];
});
</script>

<template>
    <div class="action-buttons">
        <button
            v-for="(action, index) in buttons"
            :key="index"
            :type="action.type"
            :class="action.class"
            @click="action.handler"
            v-on="action.type === 'submit' ? {} : { click: action.handler }"
        >
            <img
                :src="action.icon"
                :class="`${action.class}-img`"
                :alt="action.alt"
            />
        </button>
    </div>
</template>

<style scoped>
button {
    width: 18px;
}
img {
    width: 18px;
}

button {
    transition: transform 0.3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;
}

button:hover {
    transform: scale(1.4);
}
</style>
