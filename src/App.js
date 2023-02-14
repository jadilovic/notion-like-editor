import { useState, useEffect, useRef } from 'react';
import { components } from './componentStyles';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
	const [texts, setTexts] = useState({});
	const [value, setValue] = useState('');
	const [changeFocus, setChangeFocus] = useState(false);
	const [isSelection, setIsSelection] = useState(false);
	const inputRef = useRef([]);
	const activeElementId = useRef(null);

	activeElementId.current = document.activeElement.id;

	useEffect(() => {
		setTexts({
			[nanoid()]: {
				component: components['p'],
				value: '',
			},
		});
		setChangeFocus(!changeFocus);
	}, []);

	useEffect(() => {
		if (Object.keys(texts).length > 0) {
			inputRef.current[Object.keys(texts).length - 1].focus();
		}
	}, [changeFocus]);

	const handleOnChange = (e) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		if (inputValue.startsWith('/')) {
			setIsSelection(true);
			if (inputValue.length > 1) {
				const number = inputValue.slice(1);
				console.log(number);
			}
		}
		if (inputValue) {
			texts[e.target.name].value = inputValue;
			setTexts({ ...texts });
		} else {
			console.log('test');
			delete texts[e.target.name];
			if (JSON.stringify(texts) === '{}') {
				texts[nanoid()] = { component: components['p'], value: '' };
				setChangeFocus(!changeFocus);
			}
			setTexts({
				...texts,
			});
			setChangeFocus(!changeFocus);
		}
	};

	const handleOnKeyDown = (event) => {
		if (event.key === 'Enter' && !event.target.value.startsWith('/')) {
			texts[nanoid()] = {
				component: components['p'],
				value: '',
			};
			setTexts({ ...texts });
			setChangeFocus(!changeFocus);
		}
		if (
			event.key === 'Backspace' &&
			value.length < 1 &&
			Object.keys(texts).length > 1
		) {
			console.log('test backspace');
			delete texts[activeElementId.current];
			setTexts({
				...texts,
			});
			setChangeFocus(!changeFocus);
		}
	};

	const handleComponentSelection = (componentKey) => {
		texts[activeElementId.current].component = components[componentKey];
		texts[activeElementId.current].value = '';
		setTexts({ ...texts });
		setIsSelection(false);
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
									style={texts[key].component.styles}
									type="text"
									name={key}
									value={texts[key].value}
									onChange={handleOnChange}
									onKeyDown={handleOnKeyDown}
									placeholder="Type / for blocks, @ to link docs or people"
								/>
							</div>
						);
					})}
					{isSelection && (
						<div className="drop-down-container">
							{Object.keys(components).map((key) => {
								return (
									<div
										key={key}
										onClick={() => handleComponentSelection(key)}
										className="drop-down-options"
									>
										{components[key].name}
									</div>
								);
							})}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
