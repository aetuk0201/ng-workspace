import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevLibraryComponent } from '../components/dev-library.component';

describe('DevLibraryComponent', () => {
  let component: DevLibraryComponent;
  let fixture: ComponentFixture<DevLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
