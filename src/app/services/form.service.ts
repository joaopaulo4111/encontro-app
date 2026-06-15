import { Injectable, signal, computed } from '@angular/core';

export interface FormData {
  days: string[];
  timeSlots: string[];
  preferredTime: string;
  activities: string[];
  foods: string[];
  notes: string;
}

/**
 * FormService manages the reactive state of the date planning app.
 * It uses Angular Signals to store step choices and computed signals to format the final responses.
 */
@Injectable({
  providedIn: 'root'
})
export class FormService {
  // --- Raw State Signals ---
  
  // Selected days of the week (e.g., ['Sexta', 'Sábado'])
  readonly days = signal<string[]>([]);
  
  // Selected time slots of the day (e.g., ['Tarde', 'Noite'])
  readonly timeSlots = signal<string[]>([]);
  
  // Selected preferred single time slot (e.g., 'Noite')
  readonly preferredTime = signal<string>('');
  
  // Selected activities from the checklist (may contain the literal 'Outros')
  readonly selectedActivities = signal<string[]>([]);
  
  // The custom input string when 'Outros' is checked in activities
  readonly customActivity = signal<string>('');

  // Selected foods from the checklist (may contain the literal 'Outros')
  readonly selectedFoods = signal<signalKeyType[] | string[]>([]);
  
  // The custom input string when 'Outros' is checked in foods
  readonly customFood = signal<string>('');

  // Optional special notes or preferences from the textarea
  readonly notes = signal<string>('');

  // --- Computed Signals ---

  // Filters and maps the selected activities. If 'Outros' is checked, it replaces 'Outros'
  // with the custom text (only if custom text is not empty).
  readonly activities = computed<string[]>(() => {
    const list = [...this.selectedActivities()];
    const index = list.indexOf('Outros');
    if (index !== -1) {
      list.splice(index, 1); // Remove the placeholder 'Outros'
      const custom = this.customActivity().trim();
      if (custom) {
        list.push(custom); // Only add the custom text if it's filled
      }
    }
    return list;
  });

  // Filters and maps the selected foods. Replaces 'Outros' with the custom text if filled.
  readonly foods = computed<string[]>(() => {
    const list = [...(this.selectedFoods() as string[])];
    const index = list.indexOf('Outros');
    if (index !== -1) {
      list.splice(index, 1); // Remove the placeholder 'Outros'
      const custom = this.customFood().trim();
      if (custom) {
        list.push(custom); // Only add the custom text if it's filled
      }
    }
    return list;
  });

  // Helper to compile the entire form's state into a standard format
  readonly allResponses = computed<FormData>(() => ({
    days: this.days(),
    timeSlots: this.timeSlots(),
    preferredTime: this.preferredTime(),
    activities: this.activities(),
    foods: this.foods(),
    notes: this.notes()
  }));

  /**
   * Resets all fields back to their default empty values.
   */
  resetForm() {
    this.days.set([]);
    this.timeSlots.set([]);
    this.preferredTime.set('');
    this.selectedActivities.set([]);
    this.customActivity.set('');
    this.selectedFoods.set([]);
    this.customFood.set('');
    this.notes.set('');
  }
}

// Simple type helper to resolve compilation issues
type signalKeyType = string;
