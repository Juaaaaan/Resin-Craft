import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslocoService,
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';

import { Contact } from './contact';
import { TRANSLOCO_CONST_CONFIG } from '../../shared/consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, TranslocoTestingModule.forRoot(translocoOptions)],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit and stay idle when the form is empty', () => {
    component.onSubmit(new SubmitEvent('submit'));

    expect(component.isSubmitting()).toBeFalse();
    expect(component.submitStatus()).toBe('idle');
    expect(component.form.controls.fullName.touched).toBeTrue();
    expect(component.form.controls.email.touched).toBeTrue();
    expect(component.form.controls.subject.touched).toBeTrue();
    expect(component.form.controls.message.touched).toBeTrue();
  });

  it('should submit and resolve to success when the form is valid', () => {
    jasmine.clock().install();
    try {
      component.onFieldChange('fullName', 'Ana García');
      component.onFieldChange('email', 'ana@example.com');
      component.onFieldChange('subject', 'order_inquiry');
      component.onFieldChange('message', 'Hola, tengo una consulta sobre mi pedido.');

      component.onSubmit(new SubmitEvent('submit'));

      expect(component.isSubmitting()).toBeTrue();

      jasmine.clock().tick(600);

      expect(component.isSubmitting()).toBeFalse();
      expect(component.submitStatus()).toBe('success');
    } finally {
      jasmine.clock().uninstall();
    }
  });

  it('should flag an invalid email format', () => {
    component.onFieldChange('email', 'not-an-email');

    expect(component.form.controls.email.invalid).toBeTrue();

    const transloco = TestBed.inject(TranslocoService);
    expect(component.errorFor('email')).toBe(transloco.translate('contact.errors.email'));
  });

  it('should flag a message shorter than the minimum length', () => {
    component.onFieldChange('message', 'too short');

    const transloco = TestBed.inject(TranslocoService);
    expect(component.errorFor('message')).toBe(transloco.translate('contact.errors.minLength'));
  });

  it('should not show an error for an untouched field', () => {
    expect(component.errorFor('subject')).toBe('');
  });

  it('should not show an error once a touched field becomes valid', () => {
    component.onFieldChange('fullName', 'Ana García');

    expect(component.errorFor('fullName')).toBe('');
  });
});
