import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IShipper } from 'src/app/shared/interface/IShipper';
import { ShippersService } from 'src/app/shared/services/shippers.service';
import { SnackService } from 'src/app/shared/services/snack.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  shippeesForm!: FormGroup
  constructor(
    private shipperServices: ShippersService,
    private fb: FormBuilder,
    private matDailog: MatDialogRef<InsertComponent>,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.shippeesForm = this.fb.group({
      companyName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(24),
        Validators.pattern(/^[0-9()+\s]*$/)
      ]]
    });
  }

  onInsert(){
    const shipperModel: IShipper = {
      ShipperID: 0,
      CompanyName: this.shippeesForm.get('companyName')?.value,
      Phone: this.shippeesForm.get('phone')?.value
    }
    this.shipperServices.post(shipperModel).subscribe({
      next: () =>{
        this.snackService.confirm('The shipper was succesfully inserted.');
        this.matDailog.close(true);
      },
      error: () => {
        this.snackService.error('Error trying to insert the Shipper.');
      }
    });
  }

  close(){
    this.matDailog.close(false);
  }

  get companyName() {
    return this.shippeesForm.get('companyName');
  }
  
  get phone() {
    return this.shippeesForm.get('phone');
  }
}
