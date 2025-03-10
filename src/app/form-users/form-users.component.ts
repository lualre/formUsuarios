import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { curp, lettersOnly, numberOnly, rfc } from '../validaciones.validator';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { ServiceService } from '../service.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-form-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatGridListModule, ErrorMessageComponent, MatProgressBarModule],
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css',
  providers: [ServiceService]
})
export class FormUsersComponent {

  public formUser!: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private userService: ServiceService) {
    this.formUser = this.fb.group({
      infoUsuario: this.fb.group({
        nombre: [null, [Validators.required, lettersOnly()]],
        primerApellido: [null, [Validators.required, lettersOnly()]],
        segundoApellido: [null, [Validators.required, lettersOnly()]],
        curp: [null, [Validators.required, curp()]],
        rfc: [null, [Validators.required, rfc()]],
      }),
      domicilio: this.fb.group({
        codigoPostal: [null, [Validators.required, numberOnly()]],
        calle: [null, [Validators.required]],
        numeroExterior: [null, [Validators.required, numberOnly()]],
        numeroInterior: [null, []],
        estado: [null, [Validators.required, lettersOnly()]],
        municipio: [null, [Validators.required, lettersOnly()]],
        colonia: [null, [Validators.required, lettersOnly()]],
      })
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.formUser.valid) {
      this.formUser.disable();
      this.saveUser();
    } else {
      this.isLoading = false;
      this.openDialog('error');
    }
  }

  private validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control: any = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  openDialog(estatus: string): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '15%',
      data: { estatus: estatus }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.validateAllFields(this.formUser);
    });
  }

  inputAlphanumeric(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    input.value = input.value.toUpperCase();
  }

  saveUser() {
    this.userService.saveUsers(this.formUser.value).subscribe(response => {
      console.log(response);
      this.formUser.enable();
      this.isLoading = false;
      this.openDialog('success');
    });
  }

}
