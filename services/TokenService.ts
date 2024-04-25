import { randomBytes } from 'crypto';
/**
 * Creates a unique registration token for a new user.
 * @returns {string} A unique token for user registration.
 */
export const createRegistrationToken = (): string => {
    return randomBytes(48).toString('hex');
};

export const createPasswordResetToken = (): string => {
    return randomBytes(48).toString('hex');
};
