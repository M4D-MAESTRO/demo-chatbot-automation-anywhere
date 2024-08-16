import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestacaoServicoDetailComponent } from './prestacao-servico-detail.component';

describe('PrestacaoServicoDetailComponent', () => {
  let component: PrestacaoServicoDetailComponent;
  let fixture: ComponentFixture<PrestacaoServicoDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacaoServicoDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestacaoServicoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
