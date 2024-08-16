import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncomendaCadastroComponent } from './encomenda-cadastro.component';

describe('EncomendaCadastroComponent', () => {
  let component: EncomendaCadastroComponent;
  let fixture: ComponentFixture<EncomendaCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncomendaCadastroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncomendaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
