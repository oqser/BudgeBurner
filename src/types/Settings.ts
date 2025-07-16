export type Settings = {
    user_id: number;
    sorting: string;
    pagination: number;
};

export type SettingsUpdate = Settings & {
    settingType?: 'sorting' | 'pagination';
};