import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';

import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService{
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService){

    }

    storeRecipes(){

        const req = new HttpRequest(
            'PUT',  
            'https://ng-recipe-book-5749a.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), 
            { reportProgress: true }
        )
        return this.httpClient.request(req);
    }

    getRecipes(){

            
        return this.httpClient.get<Recipe[]>(
            'https://ng-recipe-book-5749a.firebaseio.com/recipes.json',
            {
                observe: 'body',
                responseType: 'json',
            }
        )
        .map(
            (recipes) => {
                console.log(recipes);
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        ) 
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}