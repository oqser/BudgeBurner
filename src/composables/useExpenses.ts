import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import api from "../api";
import { toast } from "vue3-toastify";

type Expense = {
    id: number;
    title: string;
    price: number;
};

// Получение
export const useExpenses = () =>
    useQuery<Expense[]>({
        queryKey: ["expenses"],
        queryFn: async () => {
            const res = await api.get("/expenses");
            return res.data;
        },
    });
// // get
// export const useGetExpenses = () => {
//     return useQuery<Expense[], Error>({
//         queryKey: ["expenses"],

//         queryFn: async () => {
//             try {
//                 const { data } = await api.get<Expense[]>("/expenses");
//                 return data;
//             } catch (error) {
//                 if (axios.isAxiosError(error)) {
//                     if (error.response) {
//                         const errorMessage =
//                             error.response.data?.message ||
//                             error.response.statusText;
//                         throw new Error(`Server error: ${errorMessage}`);
//                     }
//                     if (error.request) {
//                         throw new Error(
//                             "Network error: Could not connect to server"
//                         );
//                     }
//                 }
//                 throw new Error(
//                     "Unknown error occurred while fetching expenses"
//                 );
//             }
//         },
//         refetchOnWindowFocus: false,
//         retry: 1,
//         staleTime: 1000 * 60 * 5,
//     });
// };

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
// update разобраться под делит
// export const useUpdateExpense = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ id, title, price }: Expense) => {
//             const { data } = await api.patch<Expense>(`/expenses/${id}`, {
//                 title,
//                 price,
//             });
//             return data;
//         },
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({ queryKey: ["expenses"] });
//             toast.success(`Успешно обновлен ${data.title}!`);
//             console.log(" Expense");
//         },
//         onError: (error: Error, data) => {
//             console.error("Update expense error:", error.message);
//             toast.error(`Не удалось обновить ${data.title}!`);
//         },
//         retry: 3,
//     });
// };

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
// // delete
// export const useDeleteExpense = (expense: Expense) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async () => {
//             const { data } = await api.delete<Expense>(
//                 `/expenses/${expense.id}`
//             );
//             return data;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["expenses"] });
//             toast.error(`${expense.title} удален`);
//         },
//         onError: (error: Error) => {
//             console.error("Delete expense error:", error.message);
//             toast.error(`Не удалось удалить ${expense.title}!`);
//         },
//         retry: 3,
//         // (failureCount, error) => {
//         //     if (axios.isAxiosError(error) && error.response?.status) {
//         //         return (
//         //             ![401, 404].includes(error.response.status) &&
//         //             failureCount < 1
//         //         );
//         //     }
//         //     return failureCount < 1;
//         // },
//     });
// };
