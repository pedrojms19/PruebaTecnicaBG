import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersolicitudesComponent } from './ver-solicitudes.component';

describe('VersolicitudesComponent', () => {
  let component: VersolicitudesComponent;
  let fixture: ComponentFixture<VersolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersolicitudesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
