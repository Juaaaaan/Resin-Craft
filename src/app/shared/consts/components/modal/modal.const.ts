export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export const MODAL_SIZES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-full mx-sm',
};
