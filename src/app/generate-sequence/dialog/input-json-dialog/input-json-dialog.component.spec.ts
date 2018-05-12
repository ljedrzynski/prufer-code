import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputJsonDialogComponent } from './input-json-dialog.component';

describe('InputJsonDialogComponent', () => {
  let component: InputJsonDialogComponent;
  let fixture: ComponentFixture<InputJsonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputJsonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
