import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import * as vis from 'vis';
import {Data, Edge, Node} from 'vis';


@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit, OnChanges {
  @Input() nodes: vis.DataSet<Node>;
  @Input() edges: vis.DataSet<Edge>;
  @Input() readonly: boolean;
  @ViewChild('vis') element: ElementRef;
  network: vis.Network;
  data: Data;
  @Output() onNodeChange: EventEmitter<vis.DataSet<Node>> = new EventEmitter();
  @Output() onEdgesChange: EventEmitter<vis.DataSet<Edge>> = new EventEmitter();

  ngOnInit(): void {
    this.initNetwork();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initNetwork();
  }

  initNetwork() {
    if (!this.nodes) {
      this.nodes = new vis.DataSet([]);
    }
    if (!this.edges) {
      this.edges = new vis.DataSet([]);
    }
    const nodes = this.nodes;
    const edges = this.edges;

    this.data = {
      nodes: nodes,
      edges: edges
    };

    let emitter = this.onNodeChange;
    nodes.on('*', () => emitter.emit(nodes));
    emitter = this.onEdgesChange;
    edges.on('*', () => emitter.emit(edges));

    const options = {
      interaction: {hover: true},
      manipulation: {
        enabled: !this.readonly,
        addNode: function (nodeData, callback) {
          nodeData.id = nodes.length + 1;
          nodeData.label = String(nodes.length + 1);
          callback(nodeData);
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
}
