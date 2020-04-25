import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatIconModule } from '@angular/material/icon';
import { provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';

let loader: HarnessLoader;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [BrowserAnimationsModule, RouterTestingModule, MatToolbarModule, MatMenuModule, MatIconModule],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should has app name', () => {
    const appName = fixture.debugElement.query(By.css('[data-testid="app-name"]'));

    expect(component).toBeTruthy();
    expect(appName.nativeElement.innerText).toEqual('Face game');
  });

  it('shouldn\'t show menu items by default', async () => {
    const headerMenu = await loader.getHarness(MatMenuHarness);
    const menuItems = await headerMenu.getItems();

    expect(await headerMenu.isOpen()).toBeFalsy();
    expect(menuItems.length).toEqual(0);
  });

  it('should show menu items after opened', async () => {
    const headerMenu = await loader.getHarness(MatMenuHarness);
    await headerMenu.open();
    const menuItems = await headerMenu.getItems();

    expect(await headerMenu.isOpen()).toBeTruthy();
    expect(menuItems.length).not.toEqual(0);
  });
});
