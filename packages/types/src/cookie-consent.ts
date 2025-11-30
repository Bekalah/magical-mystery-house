/**
 * Cookie consent constants and types
 * Shared across all Roo Code repositories
 */

/**
 * The name of the cookie that stores user's consent preference
 * Used by react-cookie-consent library
 */
export const CONSENT_COOKIE_NAME = "cathedral-cookie-consent"

/**
 * Possible values for the consent cookie
 */
/**
 * ⚗️ ConsentCookieValue - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export type ConsentCookieValue = "true" | "false"

/**
 * Cookie consent event names for communication between components
 */
export const COOKIE_CONSENT_EVENTS = {
	CHANGED: "cookieConsentChanged",
} as const
