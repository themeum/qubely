import icons from '../../helpers/icons';

function Headings(props) {
	const { selectedLevel, onChange, label = '' } = props;
	return (
		<div className="qubely-field qubely-field-headings">
			{label && <label>{label}</label>}
			<div className="qubely-field-button-list qubely-field-button-list-fluid">
				{[1, 2, 3, 4, 5, 6].map((data, index) => {
					return (
						<button
							key={index}
							className={
								(selectedLevel == data ? 'active' : '') + ' qubely-button'
							}
							onClick={() => onChange(data)}
						>
							{icons['h' + data]}
						</button>
					);
				})}
			</div>
		</div>
	);
}
export default Headings;
