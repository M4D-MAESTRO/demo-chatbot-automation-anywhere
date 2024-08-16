import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PocPage } from './poc.page';

describe('PocPage', () => {
  let component: PocPage;
  let fixture: ComponentFixture<PocPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
