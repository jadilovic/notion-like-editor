const ComponentsDropdown = ({ components, handleComponentSelection }) => {
	return (
		<div className="drop-down-container">
			{components.length < 1 ? (
				<div className="option-container">No results</div>
			) : (
				components.map((component, index) => (
					<div
						key={component.id}
						onClick={() => handleComponentSelection(index)}
						className="option-container"
					>
						<div className="option-box">{component.id}</div>
						<div className="drop-down-options">{component.name}</div>
					</div>
				))
			)}
		</div>
	);
};
export default ComponentsDropdown;
