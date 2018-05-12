import {Component, OnInit} from '@angular/core';
import {Data, Edge, Node} from 'vis';
import {ExtNode} from '../custom-types';
import * as vis from 'vis';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ResultDialogComponent} from './dialog/result-dialog/result-dialog.component';
import {InputJsonDialogComponent} from './dialog/input-json-dialog/input-json-dialog.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-generate-sequence',
  templateUrl: './generate-sequence.component.html',
  styleUrls: ['./generate-sequence.component.css']
})
export class GenerateSequenceComponent implements OnInit {
  nodes: vis.DataSet<Node>;
  edges: vis.DataSet<Edge>;
  displayResultDialog: MatDialogRef<ResultDialogComponent>;
  inputJsonDialog: MatDialogRef<InputJsonDialogComponent>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);
  }

  getResult() {
    if (this.nodes.length > 0 && this.edges.length > 0) {
      this.displayResultDialog =
        this.dialog.open(ResultDialogComponent, {data: this.getPruferSequence({edges: this.edges, nodes: this.nodes})});
    }
  }

  clear() {
    this.init();
  }

  getPruferSequence(tree: Data): number[] {
    const result = [];
    const nodes = this.getExtNodeList(this.deepCopyTree(tree));
    while (result.length !== (tree.nodes.length - 2)) {
      const current = this.getMinLeaf(nodes);
      result.push(current.adj[0].id);
      this.removeNode(current, nodes);
    }
    return result;
  }

  removeNode(node: ExtNode, nodes: ExtNode[]) {
    nodes.forEach(adj => {
      const index = adj.adj.indexOf(node);
      if (index > -1) {
        adj.adj.splice(index, 1);
      }
    });
    nodes.splice(nodes.indexOf(node), 1);
  }

  deepCopyTree(tree: Data): Data {
    return {
      nodes: (tree.nodes as vis.DataSet<Node>).map(item => Object.assign(<Node>{}, item)),
      edges: (tree.edges as vis.DataSet<Edge>).map(item => Object.assign(<Edge>{}, item))
    };
  }

  getExtNodeList(tree: Data): ExtNode[] {
    const result: ExtNode[] = (tree.nodes as vis.DataSet<Node>).map(node => {
      return {id: String(node.id), adj: []};
    });
    result.forEach(node => {
      const adjacentNodes = this.getAdjacentNodes(node.id, tree.edges);
      node.adj = result
        .filter(tmp => adjacentNodes
          .map(String)
          .includes(tmp.id));
    });
    return result;
  }

  getAdjacentNodes(nodeId: any, edges: any): any[] {
    const adjacentNodeSet = new Set();
    (edges as vis.DataSet<Edge>).forEach(item => {
      if (item.from !== item.to) {
        if (item.from == nodeId) {
          adjacentNodeSet.add(item.to);
        }
        if (item.to == nodeId) {
          adjacentNodeSet.add(item.from);
        }
      }
    });
    return Array.from(adjacentNodeSet);
  }

  getMinLeaf(nodes: ExtNode[]): ExtNode {
    return nodes.reduce((prev, curr) =>
      this.isLeaf(prev) && prev.id < curr.id ? prev : curr);
  }

  isLeaf(node: ExtNode): boolean {
    return node.adj.length === 1;
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
}
