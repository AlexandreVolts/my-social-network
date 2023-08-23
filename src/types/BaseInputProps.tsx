export interface BaseInputProps {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange: (value: string) => void;
}