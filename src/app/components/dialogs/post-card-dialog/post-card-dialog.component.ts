import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-post-card-dialog',
  templateUrl: './post-card-dialog.component.html',
  styleUrls: ['./post-card-dialog.component.css']
})
export class PostCardDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<PostCardDialogComponent>, @Inject (MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
