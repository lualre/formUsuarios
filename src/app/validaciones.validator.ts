import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lettersOnly(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = /^[a-zA-Z]*$/.test(control.value);
        return isValid ? null : { 'letterOnly': { value: control.value } };
    };
}

export function curp(): ValidatorFn {
    let nombre = "^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}"; // Del apellido y primer nombre
    let fechaNacimiento = "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])"; // fecha de nacimiento (AAMMDD)
    let sexo = "[HMX]{1}"; // sexo
    let entidad = "(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)"; // entidad federativa de nacimiento
    let apellidos = "[B-DF-HJ-NP-TV-Z]{3}"; // De los apellidos y primer nombre, las primeras consonantes internas de cada uno
    let renapo = "[0-9A-Z]{1}[0-9]{1}$"; //Asignado por la RENAPO
    const curpPattern = new RegExp(`${nombre}${fechaNacimiento}${sexo}${entidad}${apellidos}${renapo}`);
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = curpPattern.test(control.value);
        return isValid ? null : { 'invalidCurp': { value: control.value } };
    };
}

export function rfc(): ValidatorFn {
    let nombre = "^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}"; // Del apellido y primer nombre
    let fechaNacimiento = "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])"; // fecha de nacimiento (AAMMDD)
    let homoclave = "[A-Z0-9]{3}$"; // homoclave
    const curpPattern = new RegExp(`${nombre}${fechaNacimiento}${homoclave}`);
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = curpPattern.test(control.value);
        return isValid ? null : { 'invalidRfc': { value: control.value } };
    };
}

export function numberOnly(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const isValid = /^[0-9]{5}$/.test(value);
        return isValid ? null : { 'invalidNumber': { value } };
    };
}

