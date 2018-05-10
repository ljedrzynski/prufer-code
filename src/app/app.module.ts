///<reference path="../../node_modules/@angular/material/divider/typings/divider.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GraphViewComponent} from './graph-view/graph-view.component';
import {GenerateSequenceComponent} from './generate-sequence/generate-sequence.component';
import {GenerateTreeComponent} from './generate-tree/generate-tree.component';
import {
  MatButtonModule, MatDividerModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    GraphViewComponent,
    GenerateSequenceComponent,
    GenerateTreeComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
