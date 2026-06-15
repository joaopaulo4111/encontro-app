import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { CheckboxCardComponent } from '../shared/checkbox-card/checkbox-card.component';
import { FormsModule } from '@angular/forms';

/**
 * StepActivitiesComponent represents Step 3.
 * Users select multiple activities they like.
 * If 'Outros' is checked, a text box appears to enter a custom activity.
 * It remains valid even if no activity is selected (optional step),
 * but displays a suttle warning if empty.
 */
@Component({
  selector: 'app-step-activities',
  standalone: true,
  imports: [ProgressBarComponent, CheckboxCardComponent, FormsModule],
  templateUrl: './step-activities.component.html',
  styleUrl: './step-activities.component.css'
})
export class StepActivitiesComponent {
  // Inject the reactive form state service
  readonly formService = inject(FormService);

  // Navigation events
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  // Activity checkbox options
  readonly activityOptions = [
    { label: 'Cinema', icon: '🎬' },
    { label: 'Restaurante', icon: '🍽️' },
    { label: 'Café', icon: '☕' },
    { label: 'Caminhada', icon: '🚶' },
    { label: 'Parque', icon: '🌿' },
    { label: 'Shopping', icon: '🛍️' },
    { label: 'Praia', icon: '🏖️' },
    { label: 'Jogos', icon: '🎮' },
    { label: 'Shows', icon: '🎶' },
    { label: 'Outros', icon: '🎨' }
  ];

  isActivitySelected(label: string): boolean {
    return this.formService.selectedActivities().includes(label);
  }

  /**
   * Toggles selection of an activity.
   * Clears the custom activity input text if 'Outros' is deselected.
   */
  toggleActivity(label: string) {
    const current = this.formService.selectedActivities();
    if (current.includes(label)) {
      this.formService.selectedActivities.set(current.filter(a => a !== label));
      if (label === 'Outros') {
        this.formService.customActivity.set('');
      }
    } else {
      this.formService.selectedActivities.set([...current, label]);
    }
  }

  get showCustomInput(): boolean {
    return this.isActivitySelected('Outros');
  }

  /**
   * Checks if no options are chosen (taking into account custom activity input).
   */
  get isSelectionEmpty(): boolean {
    const selected = this.formService.selectedActivities();
    if (selected.length === 0) return true;
    
    // If only 'Outros' is chosen, but custom text is blank, treat it as empty
    if (selected.length === 1 && selected[0] === 'Outros' && !this.formService.customActivity().trim()) {
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
