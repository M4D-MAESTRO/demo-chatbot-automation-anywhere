import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatrimonioCadastroComponent } from './patrimonio-cadastro.component';

describe('PatrimonioCadastroComponent', () => {
  let component: PatrimonioCadastroComponent;
  let fixture: ComponentFixture<PatrimonioCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonioCadastroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatrimonioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
