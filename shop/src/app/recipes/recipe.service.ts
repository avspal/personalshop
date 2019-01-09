import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Array<Recipe>>();
    private recipes:Recipe[]=[
        new Recipe(
            'pizza',
            'this is pizza',
            'https://cdn.pixabay.com/photo/2017/11/08/15/34/recipe-2930786_960_720.jpg',
            [
                new Ingredient('meat',1),
                new Ingredient('French Fries',20)
            ]),
        new Recipe(
            'Burger',
            'this is Burger',
            'https://cdn.pixabay.com/photo/2017/11/08/15/34/recipe-2930786_960_720.jpg',
            [
                new Ingredient('meat',1),
                new Ingredient('Buns',2)
            ])
        ];


    constructor(private shoppingListService:ShoppingListService){}
    
    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngridientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.setIngridients(ingredients);
    }

    getRecipe(index:number):Recipe{
        return this.recipes[index];
    }

    addRrecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}