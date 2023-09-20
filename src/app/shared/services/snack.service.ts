import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar){}

  confirm(mensaje:string) {
    this.snackBar.open(mensaje,'', {
      duration: 2400, 
      horizontalPosition: 'center',
      verticalPosition: 'top',           
      panelClass: ['custom-toast-cnfirm'],
    });
  }
  error(mensaje:string) {
    this.snackBar.open(mensaje, '', {
      duration: 2400, 
      horizontalPosition: 'center',
      verticalPosition: 'top',           
      panelClass: ['custom-toast-error'],
    });
  }
}
