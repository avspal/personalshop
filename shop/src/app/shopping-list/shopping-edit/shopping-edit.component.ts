import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm; 
  subscription:Subscription;
  editMode:boolean=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.shoppingListService.getIngridient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(){
    const value= this.form.value;
    const ingredient= new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngridient(this.editedItemIndex,ingredient);
    }else{
      this.shoppingListService.addIngridient(ingredient);
    }
    this.editMode=false;
    this.form.reset();
  }

  onClear(){
    this.form.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.deleteIngridient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
