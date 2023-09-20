import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IShipper } from 'src/app/shared/interface/IShipper';
import { ShippersService } from 'src/app/shared/services/shippers.service';
import { InsertComponent } from '../insert/insert.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateComponent } from '../update/update.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { SnackService } from 'src/app/shared/services/snack.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  shippersDataSource = new MatTableDataSource<IShipper>();
  columns: string[] = [
   'shipperID', 'companyName', 'phone',
   'update', 'delete',
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private shipperServices: ShippersService,
    private router: Router,
    private dialog: MatDialog,
    private snackService: SnackService
    ) { }

  ngOnInit(): void {
    this.getShipper();
  }

  ngAfterViewInit() {
    this.shippersDataSource.paginator = this.paginator;
  }

  getShipper(){
    this.shipperServices.get().subscribe({
      next: (response: IShipper[]) =>{
        this.shippersDataSource.data = response
      },
      error: () => {
        this.snackService.error('Error getting the shippers.');
      }
    });
  }

  onInsert(){
    const dialog = this.dialog.open(InsertComponent, {width: '500px'});
    dialog.afterClosed().subscribe(() => {
    this.getShipper();
    })
  }

  onUpdate(shipper: IShipper){
    const dialog = this.dialog.open(UpdateComponent, {
      width: '500px',
      data: {shipper}
    }); 
    dialog.afterClosed().subscribe(() => {
      this.getShipper();
    })
  }

  onDelete(id:number){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'Delete shipper',
        message: `Confirm the elimination of shipper with id ${id}.`
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.shipperServices.delete(id).subscribe({
          next: () =>{
            this.snackService.confirm('The shipper was succesfully deleted.'); 
            this.getShipper();
          },
          error: () => {
            this.snackService.error('Error trying to delete.');
          }
        });
      }
    })
  }
}
