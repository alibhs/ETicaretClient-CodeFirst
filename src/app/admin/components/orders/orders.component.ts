import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
constructor(private spinner:NgxSpinnerService) {}
ngOnInit(): void {
  this.spinner.show();
  
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 5000);

}
}
