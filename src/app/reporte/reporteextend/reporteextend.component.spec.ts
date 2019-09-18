import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteextendComponent } from './reporteextend.component';

describe('ReporteextendComponent', () => {
  let component: ReporteextendComponent;
  let fixture: ComponentFixture<ReporteextendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteextendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteextendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
