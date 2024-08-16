import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncomendaFinalizarComponent } from './encomenda-finalizar.component';

describe('EncomendaFinalizarComponent', () => {
  let component: EncomendaFinalizarComponent;
  let fixture: ComponentFixture<EncomendaFinalizarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncomendaFinalizarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncomendaFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
