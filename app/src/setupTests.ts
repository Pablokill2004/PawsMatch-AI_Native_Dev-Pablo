import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.stubGlobal(
	'fetch',
	vi.fn(async () =>
		new Response(JSON.stringify({ message: 'https://example.com/dog.jpg' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	) as unknown as typeof fetch
);
