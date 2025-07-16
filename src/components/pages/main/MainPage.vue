<script setup lang="ts">
import ExpenseForm from "../../ExpenseForm.vue";
import ExpenseItem from "../../ExpenseItem.vue";
import { computed, ref, watch, watchEffect } from "vue";
import { useExpenses } from "../../../composables/useExpenses";
import Pagination from "../../Pagination.vue";
import SortSelector from "../../SelectorSort.vue";
import { useSettings } from "../../../composables/useSettings";

const currentPage = ref(1);
const itemsPerPage = ref(10);
const currentSort = ref("-date");

const { data: settingsData } = useSettings(1);
watchEffect(() => {
    const settings = settingsData.value?.[0];
    if (!settings) return;

    currentSort.value = settings.sorting || currentSort.value;
    itemsPerPage.value = settings.pagination || itemsPerPage.value;
});

const settings = computed(() => ({
    user_id: 1,
    sorting: currentSort.value,
    pagination: itemsPerPage.value,
}));

const { data: expensesData } = useExpenses(
    currentPage,
    itemsPerPage,
    currentSort
);

const expenses = computed(() => {
    if (!expensesData.value) return [];
    return [...expensesData.value.items];
});

const paginationMeta = computed(
    () =>
        expensesData.value?.meta || {
            total_items: 0,
            total_pages: 1,
            current_page: 1,
            per_page: itemsPerPage.value,
            remaining_count: 0,
        }
);

const handlePageChange = (page: number) => {
    currentPage.value = page;
};

const handlePerPageChange = (perPage: number) => {
    itemsPerPage.value = perPage;
};
</script>

<template>
    <div class="expense-content">
        <h2>Лист затрат</h2>

        <ExpenseForm />

        <div class="expense-list-block">
            <ExpenseItem
                v-for="expense in expenses"
                :key="expense.id"
                :expense="expense"
            />
        </div>
        <div class="expense-list-toolbar">
            <Pagination
                :meta="paginationMeta"
                :modelValue="currentPage"
                @update:modelValue="handlePageChange"
                @update:perPage="handlePerPageChange"
            />
            <SortSelector v-model="currentSort" :settings="settings" />
        </div>
    </div>
</template>

<style scoped>
.expense-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    gap: 1rem;
}
.expense-list-block {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

h2 {
    margin: 2rem 0;
}

.expense-list-toolbar {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    box-sizing: border-box;
}
</style>
