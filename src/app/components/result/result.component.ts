import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormService } from '../../services/form.service';

/**
 * ResultComponent represents Step 6 (Final Screen).
 * It shows a summary card of all user choices.
 * Supports copying formatting results, sharing via Web Share API, and restarting the form.
 */
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  // Inject the reactive form state service
  readonly formService = inject(FormService);

  // Event emitted when restarting the form flow
  @Output() restart = new EventEmitter<void>();

  // Toast notification controls
  readonly showToast = signal<boolean>(false);
  readonly toastMessage = signal<string>('');

  /**
   * Compiles the form responses into the requested plain text format.
   */
  get formattedDataText(): string {
    const data = this.formService.allResponses();
    
    const formatList = (list: string[]) => list.length > 0 ? list.join(', ') : 'Não informado';
    const formatNotes = (note: string) => note.trim() ? note.trim() : 'Não informado';
    
    const today = new Date().toLocaleDateString('pt-BR');

    return `Um pouco sobre mim: \n\n` +
           `📅 Dias disponíveis: ${formatList(data.days)}\n` +
           `⏰ Horários livres: ${formatList(data.timeSlots)}\n` +
           `✨ Horário favorito: ${data.preferredTime || 'Não informado'}\n` +
           `🎉 Atividades: ${formatList(data.activities)}\n` +
           `😋 Comidas: ${formatList(data.foods)}\n` +
           `💬 Observações: ${formatNotes(data.notes)}\n\n` +
           `Eu Catarina declaro que gosto mais do flamengo do que do são paulo.  ${today}`;
  }

  /**
   * Copies the formatted text to the clipboard and triggers a success toast.
   */
  copyToClipboard() {
    try {
      const text = this.formattedDataText;
      navigator.clipboard.writeText(text).then(() => {
        this.triggerToast('Respostas copiadas para a área de transferência! 📋');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.triggerToast('Erro ao copiar respostas.');
      });
    } catch (e) {
      console.error(e);
      this.triggerToast('Erro ao copiar respostas.');
    }
  }

  /**
   * Shares the results via the Web Share API (native mobile menu).
   * Falls back to copying to clipboard if sharing is unsupported.
   */
  shareResults() {
    const text = this.formattedDataText;
    if (navigator.share) {
      navigator.share({
        title: 'Planejamento de Encontro ❤️',
        text: text
      }).then(() => {
        console.log('Shared successfully');
      }).catch(err => {
        // Only fallback if the error is not due to user cancellation
        if (err && err.name !== 'AbortError') {
          this.copyToClipboard();
        }
      });
    } else {
      // Fallback if Web Share API is not available
      this.copyToClipboard();
    }
  }

  /**
   * Triggers the toast notification and schedules its dismissal.
   */
  triggerToast(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 2500);
  }

  /**
   * Requests confirmation from the user before resetting and restarting.
   */
  onRestartClick() {
    const confirmed = window.confirm('Tem certeza de que deseja recomeçar? Isso limpará todas as respostas.');
    if (confirmed) {
      this.formService.resetForm();
      this.restart.emit();
    }
  }
}
