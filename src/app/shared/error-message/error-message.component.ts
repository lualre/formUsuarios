import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MensajesErrorService } from '../../mensajes-error.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() groupName?: string;

  constructor(private messagesService: MensajesErrorService) { }

  get control(): AbstractControl | null {
    if (this.groupName) {
      const group = this.formGroup.get(this.groupName) as FormGroup;
      return group ? group.get(this.controlName) : null;
    }
    return this.formGroup.get(this.controlName);
  }

  get errorMessages(): string[] {
    const errors = this.control?.errors;
    if (!errors) {
      return [];
    }

    return Object.keys(errors).map(key => {
      return this.messagesService.getErrorMessage(key, errors[key]);
    });
  }
}
