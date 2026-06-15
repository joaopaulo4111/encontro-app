import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { CheckboxCardComponent } from '../shared/checkbox-card/checkbox-card.component';

/**
 * StepTimeComponent represents Step 2.
 * It asks the user for their single most favorite time slot (e.g., Manhã, Tarde, Noite).
 * It enforces single-select behavior by directly setting the Signal value.
 */
@Component({
  selector: 'app-step-time',
  standalone: true,
  imports: [ProgressBarComponent, CheckboxCardComponent],
  templateUrl: './step-time.component.html',
  styleUrl: './step-time.component.css'
})
export class StepTimeComponent {
  // Inject the reactive form state service
  readonly formService = inject(FormService);

  // Navigation events
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  // Available options
  readonly timeOptions = [
    { label: 'Manhã', icon: '🌅' },
    { label: 'Tarde', icon: '☀️' },
    { label: 'Noite', icon: '🌙' }
  ];

  /**
   * Sets the preferred time slot.
   */
  selectTime(time: string) {
    this.formService.preferredTime.set(time);
  }

  onNextClick() {
    if (this.formService.preferredTime()) {
      this.next.emit();
    }
  }

  onBackClick() {
    this.back.emit();
  }
}
