import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> { //DialogComponent Generic islevi saglar.
    constructor(public dialogRef: MatDialogRef<DialogComponent>)
    {
        
    }

    close(){
        this.dialogRef.close();
    }
}
