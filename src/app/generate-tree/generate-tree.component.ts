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
      this.generateTree(this.sequence.split(',')
        .map(s => Number(s)));
    }

  }

  generateTree(sequence: number[]) {
    const n = sequence.length + 2;
    const nodes: Node[] = this.getEmptyNodeList(n);
    const edges: Edge[] = [];
    const degree = nodes.map(() => 1);
    sequence.forEach(s => degree[s - 1] += 1);
    let from, to;
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (degree[j] === 1) {
          from = +sequence[i];
          to = +nodes[j].id;
          degree[from - 1] -= 1;
          degree[to - 1] -= 1;
          edges.push({from: from, to: to});
          break;
        }
      }
    }
    from = to = null;
    for (let i = 0; i < nodes.length; i++) {
      if (degree[i] === 1) {
        if (!from) {
          from = nodes[i].id;
        } else {
          to = nodes[i].id;
          break;
        }
      }
    }
    edges.push({from: from, to: to});
    this.edges = new vis.DataSet<Edge>(edges);
    this.nodes = new vis.DataSet<Node>(nodes);
  }

  getEmptyNodeList(size: number): Node[] {
    const nodes = [];
    for (let i = 1; i <= size; i++) {
      nodes.push({id: i, label: String(i)});
    }
    return nodes;
  }
}
