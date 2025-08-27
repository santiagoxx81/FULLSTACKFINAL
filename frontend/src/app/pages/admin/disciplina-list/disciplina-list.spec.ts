import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaList } from './disciplina-list';

describe('DisciplinaList', () => {
  let component: DisciplinaList;
  let fixture: ComponentFixture<DisciplinaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplinaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
