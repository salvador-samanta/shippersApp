import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IShipper } from 'src/app/shared/interface/IShipper';
import { ShippersService } from 'src/app/shared/services/shippers.service';
import { InsertComponent } from '../insert/insert.component';
import { SnackService } from 'src/app/shared/services/snack.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  shippeesForm!: FormGroup

  constructor(
    private shipperServices: ShippersService,
    private fb: FormBuilder,
    private matDailog: MatDialogRef<InsertComponent>,
    private snackService: SnackService,
    @Inject(MAT_DIALOG_DATA) private data: { shipper: IShipper }
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.shippeesForm = this.fb.group({
      companyName: [this.data.shipper.CompanyName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      phone: [this.data.shipper.Phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(24),
        Validators.pattern(/^[0-9()+\s]*$/)
      ]]
    });
  }

  onUpdate(){
    const shipperModel: IShipper = {
      ShipperID: this.data.shipper.ShipperID,
      CompanyName: this.shippeesForm.get('companyName')?.value,
      Phone: this.shippeesForm.get('phone')?.value
    }
    this.shipperServices.update(shipperModel.ShipperID, shipperModel).subscribe({
      next: () =>{
        this.snackService.confirm('The shipper was succefully updated.');
        this.matDailog.close(true);
      },
      error: () => {
        this.snackService.error('Error updating the shipper.');
      }
    });
  }

  close(){
    this.matDailog.close(false);
  }
}
