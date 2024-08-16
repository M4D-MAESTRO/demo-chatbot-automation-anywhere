import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailProgramacaoCreateComponent } from './email-programacao-create.component';

describe('EmailProgramacaoCreateComponent', () => {
  let component: EmailProgramacaoCreateComponent;
  let fixture: ComponentFixture<EmailProgramacaoCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailProgramacaoCreateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailProgramacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
