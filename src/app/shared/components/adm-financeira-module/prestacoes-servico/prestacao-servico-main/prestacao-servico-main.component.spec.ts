import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestacaoServicoMainComponent } from './prestacao-servico-main.component';

describe('PrestacaoServicoMainComponent', () => {
  let component: PrestacaoServicoMainComponent;
  let fixture: ComponentFixture<PrestacaoServicoMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacaoServicoMainComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestacaoServicoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
