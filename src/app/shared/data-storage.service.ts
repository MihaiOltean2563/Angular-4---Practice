import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService{
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService){

    }

    storeRecipes(){

        // const headers = new HttpHeaders().set('Authorization', 'Bearer afsdfsd');

        // return this.httpClient.put(
        //     'https://ng-recipe-book-5749a.firebaseio.com/recipes.json',
        //     this.recipeService.getRecipes(),
        //     {
        //         observe: 'body',
        //         // headers: headers
        //         params: new HttpParams().set('auth', token)
        //     }
        // );

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