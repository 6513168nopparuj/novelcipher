
/**
 * Applies copy protection to a DOM element
 * This prevents text selection, right-click, and adds other protections
 */
export const applyCopyProtection = (element: HTMLElement | null): void => {
  if (!element) return;
  
  // Prevent text selection
  element.classList.add('no-select');
  
  // Additional CSS properties for protection
  Object.assign(element.style, {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  });
  
  // Disable clipboard operations
  element.oncopy = (e) => e.preventDefault();
  element.oncut = (e) => e.preventDefault();
  element.onpaste = (e) => e.preventDefault();
  
  // Disable right-click contextmenu
  element.oncontextmenu = (e) => e.preventDefault();
  
  // Disable drag operations
  element.ondragstart = (e) => e.preventDefault();
  element.ondrag = (e) => e.preventDefault();
  element.ondragend = (e) => e.preventDefault();
};

/**
 * Set up global copy protection for the document
 */
export const setupGlobalCopyProtection = (): void => {
  // Override keyboard shortcuts for copy actions
  document.addEventListener('keydown', (e) => {
    // Prevent Ctrl+C, Ctrl+X, Ctrl+P, etc.
    if (
      (e.ctrlKey || e.metaKey) && 
      (e.key === 'c' || e.key === 'x' || e.key === 'p' || e.key === 's' || e.key === 'a')
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
  
  // Disable selection for the entire document
  document.addEventListener('selectstart', (e) => {
    // Allow selection in input elements and specifically allowed elements
    if (
      e.target instanceof HTMLInputElement || 
      e.target instanceof HTMLTextAreaElement ||
      (e.target instanceof HTMLElement && !e.target.closest('.protected-content'))
    ) {
      return true;
    }
    e.preventDefault();
    return false;
  });
  
  // Disable right-click globally
  document.addEventListener('contextmenu', (e) => {
    if (e.target instanceof HTMLElement && e.target.closest('.protected-content')) {
      e.preventDefault();
      return false;
    }
    return true;
  });
};
