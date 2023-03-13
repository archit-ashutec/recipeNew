import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class shoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number){
    return this.ingredients[i]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChange.next(this.ingredients.slice());
    //   }
  }

  updateIngredient(i: number, newIngredient: Ingredient) {
    this.ingredients[i] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice())
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i,1);
    this.ingredientChange.next(this.ingredients.slice())
  }
}