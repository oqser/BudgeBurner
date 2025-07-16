import {  useQuery } from "@tanstack/vue-query";
import api from "../api";


import type { Settings } from "../types/Settings";

// Получение настроек
export const useSettings = () =>
    useQuery<Settings[]>({
        queryKey: ["settings"],
        queryFn: async () => {
            const res = await api.get("/settings");
            console.log(res.data);
            return res.data;
        },
    });
