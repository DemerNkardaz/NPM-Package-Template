/**
 * Example function
 * @param name - Input name
 * @returns Formatted greeting
 *
 * @example
 * ```ts
 * greet('World') // Returns "Hello World"
 * ```
 */
export function greet(name: string = 'World'): string {
	return `Hello ${name}`;
}

// Export types
export type * from './types';
