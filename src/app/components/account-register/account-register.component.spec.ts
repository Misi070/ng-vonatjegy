import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegisterComponent } from './account-register.component';

describe('AccountRegisterComponent', () => {
  let component: AccountRegisterComponent;
  let fixture: ComponentFixture<AccountRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
