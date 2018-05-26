import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {AngularFireUploadTask,AngularFireStorage} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  description:string;
  constructor(private storage:AngularFireStorage,public dialogRef:MatDialogRef<UploadDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.data.postDescription="";
    this.data.postVisibility="private";
  }
  
  onNoClick(): void {
    this.dialogRef.close();
    this.deleteUploaded();
  }


  task:AngularFireUploadTask;
  percentage:Observable<number>;
  snapshot:Observable<any>;
  isHovering:boolean;
  uploaded:boolean = false;

  name:string;
  isUploaded():boolean{
    return this.uploaded;
  }
  startUpload(event:FileList){
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    const path = `imageStore/${new Date().getTime()}_${file.name}`;
    this.data.fileName=path;
    const customMetadata = {auth:'priyath'};
    this.task = this.storage.upload(path,file,{customMetadata});
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    this.task.downloadURL().subscribe(result=>{
      this.uploaded = true;
      console.log("downloadurll:",result);
      this.data.postDownloadUrl = result;
    })

    this.task.percentageChanges().subscribe((percentage)=>{
      console.log(percentage);
      if(percentage == 100){
        
        
      }
    }
  );
    this.task.snapshotChanges()
  }

  deleteUploaded(){
    if(this.data.fileName!=null) 
      this.storage.ref(this.data.fileName).delete();
  }

}
