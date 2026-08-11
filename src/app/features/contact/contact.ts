import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { environment } from '../../../environments/environment';
import { IntroPageSection } from '../../shared/components/intro-page-section/intro-page-section';
import { InputComponent } from '../../shared/components/ui/input/input';
import { Select } from '../../shared/components/ui/select/select';
import { TextArea } from '../../shared/components/ui/text-area/text-area';
import { ButtonComponent } from '../../shared/components/ui/button/button';
import { ContactFormData } from './contact.model';

type ContactFieldName = keyof ContactFormData;

@Component({
  selector: 'app-contact',
  imports: [
    TranslocoDirective,
    NgOptimizedImage,
    IntroPageSection,
    InputComponent,
    Select,
    TextArea,
    ButtonComponent,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly transloco = inject(TranslocoService);

  readonly contactInfo = environment.contact;

  readonly isSubmitting = signal(false);
  readonly submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onFieldChange(field: ContactFieldName, value: string): void {
    const control = this.form.controls[field];
    control.setValue(value);
    control.markAsTouched();
  }

  errorFor(field: ContactFieldName): string {
    const control = this.form.controls[field];
    if (!control.touched || control.valid) {
      return '';
    }
    if (control.hasError('required')) {
      return this.transloco.translate('contact.errors.required');
    }
    if (control.hasError('email')) {
      return this.transloco.translate('contact.errors.email');
    }
    if (control.hasError('minlength')) {
      return this.transloco.translate('contact.errors.minLength');
    }
    return '';
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    // TODO Fase 5: integrar envío real vía Resend / Edge Function.
    // Por ahora se simula un envío exitoso; no existe persistencia de mensajes de contacto.
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitStatus.set('success');
      this.form.reset({ fullName: '', email: '', subject: '', message: '' });
    }, 600);
  }
}
