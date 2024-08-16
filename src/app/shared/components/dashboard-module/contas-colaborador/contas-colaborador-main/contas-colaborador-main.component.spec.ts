import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContasColaboradorMainComponent } from './contas-colaborador-main.component';

describe('ContasColaboradorMainComponent', () => {
  let component: ContasColaboradorMainComponent;
  let fixture: ComponentFixture<ContasColaboradorMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasColaboradorMainComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContasColaboradorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
