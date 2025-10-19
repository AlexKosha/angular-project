import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenereteAnswerModal } from './generete-answer-modal';

describe('GenereteAnswerModal', () => {
  let component: GenereteAnswerModal;
  let fixture: ComponentFixture<GenereteAnswerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenereteAnswerModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenereteAnswerModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
