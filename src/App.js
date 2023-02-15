import { useState, useEffect, useRef } from 'react';
import { componentStyles } from './componentStyles';
import { nanoid } from 'nanoid';
import './App.css';
import ComponentsDropdown from './components/ComponentsDropdown';

function App() {
	const [texts, setTexts] = useState({});
	const [changeFocus, setChangeFocus] = useState(false);
	const [isComponentsDropdownOpen, setIsComponentsDropdownOpen] =
		useState(false);
	const [componentPlaceholder, setComponentPlaceholder] = useState('');

	const [components, setComponents] = useState([...componentStyles]);

	const inputRef = useRef([]);
	const activeElementId = useRef(null);

	activeElementId.current = document.activeElement.id;

	useEffect(() => {
		setTexts({
			[nanoid()]: {
				component: components[0],
				value: '',
			},
		});
		setComponentPlaceholder('Type / for blocks, @ to link docs or people');
		setChangeFocus(!changeFocus);
	}, []);

	useEffect(() => {
		if (Object.keys(texts).length > 0) {
			inputRef.current[Object.keys(texts).length - 1].focus();
		}
	}, [changeFocus]);

	const searchComponents = (searchValue) => {
		const componentName = searchValue.slice(1).toLowerCase();
		const filteredComponentStyles = components.filter((component) =>
			component.name.toLowerCase().includes(componentName)
		);
		setComponents([...filteredComponentStyles]);
	};

	const removeTextInput = (textName) => {
		delete texts[textName];
		if (JSON.stringify(texts) === '{}') {
			texts[nanoid()] = { component: components[0], value: '' };
		}
		setTexts({
			...texts,
		});
		setChangeFocus(!changeFocus);
		setComponentPlaceholder('Type / for blocks, @ to link docs or people');
	};

	const createInputField = () => {
		texts[nanoid()] = {
			component: components[0],
			value: '',
		};
		setTexts({ ...texts });
	};

	const handleOnChange = (event) => {
		const value = event.target.value;
		if (value.startsWith('/')) {
			setComponents([...componentStyles]);
			setIsComponentsDropdownOpen(true);
			if (value.length > 1) {
				searchComponents(value);
			}
		} else {
			setIsComponentsDropdownOpen(false);
		}

		if (value) {
			texts[event.target.name].value = value;
			setTexts({ ...texts });
		} else {
			removeTextInput(event.target.name);
		}
	};

	const handleOnKeyDown = (event) => {
		if (event.key === 'Enter' && !event.target.value.startsWith('/')) {
			createInputField();
			setChangeFocus(!changeFocus);
			setComponentPlaceholder('Type / for blocks, @ to link docs or people');
			setComponents([...componentStyles]);
		}
		if (event.key === 'Enter' && event.target.value.startsWith('/')) {
			if (components.length > 0) {
				handleComponentSelection(0);
			}
		}
		if (event.key === 'Backspace' && !event.target.value) {
			event.preventDefault();
			removeTextInput(event.target.name);
		}
	};

	const handleComponentSelection = (componentIndex) => {
		texts[activeElementId.current].component =
			components[componentIndex].styles;
		texts[activeElementId.current].value = '';
		setTexts({ ...texts });
		setIsComponentsDropdownOpen(false);
		setComponentPlaceholder(components[componentIndex].name);
		setChangeFocus(!changeFocus);
	};

	return (
		<div className="app">
			<header>
				<h1>Helpjuice Editor</h1>
				<h3>Frontend developer test project</h3>
			</header>
			<main>
				<section>
					<p>
						Your goal is to make a page that looks exactly like this one, and
						has the ability to create H1 text simply by typing / then 1, then
						typing text and hitting enter.
					</p>
				</section>
				<section>
					{Object.keys(texts).map((key, index) => {
						return (
							<div key={key}>
								<input
									id={key}
									ref={(el) => (inputRef.current[index] = el)}
									style={texts[key].component}
									type="text"
									name={key}
									value={texts[key].value}
									onChange={handleOnChange}
									onKeyDown={handleOnKeyDown}
									placeholder={componentPlaceholder}
									data-testid="text-input"
								/>
							</div>
						);
					})}
					{isComponentsDropdownOpen && (
						<ComponentsDropdown
							components={components}
							handleComponentSelection={handleComponentSelection}
						/>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
