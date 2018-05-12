///<reference path="../../node_modules/@angular/material/divider/typings/divider.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GraphViewComponent} from './graph-view/graph-view.component';
import {GenerateSequenceComponent} from './generate-sequence/generate-sequence.component';
import {GenerateTreeComponent} from './generate-tree/generate-tree.component';
import {
  MatButtonModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResultDialogComponent} from './generate-sequence/dialog/result-dialog/result-dialog.component';
import {InputJsonDialogComponent} from './generate-sequence/dialog/input-json-dialog/input-json-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphViewComponent,
    GenerateSequenceComponent,
    GenerateTreeComponent,
    ResultDialogComponent,
    InputJsonDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ], entryComponents: [
    ResultDialogComponent,
    InputJsonDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
