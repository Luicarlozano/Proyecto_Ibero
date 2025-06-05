import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntrysComponent } from './list-entrys.component';

describe('ListEntrysComponent', () => {
  let component: ListEntrysComponent;
  let fixture: ComponentFixture<ListEntrysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEntrysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEntrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
