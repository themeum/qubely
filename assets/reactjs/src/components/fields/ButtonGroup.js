import "../css/buttonGroup.scss";
import Device from "./Device";
const { useState } = wp.element;
const { Button, ButtonGroup } = wp.components;

export default function ({
	label,
	options,
	value,
	onChange,
	additionalClass,
	responsive,
	device: activeDevice,
	onDeviceChange,
}) {
	const [device, setDevice] = useState("md");
	let responsiveDevice = responsive ? (activeDevice ? activeDevice : device) : window.qubelyDevice;

	const getValue = () => (value ? (responsive ? value[responsiveDevice] || "" : value) : "");
	const onButtonClick = (val) => onChange(responsive ? Object.assign({}, value, { [responsiveDevice]: val }) : val);

	const updateDevice = (newDevice) => {
		if (typeof activeDevice !== "undefined") onChange({ ...value, device: newDevice });
		setDevice(newDevice);
	};

	return (
		<div className={"qubely-field-group-btn qubely-field " + (responsive ? "qubely-responsive" : "qubely-d-flex")}>
			{responsive && (
				<div className="qubely-d-flex qubely-align-center qubely-mb-10">
					{label && <label> {label} </label>}
					{responsive && (
						<Device
							device={responsiveDevice}
							commonResponsiveDevice={device}
							className="qubely-ml-10"
							onChange={(val) => {
								device && onDeviceChange ? onDeviceChange(val) : updateDevice(val);
							}}
						/>
					)}
				</div>
			)}

			{!responsive && label && <label> {label} </label>}

			<ButtonGroup className="qubely-field-child qubely-d-flex">
				{options.map(([title, option], i) => {
					const activeBtn = option === getValue() ? "qubley-active-group-btn" : "";
					return (
						<Button
							key={i}
							className={`qubley-group-button ${activeBtn}${
								additionalClass ? ` ${additionalClass}` : ""
							}`}
							onClick={() => onButtonClick(option)}
						>
							{title}
						</Button>
					);
				})}
			</ButtonGroup>
		</div>
	);
}
