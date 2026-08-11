export type ContactSubject = 'custom_commission' | 'order_inquiry' | 'wholesale' | 'press' | 'other';

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: ContactSubject;
  message: string;
}
