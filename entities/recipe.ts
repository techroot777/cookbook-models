import { RecipeDuration } from './time';

export interface RecipeResume {
    imageUrl?: string;
    name: string;
    preparationTimeInMinutes: number;
    preparationTime?: RecipeDuration;
    id: string;
    serves: number;
}

export interface RecipeData extends RecipeResume {
    ingredientsLists: IngredientsList[];
    preparationMode: Stage[];
    culinary?: string[];
    category?: string[];
    additionalInfo?: string;
    source: {
        authorName: string;
        url: string;
    };
}

export interface Stage {
    name?: string;
    steps: string[];
}

export interface IngredientsList {
    name?: string;
    items: string[];
}

export interface Category {
    imageUrl: string;
    name: string;
    id: number;
}

export class Recipe implements RecipeData {
    readonly ingredientsLists: IngredientsList[] = [];
    readonly preparationMode: Stage[] = [];
    readonly source!: { authorName: string; url: string };
    readonly imageUrl!: string;
    readonly name!: string;
    readonly id!: string;
    readonly preparationTimeInMinutes: number = NaN;
    readonly preparationTime!: RecipeDuration;
    readonly serves: number = NaN;
    readonly culinary?: string[] = [];
    readonly category?: string[] = [];
    readonly additionalInfo?: string;
    readonly isValid: boolean = false;

    constructor(data: RecipeData) {
        Object.assign(this, data);
        this.isValid = !this.getErrors().length;
    }

    getErrors(servesRequired = false, durationRequired = false): string[] {
        const messages = [];

        if (!this.name?.trim()) {
            messages.push(this.requiredMessage('Nome'));
        }

        if (!this.imageUrl?.trim()) {
            messages.push(this.requiredMessage('URL da image'));
        }

        if ((servesRequired && !this.serves) || isNaN(this.serves)) {
            messages.push(this.requiredMessage('Número de porções'));
        }

        const { minutes, hours } = this.preparationTime;

        if (
            durationRequired &&
            (!this.preparationTime || minutes + hours < 1)
        ) {
            messages.push(this.requiredMessage('A duração de preparo'));
        }

        if (
            !this.ingredientsLists?.length ||
            !this.ingredientsLists.some((list) => list.items.length > 0)
        ) {
            messages.push(this.requiredMessage('A lista de ingredientes'));
        }

        if (
            !this.preparationMode?.length ||
            !this.preparationMode.some((list) => list.steps.length > 0)
        ) {
            messages.push(this.requiredMessage('O modo de preparo'));
        }

        return messages;
    }

    private requiredMessage(attributeName: string) {
        return `${attributeName} está vazio(a)`;
    }
}
