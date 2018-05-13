import {Component, OnInit} from '@angular/core';
import * as vis from 'vis';
import {Edge, Node} from 'vis';
import {MatDialog} from '@angular/material';
import {MessageDialog} from './dialog/message-dialog/message-dialog.component';
import {InputJsonDialogComponent} from './dialog/input-json-dialog/input-json-dialog.component';
import {filter} from 'rxjs/operators';
import {TreeUtils} from '../shared/tree.utils';

@Component({
  selector: 'app-generate-sequence',
  templateUrl: './generate-sequence.component.html',
  styleUrls: ['./generate-sequence.component.css']
})
export class GenerateSequenceComponent implements OnInit {
  nodes: vis.DataSet<Node>;
  edges: vis.DataSet<Edge>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);
  }

  getSequence() {
    const tree = {edges: this.edges, nodes: this.nodes};
    if (this.validate(tree)) {
      this.dialog.open(MessageDialog, {data: {title: 'Result sequence:', message: TreeUtils.getPruferSequence(tree)}});
    }
  }

  validate(tree: vis.Data): boolean {
    if (tree.nodes.length === 0 || tree.edges.length === 0) {
      this.dialog.open(MessageDialog, {data: {title: 'Tree is not valid', message: 'Empty nodes or edges'}});
      return false;
    }
    if (TreeUtils.validateCycle(tree)) {
      this.dialog.open(MessageDialog, {data: {title: 'Tree is not valid', message: 'Detected cycle'}});
      return false;
    }
    return true;
  }

  mock() {
    this.nodes = new vis.DataSet([
      {id: 1, label: '1', title: 'I have a popup!'},
      {id: 2, label: '2', title: 'I have a popup!'},
      {id: 3, label: '3', title: 'I have a popup!'},
      {id: 4, label: '4', title: 'I have a popup!'},
      {id: 5, label: '5', title: 'I have a popup!'},
      {id: 6, label: '6', title: 'I have a popup!'},
      {id: 7, label: '7', title: 'I have a popup!'}
    ]);
    this.edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 1, to: 4},
      {from: 3, to: 5},
      {from: 5, to: 6},
      {from: 5, to: 7}
    ]);
  }

  openInputJsonDialog() {
    this.dialog.open(InputJsonDialogComponent).afterClosed().pipe(
      filter(input => input)
    ).subscribe(input => {
      if (input) {
        const tree = JSON.parse(input);
        this.nodes = new vis.DataSet<Node>(tree.nodes);
        this.edges = new vis.DataSet<Edge>(tree.edges);
      }
    });
  }

  clear() {
    this.init();
  }
}
