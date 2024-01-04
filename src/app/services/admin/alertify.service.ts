import { Injectable } from '@angular/core';
import { setPostSignalSetFn } from '@angular/core/primitives/signals';
declare var alertify:any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay',options.delay);
    alertify.set('notifier','position',options.position);
    const msj = alertify[options.messageType](message);
    if(options.dismissOther)
      msj.dismissOther();
  }
  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType:MessageType = MessageType.Message;
  position:Position = Position.BottomRight;
  delay:number = 3;
  dismissOther:boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position
{
  TopRight = "top-right",
  TopLeft = "top-left",
  TopCenter = "top-center",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
}

