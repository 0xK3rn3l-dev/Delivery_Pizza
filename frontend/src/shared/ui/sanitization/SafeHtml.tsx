'use client';

import { escapeHtml } from '@/shared/lib';

interface SafeHtmlProps {
  html: string;
  className?: string;
  tag?: 'div' | 'span' | 'p';
}

export const SafeHtml = ({ html, className = '', tag: Tag = 'div' }: SafeHtmlProps) => {
  const safeHtml = escapeHtml(html);
  
  return (
    <Tag 
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};