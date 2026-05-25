import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal } from './modal';

@Component({
  standalone: true,
  imports: [Modal],
  template: `
    <app-modal
      [isOpen]="isOpen"
      [size]="size"
      [title]="title"
      [closeable]="closeable"
      (closed)="onClosed()"
    >
      <p>Contenido del modal</p>
      <div modal-footer>
        <button id="footer-btn">Aceptar</button>
      </div>
    </app-modal>
  `,
})
class TestWrapperComponent {
  isOpen = false;
  size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  title = '';
  closeable = true;
  closedCalled = false;

  onClosed() {
    this.closedCalled = true;
  }
}

describe('Modal (via TestWrapper)', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create wrapper and modal', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not render when isOpen is false', () => {
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('should render when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
  });

  it('should render title when provided', () => {
    component.isOpen = true;
    component.title = 'Confirmar pedido';
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent.trim()).toBe('Confirmar pedido');
  });

  it('should emit closed when close button clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const closeBtn = fixture.nativeElement.querySelector('[aria-label="Cerrar"]');
    expect(closeBtn).toBeTruthy();
    closeBtn.click();
    expect(component.closedCalled).toBeTrue();
  });

  it('should emit closed on Escape key', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.closedCalled).toBeTrue();
  });

  it('should not close on non-Escape key', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.closedCalled).toBeFalse();
  });

  it('should not emit closed when closeable is false', () => {
    component.isOpen = true;
    component.closeable = false;
    fixture.detectChanges();
    const closeBtn = fixture.nativeElement.querySelector('[aria-label="Cerrar"]');
    expect(closeBtn).toBeNull();
  });

  it('should render projected content', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('p');
    expect(content).toBeTruthy();
    expect(content.textContent.trim()).toBe('Contenido del modal');
  });

  it('should render footer slot content', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('[modal-footer]');
    expect(footer).toBeTruthy();
  });

  it('should apply md size class by default', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[cdktrapfocus]');
    expect(panel.className).toContain('max-w-lg');
  });

  it('should apply sm size class when configured', () => {
    component.isOpen = true;
    component.size = 'sm';
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[cdktrapfocus]');
    expect(panel.className).toContain('max-w-sm');
  });

  it('should apply lg size class when configured', () => {
    component.isOpen = true;
    component.size = 'lg';
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[cdktrapfocus]');
    expect(panel.className).toContain('max-w-2xl');
  });

  it('should apply full size class when configured', () => {
    component.isOpen = true;
    component.size = 'full';
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[cdktrapfocus]');
    expect(panel.className).toContain('max-w-full');
  });

  it('should close on backdrop click', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    dialog.click();
    expect(component.closedCalled).toBeTrue();
  });

  it('should not close when clicking inside the panel', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[cdktrapfocus]');
    panel.click();
    expect(component.closedCalled).toBeFalse();
  });
});
