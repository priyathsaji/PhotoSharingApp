import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MyspaceComponent} from './components/myspace/myspace.component';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { BasicComponent } from './components/basic/basic.component';
import { HomeComponent } from './components/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { UploadDialogComponent } from './components/dialogs/upload-dialog/upload-dialog.component';
import {FormsModule} from '@angular/forms';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FriendsComponent } from './components/friends/friends.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewProfileComponent } from './components/view-profile/view-profile.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { PostCardDialogComponent } from './components/dialogs/post-card-dialog/post-card-dialog.component';
import { ShareBottomSheetComponent } from './components/bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
const appRoutes :Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'viewProfile/:id',
    component:ViewProfileComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'myspace',
    component:MyspaceComponent
  },
  {
    path:'notifications',
    component:NotificationsComponent
  },
  {
    path:'**',
    component:BasicComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BasicComponent,
    HomeComponent,
    MyspaceComponent,
    UploadDialogComponent,
    NotificationsComponent,
    FriendsComponent,
    ViewProfileComponent,
    PostCardDialogComponent,
    ShareBottomSheetComponent

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase,'fynsta'),
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes
      //{enableTracing:true}
    ),
    MatDialogModule,
    FormsModule,
    AngularFireStorageModule,
    MatTooltipModule,
    MatRadioModule,
    AngularFirestoreModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    

  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    UploadDialogComponent,
    PostCardDialogComponent,
    ShareBottomSheetComponent,
  ]
})
export class AppModule { }
