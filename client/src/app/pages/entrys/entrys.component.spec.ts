import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrysComponent } from './entrys.component';

describe('EntrysComponent', () => {
  let component: EntrysComponent;
  let fixture: ComponentFixture<EntrysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
