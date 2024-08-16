import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministracaoRecursoPage } from './administracao-recurso.page';

describe('AdministracaoRecursoPage', () => {
  let component: AdministracaoRecursoPage;
  let fixture: ComponentFixture<AdministracaoRecursoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracaoRecursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministracaoRecursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
