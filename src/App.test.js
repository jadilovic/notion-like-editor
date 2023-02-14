import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('<App />', () => {
	test('render text input', () => {
		render(<App />);

		const inputEl = screen.getByTestId('text-input');
		expect(inputEl).toBeInTheDocument();
		expect(inputEl).toHaveAttribute('type', 'text');
	});

	test('pass text to input field', () => {
		render(<App />);

		const inputEl = screen.getByTestId('text-input');
		userEvent.type(inputEl, 'test-text');
		console.log(inputEl);

		expect(screen.getByTestId('text-input')).toHaveValue('test-text');
	});
});
