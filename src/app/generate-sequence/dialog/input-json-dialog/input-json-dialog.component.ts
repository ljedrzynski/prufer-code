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
  input: string;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<InputJsonDialogComponent>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      input: ''
    });
  }

  submit(form) {
    this.dialogRef.close(`${form.value.input}`);
  }
}
