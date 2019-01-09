import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService{
    ingridientsChanged=new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[]=[
        new Ingredient("Apple",5),
        new Ingredient("Tomato",5),
      ];

      getIngridients(){
          return this.ingredients.slice();
      }

      getIngridient(index:number){
          return this.ingredients[index];
      }

      addIngridient(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingridientsChanged.next(this.ingredients.slice());
      }

      setIngridients(ingridients:Ingredient[]){
           this.ingredients.push(...ingridients);
           this.ingridientsChanged.next(this.ingredients.slice());
      }

      updateIngridient(index:number, newIngridient:Ingredient){
          this.ingredients[index]=newIngridient;
          this.ingridientsChanged.next(this.ingredients.slice());
      }
    
    deleteIngridient(index:number){
        this.ingredients.splice(index,1);
        this.ingridientsChanged.next(this.ingredients.slice());
    }  
}