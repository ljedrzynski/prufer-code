import {Component, OnInit} from '@angular/core';
import * as vis from 'vis';
import {Node} from 'vis';
import {Edge} from 'vis';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-generate-tree',
  templateUrl: './generate-tree.component.html',
  styleUrls: ['./generate-tree.component.css']
})
export class GenerateTreeComponent implements OnInit {
  nodes: vis.DataSet<Node>;
  edges: vis.DataSet<Edge>;
  sequence: string;

  constructor() {
  }

  ngOnInit() {
  }

  decodeSequence(form: NgForm) {
    if (form.valid) {
      console.log(this.sequence);
    }
  }
}
