import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {of,Observable,catchError } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomToastrService) { }
   
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized:
        this.toastrService.message("Bu işlemi yapma yetkiniz bulumamaktadır!","Yetkisiz işlem",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.BottomFullWidth
        })
          break;

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişilmiyor!","Sunucu Hatası",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz İstek Yapıldı!","Geçersiz İstek",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomFullWidth
          })
          break;
  
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı!","Sayfa Bulunamadı",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomFullWidth
          })
          break;
        
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi!","HATA",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomFullWidth
          })
          break;
      }
      return of(error);
    }));
  }
}
