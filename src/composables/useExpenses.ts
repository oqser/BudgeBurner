import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseQueryOptions,
} from "@tanstack/vue-query";
import api from "../api";
import { toast } from "vue3-toastify";
import type { Ref } from "vue";
import type { PaginationMeta } from "../types/Pagination";
import type { Expense } from "../types/Expense";

type PaginatedResponse<T> = {
    meta: PaginationMeta;
    items: T[];
};

// Получение
export const useExpenses = (
    page: Ref<number>,
    limit: Ref<number>,
    sort: Ref<string>,
    options?: any //Partial<UseQueryOptions<PaginatedResponse<Expense>>>
) => {
    return useQuery<PaginatedResponse<Expense>>({
        queryKey: ["expenses", page, limit, sort],
        queryFn: async () => {
            try {
                const res = await api.get("/expenses", {
                    params: {
                        sortBy: sort.value,
                        page: page.value,
                        limit: limit.value,
                    },
                });
                return res.data;
            } catch (error: any) {
                toast.error(`Ошибка получения данных: ${error.message}`);
                throw new Error("Не удалось загрузить данные о расходах");
            }
        },
        retry: 1,
        ...options,
    });
};

// Создание
export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Omit<Expense, "id">) => {
            const res = await api.post("/expenses", data);
            return res.data;
        },
        onSuccess: (newExpense) => {
            toast.success(`Добавлено: ${newExpense.title}`);
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при добавлении: ${(errorData as any)?.title || "..."}`
            ),
    });
};

// Обновление
export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Expense) => {
            const res = await api.patch(`/expenses/${data.id}`, data);
            return res.data;
        },
        onSuccess: (updatedExpense) => {
            toast.success(`Обновлено: ${updatedExpense.title}`);
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при обновлении: ${(errorData as any)?.title || "..."}`
            ),
    });
};

// Удаление
export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, title }: { id: number; title: string }) => {
            await api.delete(`/expenses/${id}`);
            return title;
        },
        onSuccess: (deletedTitle) => {
            toast.error(`Удалено: ${deletedTitle}`);
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при удалении: ${(errorData as any)?.title || "..."}`
            ),
    });
};
