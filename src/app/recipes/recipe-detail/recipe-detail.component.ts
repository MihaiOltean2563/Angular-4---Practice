import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; 
          //we know we get a string from 
          //these params, so we cast it to number by adding a "+" prefix
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  onAddToShoppingList(){
   this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route}) 
    //OR the more complex one
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
