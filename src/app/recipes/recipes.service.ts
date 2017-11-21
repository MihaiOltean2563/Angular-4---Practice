import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
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
        ]),

    ];

    constructor(private slService: ShoppingListService ){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    getRecipes(){
        return this.recipes.slice(); 
        /*we slice here to ensure that we return a copy of the recipes 
        from the service, and that it can't be modified from
         outside the service.*/
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
