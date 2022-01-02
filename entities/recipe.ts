import { RecipeDuration } from './time';
import { recipeSchema } from './schemas/recipe';

export interface RecipeResume {
    /*Remote cover image URL*/
    imageUrl: string;

    /*Recipe name, example: "Carrot Cake With Chocolate Topping"*/
    name: string;

    /*Preparation time in hours and minutes*/
    preparationTime?: RecipeDuration;

    /*Record's unique identifier, a GUID, for example*/
    id: string;

    /*Estimated number of servings*/
    serves: number;
}

export interface RecipeData extends RecipeResume {
    ingredientsLists: IngredientsList[];
    preparationMode: Stage[];
    source: RecipeSource;
}

export interface RecipeSource {
    /*Site name author*/
    authorName: string;

    /*Website URL author*/
    url: string;
}

export interface Stage {
    /*Step name, example: "prepare chocolate syrup"*/
    name?: string;

    /*Detailed and ordered steps*/
    steps: string[];
}

export interface IngredientsList {
    /*List title, example: "Chocolate syrup", "Cake dough"*/
    name?: string;

    /*Ingredients for the list, example: ["100g powdered chocolate", "100ml milk"]*/
    items: string[];
}

export class Recipe implements RecipeData {
    readonly ingredientsLists: IngredientsList[] = [];
    readonly preparationMode: Stage[] = [];
    readonly source!: { authorName: string; url: string };
    readonly imageUrl!: string;
    readonly name!: string;
    readonly id!: string;
    readonly preparationTime!: RecipeDuration;
    readonly serves: number = NaN;
    readonly isValid: boolean = false;

    constructor(data: RecipeData) {
        Object.assign(this, data);
        this.isValid = !this.getErrors()?.length;
    }

    getErrors(): string[] | undefined {
        const validationObject = recipeSchema.validate(this, {
            abortEarly: false
        });
        return validationObject.error?.details.map((err) => err.message);
    }
}
