import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import 'rxjs/add/operator/take';

import { Observable } from 'rxjs/Observable';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; 
          //we know we get a string from 
          //these params, so we cast it to number by adding a "+" prefix
          this.recipeState = this.store.select('recipes');
        }
      )
  }

  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) =>{
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route}) 
    //OR the more complex one
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
