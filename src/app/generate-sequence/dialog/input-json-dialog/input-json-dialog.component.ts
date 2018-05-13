import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-input-json-dialog',
  templateUrl: './input-json-dialog.component.html',
  styleUrls: ['./input-json-dialog.component.css']
})
export class InputJsonDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private dialog: MatDialogRef<InputJsonDialogComponent>, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      input: ''
    });
  }

  submit(form) {
    this.dialog.close(`${form.value.input}`);
  }
}
