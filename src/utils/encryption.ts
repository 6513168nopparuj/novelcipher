
import CryptoJS from 'crypto-js';

// Constants for encryption
const DEFAULT_KEY = '0123456789abcdef0123456789abcdef';
const DEFAULT_IV = 'abcdef9876543210';

// For client-side encryption/decryption, we use CryptoJS library
// This allows us to use the same algorithm (AES-256-CBC) as on the server

// Get encryption key and IV from environment or use defaults
const getKey = () => process.env.ENCRYPTION_KEY || DEFAULT_KEY;
const getIV = () => process.env.ENCRYPTION_IV || DEFAULT_IV;

/**
 * Encrypt text using AES-256-CBC
 */
export const encryptText = (text: string): string => {
  try {
    const key = CryptoJS.enc.Utf8.parse(getKey());
    const iv = CryptoJS.enc.Utf8.parse(getIV());
    
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};

/**
 * Decrypt text using AES-256-CBC
 */
export const decryptText = (encryptedText: string): string => {
  try {
    const key = CryptoJS.enc.Utf8.parse(getKey());
    const iv = CryptoJS.enc.Utf8.parse(getIV());
    
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return 'Error decrypting content';
  }
};

/**
 * Obscure content for display in the DOM
 * This adds an extra layer of protection beyond the initial encryption
 */
export const obscureForDisplay = (content: string): string => {
  // This is a simple obfuscation technique that could be enhanced for production
  return btoa(content);
};

/**
 * De-obscure content for display
 */
export const deobscureForDisplay = (obscuredContent: string): string => {
  try {
    return atob(obscuredContent);
  } catch (error) {
    console.error('Error deobscuring content:', error);
    return 'Error displaying content';
  }
};
