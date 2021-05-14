import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Testy Schntize',
        'This is super tasty -just awesome',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1bPJyZFSVNJArocOLzfbkRMC5_GsbZFUfw&usqp=CAU',
        [
            new Ingredient('Meat',1),
            new Ingredient('Fresh Fries',20)
        ]
        ),
        new Recipe('Big Fat Burger',
        'What else you need to say ?','https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
        ])
       ];
        
       constructor(private slService:ShoppingListService){}
       getRecipes(){
           return this.recipes.slice();
       }

       addIngredientsToShoppingList(ingredients: Ingredient[]){
             this.slService.addIngrediets(ingredients);
       }
}