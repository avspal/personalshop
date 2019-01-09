import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName='';
    let reeipeImagePath='';
    let recipeDescription='';
    let recipeIngridients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeDescription=recipe.description;
      reeipeImagePath=recipe.imagePath;
      if(recipe['ingridients']){
        for (const ingridient of recipe.ingridients) {
          recipeIngridients.push(
            new FormGroup({
              'name' : new FormControl(ingridient.name, Validators.required),
              'amount' : new FormControl(ingridient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(reeipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingridients' : recipeIngridients
    });
  }

  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }


  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingridients']
    // );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeService.addRrecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onRemoveIngridient(index:number){
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
}
