import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService){}

    storeRecipes(){
        const token=this.authService.getToken();
        return this.http.put('https://ng-recipe-book-6e939.firebaseio.com/recipes.json?auth='+token,
                    this.recipeService.getRecipes());
    }

    fetchRecipes(){
        const token=this.authService.getToken();
        this.http.get('https://ng-recipe-book-6e939.firebaseio.com/recipes.json?auth='+token)
                .pipe(
                    map(
                        (response:Recipe[])=>{
                            const recipes = response;
                            for (const recipe of recipes) {
                                if(!recipe['ingridients']){
                                    console.log(recipe);
                                    recipe['ingridients'] = [];
                                }
                            }
                            return recipes;
                        }
                    )
                ).subscribe(
                    (res:Recipe[])=>{
                        console.log(res);
                        this.recipeService.setRecipes(res);
                    }
                );
    }
}