import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent {
  ingredients: Ingredient[];
  private idChangeSub: Subscription;  

  constructor(private shoppingListService: shoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSub = this.shoppingListService.ingredientChange.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  
  onEditItem(i: number){
    this.shoppingListService.startedEditing.next(i)
  }

  ngOnDestroy(){
    this.idChangeSub.unsubscribe()
  }

}
