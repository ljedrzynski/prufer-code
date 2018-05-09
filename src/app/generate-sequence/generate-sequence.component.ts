import {Component, OnInit} from '@angular/core';
import {Data, Edge, Node} from 'vis';
import {ExtNode} from '../custom-types';
import * as vis from 'vis';

@Component({
  selector: 'app-generate-sequence',
  templateUrl: './generate-sequence.component.html',
  styleUrls: ['./generate-sequence.component.css']
})
export class GenerateSequenceComponent implements OnInit {
  nodes: vis.DataSet<Node>;
  edges: vis.DataSet<Edge>;
  result: number[];

  constructor() {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);
  }

  print() {
    if (this.nodes.length > 0 && this.edges.length > 0) {
      this.result = this.getPruferSequence({edges: this.edges, nodes: this.nodes});
    }
  }

  clear() {
    this.init();
    this.result = null;
  }

  getPruferSequence(tree: Data): number[] {
    if (!(tree && tree.nodes && tree.edges)) {
      return [];
    }
    const result = [];
    const n = tree.nodes.length;
    const nodes = this.getExtNodeList(this.deepCopyTree(tree));
    while (result.length !== (n - 2)) {
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
    const tempTree: Data = {};
    tempTree.nodes = new vis.DataSet<Node>();
    (tree.nodes as vis.DataSet<Node>).forEach(item => {
      (tempTree.nodes  as vis.DataSet<Node>).add(Object.assign(<Node>{}, item));
    });
    tempTree.edges = new vis.DataSet<Edge>();
    (tree.edges as vis.DataSet<Edge>).forEach(item => {
      (tempTree.edges as vis.DataSet<Edge>).add(Object.assign(<Edge>{}, item));
    });
    return tempTree;
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
    let min: ExtNode = null;
    nodes.forEach(node => {
      if (this.isLeaf(node) && (!min || min.id > node.id)) {
        min = node;
      }
    });
    return min;
  }

  isLeaf(node: ExtNode): boolean {
    return node.adj.length === 1;
  }

  mock() {
    const edges = [
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 1, to: 4},
      {from: 3, to: 5},
      {from: 5, to: 6},
      {from: 5, to: 7}
    ];
    const nodes = [
      {id: 1, label: '1', title: 'I have a popup!'},
      {id: 2, label: '2', title: 'I have a popup!'},
      {id: 3, label: '3', title: 'I have a popup!'},
      {id: 4, label: '4', title: 'I have a popup!'},
      {id: 5, label: '5', title: 'I have a popup!'},
      {id: 6, label: '6', title: 'I have a popup!'},
      {id: 7, label: '7', title: 'I have a popup!'}
    ];
    this.nodes = new vis.DataSet(nodes);
    this.edges = new vis.DataSet(edges);
  }
}
