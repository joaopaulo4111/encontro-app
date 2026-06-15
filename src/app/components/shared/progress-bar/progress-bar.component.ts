import { Component, Input } from '@angular/core';

/**
 * ProgressBarComponent displays a progress bar at the top of each wizard step.
 * It shows the current section name, the percentage complete, and updates the bar width with a CSS transition.
 */
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  // Current step number (e.g., 1)
  @Input() currentStep: number = 1;
  
  // Total number of steps in the wizard (e.g., 6)
  @Input() totalSteps: number = 6;
  
  // The name/title of the current step
  @Input() stepLabel: string = '';

  /**
   * Computes the current progress as a percentage.
   */
  get percentage(): number {
    if (this.totalSteps <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((this.currentStep / this.totalSteps) * 100)));
  }
}
