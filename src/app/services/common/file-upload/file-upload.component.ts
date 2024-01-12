import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(private httpclientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpclientService.post({
      controller: this.options.controller,
      action: this.options.actions,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {

      const successMessage: string = "Dosyalar başarıyla yüklenmiştir.";

      if (this.options.isAdminPage) {
        this.alertifyService.message(successMessage, {
          dismissOther: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      } else {
        this.customToastrService.message(successMessage, "Başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
    }, (errorResponse: HttpErrorResponse) => {
      if (this.options.isAdminPage) {
        this.alertifyService.message("Dosyalar yüklenirken beklenmeyen bir hata ile karşılmıştır.", {
          dismissOther: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      } else {
        this.customToastrService.message("Dosyalar yüklenirken beklenmeyen bir hata ile karşılmıştır.", "Başarısız", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  actions?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
