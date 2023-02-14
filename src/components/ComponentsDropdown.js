const ComponentsDropdown = ({ component, index, handleComponentSelection }) => {
	return (
		<div className="option-container">
			<div className="option-box">{component.id}</div>
			<div
				key={component.id}
				onClick={() => handleComponentSelection(index)}
				className="drop-down-options"
			>
				{component.name}
			</div>
		</div>
	);
};
export default ComponentsDropdown;
