import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { CheckboxCardComponent } from '../shared/checkbox-card/checkbox-card.component';
import { FormsModule } from '@angular/forms';

/**
 * StepFoodComponent represents Step 4.
 * It queries users on food choices with multiple selection.
 * Features an optional custom text box for "Outros" choices.
 */
@Component({
  selector: 'app-step-food',
  standalone: true,
  imports: [ProgressBarComponent, CheckboxCardComponent, FormsModule],
  templateUrl: './step-food.component.html',
  styleUrl: './step-food.component.css'
})
export class StepFoodComponent {
  // Inject the reactive form state service
  readonly formService = inject(FormService);

  // Navigation events
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  // Available food options
  readonly foodOptions = [
    { label: 'Pizza', icon: '🍕' },
    { label: 'Hambúrguer', icon: '🍔' },
    { label: 'Japonesa', icon: '🍣' },
    { label: 'Italiana', icon: '🍝' },
    { label: 'Churrasco', icon: '🥩' },
    { label: 'Mexicana', icon: '🌮' },
    { label: 'Doces', icon: '🍰' },
    { label: 'Sorvete', icon: '🍦' },
    { label: 'Café', icon: '☕' },
    { label: 'Outros', icon: '🍴' }
  ];

  isFoodSelected(label: string): boolean {
    return (this.formService.selectedFoods() as string[]).includes(label);
  }

  /**
   * Toggles selection of a food item.
   * Clears the custom food input text if 'Outros' is deselected.
   */
  toggleFood(label: string) {
    const current = this.formService.selectedFoods() as string[];
    if (current.includes(label)) {
      this.formService.selectedFoods.set(current.filter(f => f !== label));
      if (label === 'Outros') {
        this.formService.customFood.set('');
      }
    } else {
      this.formService.selectedFoods.set([...current, label]);
    }
  }

  get showCustomInput(): boolean {
    return this.isFoodSelected('Outros');
  }

  /**
   * Checks if no options are chosen (taking into account custom food input).
   */
  get isSelectionEmpty(): boolean {
    const selected = this.formService.selectedFoods() as string[];
    if (selected.length === 0) return true;
    
    // If only 'Outros' is chosen, but custom text is blank, treat it as empty
    if (selected.length === 1 && selected[0] === 'Outros' && !this.formService.customFood().trim()) {
      return true;
    }
    return false;
  }

  onNextClick() {
    this.next.emit();
  }

  onBackClick() {
    this.back.emit();
  }
}
