import { Component, OnInit } from '@angular/core';
import { IShipper } from 'src/app/shared/interface/IShipper';
import { ShippersService } from 'src/app/shared/services/shippers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    
  }
}
