import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: shoppingListService) {}

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (i: number) => {
        this.editedItemIndex = i;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(i);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    )
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.reset()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onClear(){
    this.slForm.reset(),
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    // this.onClear();
  }
}
