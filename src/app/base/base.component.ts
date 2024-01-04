import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
constructor(private spinner:NgxSpinnerService){}
showSpinner(spinnerNameType:SpinnerType){
this.spinner.show(spinnerNameType);
}

hideSpinner(spinnerNameType:SpinnerType){
  this.spinner.hide(spinnerNameType);

  setTimeout(()=> this.hideSpinner(spinnerNameType),1000);

}
}


export enum SpinnerType{
  BallAtom = "s1",
  BallScaleMultiple = "s2",
  BallSpinClockwiseFadeRotating = "s3"
}