import { ModalManager } from "../../../helpers/ModalManager";
import PageListModal from "../../../helpers/PageListModal";

const { __ } = wp.i18n;

const ImportButton = () => {
	return (
		<div className="qubely-import-layout-btn-container">
			<button
				id="qubelyImportLayoutBtn"
				title="Qubely"
				onClick={() => ModalManager.open(<PageListModal rowClientId={false} />)}
			>
				<img src={`${qubely_admin.plugin}assets/img/qubely-logo-white.svg`} alt="Qubely" />
				{__("Import Layout")}
			</button>
		</div>
	);
};
export default ImportButton;
