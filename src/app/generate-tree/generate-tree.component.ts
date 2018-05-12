import {Component, OnInit} from '@angular/core';
import * as vis from 'vis';
import {Node} from 'vis';
import {Edge} from 'vis';
import {NgForm} from '@angular/forms';
import {ExtNode} from '../custom-types';

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
      this.generateTree(this.sequence.split(','));
    }

  }

  generateTree(sequence: string[]) {
    const n = sequence.length + 2;
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    for (let i = 1; i <= n; i++) {
      nodes.push({id: i, label: String(i)});
    }
    const tempSequence = Object.assign([], sequence);
    const tempNodes = Object.assign([], nodes);
    

    //
    // nodes.forEach(x => {
    //   x.adj.forEach(a => {
    //     if (resultEdges.filter(re => re.from === a.id && re.to === x.id || re.from === x.id && re.to === a.id)) {
    //       resultEdges.push({from: a.id, to: x.id});
    //     }
    //   });
    // });
    this.edges = new vis.DataSet<Edge>(edges);
    this.nodes = new vis.DataSet<Node>(nodes);
  }
}
