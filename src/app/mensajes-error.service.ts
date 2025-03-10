import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesErrorService {

  private messages: any = {
    required: 'Este campo es obligatorio.',
    minlength: 'La longitud mínima es de {requiredLength} caracteres.',
    maxlength: 'La longitud máxima es de {requiredLength} caracteres.',
    letterOnly: 'Este campo solo permite letras.',
    invalidNumber: 'Este campo solo permite numeros.',
    invalidCurp: 'Curp no valida.',
    invalidRfc: 'Rfc no valido.'
  };

  getErrorMessage(errorKey: string, params?: any): string {
    let message = this.messages[errorKey] || 'Campo inválido';
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          message = message.replace(`{${key}}`, params[key]);
        }
      }
    }
    return message;
  }

}
