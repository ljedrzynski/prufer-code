///<reference path="../../node_modules/@angular/material/divider/typings/divider.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GraphViewComponent} from './graph-view/graph-view.component';
import {GenerateSequenceComponent} from './generate-sequence/generate-sequence.component';
import {GenerateTreeComponent} from './generate-tree/generate-tree.component';
import {MatButtonModule, MatDividerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
