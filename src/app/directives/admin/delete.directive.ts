import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import $ from "jquery";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService, 
    public dialog: MatDialog,
    private alertify:AlertifyService,
    private dialogService:DialogService,
    ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor:pointer;");
    img.width = 20;
    img.height = 20;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller:this.controller
        },this.id).subscribe(data =>{$(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.callback.emit();
          this.alertify.message("Ürün başarıyla silinmiştir",{
            dismissOther:true,
            messageType:MessageType.Success,
            position:Position.TopRight
          })
        })
      },(errorResponse:HttpErrorResponse)=>{
        this.alertify.message("Ürün silinmeye çalışırken beklenmedik bir hatayla karşılaşılmıştır ",{
          dismissOther:true,
          messageType:MessageType.Error,
          position:Position.TopRight
        });
      });
    }
    });
      

  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }

}
