import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * CheckboxCardComponent is a reusable card that behaves like a custom checkbox or radio button.
 * It features a hover state, active click scale animation, and an SVG checkmark that draws itself.
 */
@Component({
  selector: 'app-checkbox-card',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-card.component.html',
  styleUrl: './checkbox-card.component.css'
})
export class CheckboxCardComponent {
  // The display text/label for the card
  @Input() label!: string;
  
  // Optional emoji to display on the card
  @Input() icon?: string;
  
  // Whether this card is currently selected
  @Input() selected: boolean = false;
  
  // Emitted when the user clicks the card
  @Output() toggle = new EventEmitter<void>();

  onCardClick() {
    this.toggle.emit();
  }
}
