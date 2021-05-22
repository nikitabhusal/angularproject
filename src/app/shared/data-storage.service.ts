import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put(
        'https://recipe-project-207ed-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRcipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://recipe-project-207ed-default-rtdb.firebaseio.com/recipes.json',
          { params: new HttpParams().set('auth', user.token) }
        );
      }),
      map((recipes: any) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes: any) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
