import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Testy Schntize',
      'This is super tasty -just awesome',
      'https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800',
      [new Ingredient('Meat', 1), new Ingredient('Fresh Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say ?',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngrediets(ingredients);
  }
}
