import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColaboradorBriefComponent } from './colaborador-brief.component';

describe('ColaboradorBriefComponent', () => {
  let component: ColaboradorBriefComponent;
  let fixture: ComponentFixture<ColaboradorBriefComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradorBriefComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColaboradorBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
