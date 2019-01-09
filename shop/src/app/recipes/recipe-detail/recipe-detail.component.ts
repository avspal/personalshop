import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router:Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
      }
    );
  }
  addToShoppingList(){
    this.recipeService.addIngridientsToShoppingList(this.recipe.ingridients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    if(this.authService.isAuthenticated()){
      this.recipeService.deleteRecipe(this.id);
    }
    this.router.navigateByUrl('/recipes');
  }
}
