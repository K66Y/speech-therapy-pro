import React from 'react';
import { EditableText } from './EditableText';
import { normalizeDigits } from '../services/dateService';

interface Props {
  value: string | number;
  onChange?: (event: { target: { value: string } }) => void;
  'aria-label'?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  min?: string | number;
  max?: string | number;
  readOnly?: boolean;
  placeholder?: string;
}

/** Adapts existing form callbacks to explicit, validated save/cancel editing. */
export function SavedField({ value, onChange, multiline = false, rows, className = '', type, min, max, readOnly, ...props }: Props) {
  const label = props['aria-label'] || props.placeholder || 'التفاصيل';
  const text = normalizeDigits(String(value ?? ''));
  if (readOnly) return <span>{text}</span>;
  return <EditableText label={label} value={text} multiline={multiline} rows={rows}
    className={`${type === 'number' ? 'inline-block align-middle min-w-20' : ''} ${className.replace(/\bprint:hidden\b/g, '')}`}
    onSave={next => onChange?.({ target: { value: normalizeDigits(next) } })}
    onDelete={() => onChange?.({ target: { value: type === 'number' ? String(min ?? 0) : '' } })}
    validate={type === 'number' ? next => {
      const n = Number(normalizeDigits(next));
      return !next || !Number.isFinite(n) || (min !== undefined && n < Number(min)) || (max !== undefined && n > Number(max)) ? `أدخل رقماً من ${min ?? 0} إلى ${max ?? 100} بالأرقام 123` : undefined;
    } : undefined}
  />;
}
