import Joi from 'joi';
import { IngredientsList, RecipeData, RecipeSource, Stage } from '../recipe';
import { RecipeDuration } from '../time';

const ingredientsSchema = Joi.object<IngredientsList>({
    name: Joi.string().optional(),
    items: Joi.array().min(1).items(Joi.string().required().trim().min(1))
});

const preparationModeSchema = Joi.object<Stage>({
    name: Joi.string().optional(),
    steps: Joi.array().min(1).items(Joi.string().required().trim().min(1))
});

export const recipeSchema = Joi.object<RecipeData>({
    imageUrl: Joi.string().required().uri(),
    id: Joi.string().required().trim().min(1),
    name: Joi.string().required().trim().min(1),
    serves: Joi.number().optional().min(0),
    ingredientsLists: Joi.array().min(1).items(ingredientsSchema),
    preparationTime: Joi.object<RecipeDuration>({
        minutes: Joi.number().min(0),
        hours: Joi.number().min(0)
    }).optional(),
    preparationMode: Joi.array().min(1).items(preparationModeSchema),
    source: Joi.object<RecipeSource>({
        authorName: Joi.string().required().trim().min(1),
        url: Joi.string().required().uri()
    }).required()
});
