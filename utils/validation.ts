import { isEmpty, isEmail } from "lodash";

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  return isEmail(email);
};

/**
 * Validate required field
 */
export const validateRequired = (value: unknown): boolean => {
  return !isEmpty(value);
};

/**
 * Validate minimum length
 */
export const validateMinLength = (
  value: string,
  minLength: number
): boolean => {
  return value.length >= minLength;
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (
  value: string,
  maxLength: number
): boolean => {
  return value.length <= maxLength;
};

/**
 * Validate password strength
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const validatePasswordStrength = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate phone number (basic)
 */
export const validatePhone = (phone: string): boolean => {
  const regex = /^\+?[\d\s-()]+$/;
  return regex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};
