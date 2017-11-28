import { Recipe } from "../recipe.model";
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
    recipes: State
}

export interface State{
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Tasty Schnietzel', 
        'A super tasty Schnietzel - super awesome!',
        'https://discoverviennatours.com/wp-content/uploads/2014/04/Wiener-Schnitzel-Vienna-walking-tour.jpg',
        [
            new Ingredient('meat', 1),
            new Ingredient('french fries', 20)
        ]),
        
        new Recipe('Big Fat Burger', 
        'What else you need to say?',
        'http://www.seriouseats.com/recipes/assets_c/2015/07/20150728-homemade-whopper-food-lab-35-thumb-1500xauto-425129.jpg',
        [
            new Ingredient('bread', 2),
            new Ingredient('meat', 1)
        ])
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions){
    switch(action.type){
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE: 
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return state;
    }
}