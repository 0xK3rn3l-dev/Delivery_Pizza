/**
 * Экранирует HTML специальные символы для защиты от XSS
 */
export const escapeHtml = (str: string): string => {
  if (!str) return '';
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  
  return str.replace(/[&<>"'/`=]/g, (char) => htmlEscapes[char] || char);
};

/**
 * Санитизирует URL для безопасного использования в src, href
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Проверяем протокол
  const protocols = ['http:', 'https:', 'mailto:', 'tel:'];
  try {
    const parsed = new URL(url);
    if (!protocols.includes(parsed.protocol)) {
      return '';
    }
    return url;
  } catch {
    // Если невалидный URL, возвращаем пустую строку
    return '';
  }
};

/**
 * Безопасно получает значение из input
 */
export const sanitizeInput = (value: string): string => {
  return escapeHtml(value.trim());
};

/**
 * Проверяет и санитизирует изображение
 */
export const sanitizeImage = (url: string): string => {
  if (!url) return '/images/placeholder.jpg';
  
  const safeUrl = sanitizeUrl(url);
  if (!safeUrl) return '/images/placeholder.jpg';
  
  // Проверяем расширение
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const ext = safeUrl.toLowerCase().slice(-5);
  const isValid = allowedExtensions.some(e => ext.includes(e));
  
  return isValid ? safeUrl : '/images/placeholder.jpg';
};