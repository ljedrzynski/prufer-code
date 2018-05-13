import {ExtNode} from '../custom-types';
import * as vis from 'vis';
import {Edge} from 'vis';
import {Data} from 'vis';
import {Node} from 'vis';

export class TreeUtils {

  constructor() {
  }

  static getTreeByPruferSequence(sequence: number[]): Data {
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
    return {nodes: new vis.DataSet<Node>(nodes), edges: new vis.DataSet<Edge>(edges)};
  }

  static getPruferSequence(tree: Data): number[] {
    const result = [];
    const nodes = TreeUtils.getNodes(this.deepCopyTree(tree));
    while (result.length !== (tree.nodes.length - 2)) {
      const current = this.getMinLeaf(nodes);
      result.push(current.adj[0].id);
      TreeUtils.removeNode(current, nodes);
    }
    return result;
  }

  static getNodes(tree: Data): ExtNode[] {
    const result: ExtNode[] = (tree.nodes as vis.DataSet<Node>).map(node => {
      return {id: String(node.id), adj: []};
    });
    result.forEach(node => {
      const adjacentNodes = this.getAdjacentNodes(node.id, tree.edges);
      node.adj = result.filter(tmp => adjacentNodes
        .map(String)
        .includes(tmp.id));
    });
    return result;
  }


  static removeNode(node: ExtNode, nodes: ExtNode[]) {
    nodes.forEach(adj => {
      const index = adj.adj.indexOf(node);
      if (index > -1) {
        adj.adj.splice(index, 1);
      }
    });
    nodes.splice(nodes.indexOf(node), 1);
  }

  static deepCopyTree(tree: Data): Data {
    return {
      nodes: (tree.nodes as vis.DataSet<Node>).map(item => Object.assign(<Node>{}, item)),
      edges: (tree.edges as vis.DataSet<Edge>).map(item => Object.assign(<Edge>{}, item))
    };
  }

  static getAdjacentNodes(nodeId: any, edges: any): any[] {
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

  static getMinLeaf(nodes: ExtNode[]): ExtNode {
    return nodes.reduce((prev, curr) =>
      this.isLeaf(prev) && prev.id < curr.id ? prev : curr);
  }

  static isLeaf(node: ExtNode): boolean {
    return node.adj.length === 1;
  }

  static isCycle(nodeIdx: number, nodes: ExtNode[], visited: boolean[], parentIdx: number): boolean {
    visited[nodeIdx] = true;
    for (const adj of nodes[nodeIdx].adj) {
      const adjIdx = Number(adj.id) - 1;
      if (!visited[adjIdx]) {
        if (this.isCycle(adjIdx, nodes, visited, nodeIdx)) {
          return true;
        }
      } else if (adjIdx !== parentIdx) {
        return true;
      }
    }
    return false;
  }

  static validateCycle(tree: vis.Data) {
    const nodes = this.getNodes(tree);
    const visited = nodes.map(() => false);
    for (let i = 0; i < nodes.length; i++) {
      if (!visited[i]) {
        if (this.isCycle(i, nodes, visited, null)) {
          return true;
        }
      }
    }
    return false;
  }

  static getEmptyNodeList(size: number): Node[] {
    const nodes = [];
    for (let i = 1; i <= size; i++) {
      nodes.push({id: i, label: String(i)});
    }
    return nodes;
  }
}
