
// =========================
// Utility Functions for React
// =========================

// --- HTML Sanitization ---
// Escapes all HTML (safe for text nodes)
export function sanitizeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Allows only basic tags, strips scripts and event handlers
export function sanitizeHTMLBasic(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.innerHTML = str;
  // Remove scripts
  div.querySelectorAll('script').forEach(script => script.remove());
  // Remove event handler attributes
  div.querySelectorAll('*').forEach(element => {
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('on')) element.removeAttribute(attr.name);
    });
  });
  // Allow only safe tags
  const allowedTags = ['p','br','strong','em','b','i','u','a','ul','ol','li','h1','h2','h3','h4','h5','h6'];
  div.querySelectorAll('*').forEach(element => {
    if (!allowedTags.includes(element.tagName.toLowerCase())) {
      element.replaceWith(...element.childNodes);
    }
  });
  return div.innerHTML;
}

// --- Validators ---
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidURL(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

// --- Rate Limiter (for forms, etc) ---
export class RateLimiter {
  constructor(maxAttempts = 3, timeWindow = 60000) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindow;
    this.attempts = new Map();
  }
  canAttempt(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    const recentAttempts = userAttempts.filter(time => now - time < this.timeWindow);
    if (recentAttempts.length >= this.maxAttempts) return false;
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true;
  }
  getRemainingTime(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    const oldestRecentAttempt = userAttempts.find(time => now - time < this.timeWindow);
    if (!oldestRecentAttempt) return 0;
    return this.timeWindow - (now - oldestRecentAttempt);
  }
}
