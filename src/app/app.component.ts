import { Component, signal } from '@angular/core';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StepAvailabilityComponent } from './components/step-availability/step-availability.component';
import { StepTimeComponent } from './components/step-time/step-time.component';
import { StepActivitiesComponent } from './components/step-activities/step-activities.component';
import { StepFoodComponent } from './components/step-food/step-food.component';
import { StepNotesComponent } from './components/step-notes/step-notes.component';
import { ResultComponent } from './components/result/result.component';

/**
 * AppComponent is the main shell component.
 * It manages the session navigation state using a `currentStep` Signal.
 * Render steps conditionally based on the active index.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WelcomeComponent,
    StepAvailabilityComponent,
    StepTimeComponent,
    StepActivitiesComponent,
    StepFoodComponent,
    StepNotesComponent,
    ResultComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Signal managing which screen index is currently displayed
  readonly currentStep = signal<number>(0);

  /**
   * Advances the wizard to the next step.
   */
  nextStep() {
    this.currentStep.update(step => step + 1);
  }

  /**
   * Moves back to the previous wizard step.
   */
  prevStep() {
    this.currentStep.update(step => Math.max(0, step - 1));
  }

  /**
   * Navigates directly to a specific step (e.g., when resetting).
   */
  goToStep(step: number) {
    this.currentStep.set(step);
  }
}
export { AppComponent as App }; // Keep alias for main.ts compatibility
