// src/types/index.ts

export interface Translation {
    [key: string]: string;
}

export interface Translations {
    en: Translation;
    'pt-BR': Translation;
}