import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor( spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallAtom);
    this.httpClientService.get({
      controller: "products"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller:"products",
    // },{
    //   id:"98821864-3f12-4c90-bdee-e48545693092",
    //   name:"renkli kağıt",
    //   stock:50,
    //   price:5.5
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // },"98821864-3f12-4c90-bdee-e48545693092")
    // .subscribe();
  }

}