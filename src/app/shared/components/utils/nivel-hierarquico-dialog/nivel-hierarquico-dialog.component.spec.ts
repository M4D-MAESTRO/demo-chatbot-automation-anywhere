import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NivelHierarquicoDialogComponent } from './nivel-hierarquico-dialog.component';

describe('NivelHierarquicoDialogComponent', () => {
  let component: NivelHierarquicoDialogComponent;
  let fixture: ComponentFixture<NivelHierarquicoDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelHierarquicoDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NivelHierarquicoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
