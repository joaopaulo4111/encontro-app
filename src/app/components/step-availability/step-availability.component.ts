import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { CheckboxCardComponent } from '../shared/checkbox-card/checkbox-card.component';

/**
 * StepAvailabilityComponent represents Step 1.
 * It collects available days (multiple choice) and available time-slots (multiple choice).
 * Validates that at least one day and one time slot are checked before moving forward.
 */
@Component({
  selector: 'app-step-availability',
  standalone: true,
  imports: [ProgressBarComponent, CheckboxCardComponent],
  templateUrl: './step-availability.component.html',
  styleUrl: './step-availability.component.css'
})
export class StepAvailabilityComponent {
  // Inject the reactive form state service
  readonly formService = inject(FormService);
  
  // Navigation output events
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  // Tracks if validation error message should be displayed
  readonly showValidationError = signal<boolean>(false);

  // List of days options
  readonly availableDays = [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
  ];

  // List of time slot options with labels, values, and decorative emojis
  readonly timeSlotsData = [
    { label: 'Manhã (6h–12h)', value: 'Manhã', icon: '🌅' },
    { label: 'Tarde (12h–18h)', value: 'Tarde', icon: '🌞' },
    { label: 'Noite (18h–23h)', value: 'Noite', icon: '🌙' }
  ];

  /**
   * Validation rule: at least 1 day and 1 time-slot must be chosen.
   */
  get isValid(): boolean {
    return this.formService.days().length > 0 && this.formService.timeSlots().length > 0;
  }

  isDaySelected(day: string): boolean {
    return this.formService.days().includes(day);
  }

  /**
   * Toggles selection state of a specific day in the FormService.
   */
  toggleDay(day: string) {
    const current = this.formService.days();
    if (current.includes(day)) {
      this.formService.days.set(current.filter(d => d !== day));
    } else {
      this.formService.days.set([...current, day]);
    }
    this.showValidationError.set(false); // Reset validation error on change
  }

  isTimeSlotSelected(slot: string): boolean {
    return this.formService.timeSlots().includes(slot);
  }

  /**
   * Toggles selection state of a specific time slot in the FormService.
   */
  toggleTimeSlot(slot: string) {
    const current = this.formService.timeSlots();
    if (current.includes(slot)) {
      this.formService.timeSlots.set(current.filter(s => s !== slot));
    } else {
      this.formService.timeSlots.set([...current, slot]);
    }
    this.showValidationError.set(false); // Reset validation error on change
  }

  /**
   * Attempts to navigate forward if valid, otherwise displays validation hint.
   */
  onNextClick() {
    if (this.isValid) {
      this.next.emit();
    } else {
      this.showValidationError.set(true);
    }
  }

  onBackClick() {
    this.back.emit();
  }
}
