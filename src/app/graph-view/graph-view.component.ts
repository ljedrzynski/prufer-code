import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as vis from 'vis';
import {Data, Edge, Node} from 'vis';


@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {
  @Input() nodes: any[];
  @Input() edges: any[];
  @Input() readonly: boolean;
  @ViewChild('vis') element: ElementRef;
  network: vis.Network;
  data: Data;
  result: number[];

  ngOnInit(): void {
    this.initNetwork();
  }

  initNetwork() {
    if (!this.edges) {
      this.edges = [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 1, to: 4},
        {from: 3, to: 5},
        {from: 5, to: 6},
        {from: 5, to: 7}
      ];
    }

    const edges = new vis.DataSet(this.edges);

    if (!this.nodes) {
      this.nodes = [
        {id: 1, label: 'Node 1', title: 'I have a popup!'},
        {id: 2, label: 'Node 2', title: 'I have a popup!'},
        {id: 3, label: 'Node 3', title: 'I have a popup!'},
        {id: 4, label: 'Node 4', title: 'I have a popup!'},
        {id: 5, label: 'Node 5', title: 'I have a popup!'},
        {id: 6, label: 'Node 6', title: 'I have a popup!'},
        {id: 7, label: 'Node 7', title: 'I have a popup!'}
      ];
      // create an array with edges

    }
    const nodes = new vis.DataSet(this.nodes);


    this.data = {
      nodes: nodes,
      edges: edges
    };

    const options = {
      interaction: {hover: true},
      manipulation: {
        enabled: !this.readonly,
        addNode: function (nodeData, callback) {
          nodeData.id = nodes.length + 1;
          nodeData.label = String(nodes.length + 1);
          callback(nodeData);
          console.log(JSON.stringify(nodes));
          console.log(JSON.stringify(edges));
        },
        addEdge: function (edgeData, callback) {
          if (edgeData.from !== edgeData.to) {
            callback(edgeData);
          }
        }
      }
    };
    this.network = new vis.Network(this.element.nativeElement, this.data, options);
  }

  clear() {
    this.initNetwork();
  }

  print() {
    this.result = this.getPruferSequence(this.data);
  }

  getPruferSequence(tree: Data): number[] {
    if (!(tree && tree.nodes && tree.edges)) {
      return [];
    }
    const result = [];
    const n = tree.nodes.length;
    const tempTree = this.deepCopyTree(tree);
    while (true) {
      const currMin = this.getMinLeafId(tempTree);
      if (currMin) {
        const adjacentNodes = this.getAdjacentNodes(currMin, tempTree.edges);
        result.push(adjacentNodes[0]);
        (tempTree.nodes as vis.DataSet<Node>).remove(currMin.id);
        (tempTree.edges as vis.DataSet<Edge>).remove(this.getAdjacentEdges(currMin.id, tempTree.edges).map(p => p.id));
        if (result.length === (n - 2)) {
          break;
        }
      } else {
        break;
      }
    }

    return result;
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

  getAdjacentEdges(nodeId: any, edges: any): Edge[] {
    const adjacentEdges = new Set();
    (edges as vis.DataSet<Edge>).forEach(edge => {
      if (edge.from !== edge.to) {
        if (edge.from === nodeId || edge.to === nodeId) {
          adjacentEdges.add(edge);
        }
      }
    });
    return Array.from(adjacentEdges);
  }

  getAdjacentNodes(nodeId: any, edges: any): any[] {
    const adjacentNodeSet = new Set();
    (edges as vis.DataSet<Edge>).forEach(item => {
      if (item.from !== item.to) {
        if (item.from === nodeId.id) {
          adjacentNodeSet.add(item.to);
        }
        if (item.to === nodeId.id) {
          adjacentNodeSet.add(item.from);
        }
      }
    });
    return Array.from(adjacentNodeSet);
  }


  getMinLeafId(tree: Data): Node {
    let min: any;
    (tree.nodes as vis.DataSet<Node>).forEach(item => {
      if (this.isLeaf(item, (tree.edges as vis.DataSet<Edge>))) {
        if (!min || min > item.id) {
          min = item;
        }
      }
    });
    return min;
  }

  isLeaf(nodeId: any, edges: any): boolean {
    return this.getAdjacentNodes(nodeId, edges).length === 1;
  }
}
