import {Component, OnInit} from '@angular/core';
import * as vis from 'vis';
import {Node} from 'vis';
import {Edge} from 'vis';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {TreeUtils} from '../shared/tree.utils';

@Component({
  selector: 'app-generate-tree',
  templateUrl: './generate-tree.component.html',
  styleUrls: ['./generate-tree.component.css']
})
export class GenerateTreeComponent implements OnInit {
  nodes: vis.DataSet<Node>;
  edges: vis.DataSet<Edge>;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sequenceFormControl: new FormControl('',
        [Validators.minLength(5),
          Validators.pattern('[1-9]+(,[0-9]+)*'),
          Validators.required]),
    });
  }

  generateTree(sequence: number[]) {
    const tree = TreeUtils.getTreeByPruferSequence(sequence);
    this.nodes = tree.nodes as vis.DataSet<Node>;
    this.edges = tree.edges as vis.DataSet<Edge>;
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.generateTree(this.form.value.sequenceFormControl.split(',').map(s => Number(s)));
    }
  }

}
