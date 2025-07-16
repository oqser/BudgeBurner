import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import api from "../api";
import type { Settings } from "../types/Settings";
import { toast } from "vue3-toastify";

export const useSettings = (userId?: number) =>
    useQuery<Settings[]>({
        queryKey: ["settings", userId],
        queryFn: async () => {
            const res = await api.get("/settings", {
                params: { user_id: userId },
            });
            return res.data;
        },
    });

// Обновление настроек
export const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Settings) => {
            const res = await api.patch(`/settings/${data.user_id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при обновлении: ${(errorData as any)?.title || "..."}`
            ),
    });
};
