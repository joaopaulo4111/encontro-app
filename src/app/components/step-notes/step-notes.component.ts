import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';

/**
 * StepNotesComponent represents Step 5 (the final input step).
 * It collects optional special notes or dietary restrictions using an auto-resizing textarea.
 * Includes a maximum length validation of 500 characters.
 */
@Component({
  selector: 'app-step-notes',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './step-notes.component.html',
  styleUrl: './step-notes.component.css'
})
export class StepNotesComponent {
  // Inject the reactive form state service
  readonly formService = inject(FormService);

  // Navigation events
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  /**
   * Automatically adjusts the height of the textarea as the user types.
   */
  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(140, textarea.scrollHeight)}px`;
  }

  onNextClick() {
    this.next.emit();
  }

  onBackClick() {
    this.back.emit();
  }
}
