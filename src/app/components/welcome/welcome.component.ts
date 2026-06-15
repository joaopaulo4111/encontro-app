import { Component, Output, EventEmitter, OnInit, signal } from '@angular/core';

/**
 * WelcomeComponent displays the initial landing screen of the application.
 * It checks the URL parameters for a name (e.g. ?nome=Ana) and displays a personalized greeting.
 * It emits a start event to advance the parent form to step 1.
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  // Emitted when the user clicks the "Começar" button
  @Output() start = new EventEmitter<void>();

  // Reactive signal to store the guest name
  readonly guestName = signal<string | null>(null);

  ngOnInit() {
    // Read the "nome" query param directly from the browser location
    try {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('nome') || params.get('name');
      if (name) {
        this.guestName.set(name.trim());
      }
    } catch (e) {
      console.error('Failed to parse URL query params', e);
    }
  }

  onStartClick() {
    this.start.emit();
  }
}
