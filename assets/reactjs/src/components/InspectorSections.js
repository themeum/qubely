import "./css/inspectorSections.scss";
const {
	element: { useEffect, useState },
	i18n: { __ },
	data: { withDispatch },
	blocks: { parse },
	components: { Tooltip, PanelBody },
} = wp;

const Sections = (props) => {
	const [sections, setSections] = useState([]);
	const [loadingState, setLoadingState] = useState("");
	const block = typeof props.block !== "undefined" ? props.block : "";
	const storeName = "_qubely_local_cache_";
	const storeNameDate = "_last_update_";

	useEffect(() => {
		const today = new Date();
		const sectionData = _getStoreData("sections");

		if (sectionData) {
			let expDate = _getStoreData(storeNameDate);
			expDate = expDate ? expDate : 0;
			if (expDate !== null && today > expDate) {
				_clearStore();
				_fetchSections(today);
			} else {
				setSections(sectionData);
			}
		} else {
			_fetchSections(today);
		}
	}, []);

	// Sync sections in background
	const _syncSections = (sections) => {
		sections.forEach((section, index) => {
			const isLatest = sections.length === index + 1 ? true : false;
			_fetchSection(section.ID, () => {
				if (isLatest) {
					setLoadingState("qubely-done");
					setTimeout(() => {
						setLoadingState("");
					}, 1000);
				}
			});
		});
	};

	// fetch sections
	const _fetchSections = (today) => {
		setLoadingState("qubely-is-loading");
		fetch("https://qubely.io/wp-json/restapi/v2/sections", {
			method: "POST",
			body: block ? new URLSearchParams("block_name=" + block) : "",
		})
			.then((response) => (response.ok ? response.json() : Promise.reject(response)))
			.then((response) => {
				const cacheExp = new Date().setDate(today.getDate() + 1);
				setSections(response);
				_setStore("sections", response);
				_setStore(storeNameDate, cacheExp);
				_syncSections(response);
			})
			.catch((err) => {
				console.warn("Something went wrong.", err);
			});
	};

	// fetch section
	const _fetchSection = (section_id, callback) => {
		fetch("https://qubely.io/wp-json/restapi/v2/single-section", {
			method: "POST",
			body: new URLSearchParams("section_id=" + section_id),
		})
			.then((response) => (response.ok ? response.json() : Promise.reject(response)))
			.then((response) => {
				_setStore(section_id, response.rawData);
				callback && callback();
			})
			.catch((err) => {
				console.warn("Something went wrong.", err);
			});
	};

	// insert section as block
	const _insertSection = (section_id) => {
		const { insertBlocks } = props;
		const sectionData = _getStoreData(section_id);
		if (sectionData !== null) {
			insertBlocks(parse(sectionData));
		} else {
			_fetchSection(section_id, () => {
				const sectionData = _getStoreData(section_id);
				insertBlocks(parse(sectionData));
			});
		}
	};

	// Get full storage
	const _getStore = () => {
		let store = window.localStorage.getItem(storeName);
		store = JSON.parse(store);
		return store ? store : null;
	};

	// Get data from storage by key
	const _getStoreData = (key) => {
		let store = _getStore();
		store =
			store !== null && typeof store[block] !== "undefined" && typeof store[block][key] !== "undefined"
				? store[block][key]
				: null;
		return store;
	};

	// Set data to storage
	const _setStore = (key, newData) => {
		if (typeof key === "undefined" || typeof newData === "undefined") {
			return false;
		}
		let storage = _getStore() ? _getStore() : {};
		if (typeof storage[block] === "undefined") {
			storage[block] = {};
		}
		storage[block][key] = newData;
		storage = JSON.stringify(storage);
		window.localStorage.setItem(storeName, storage);
	};

	// Clear localStorage data
	const _clearStore = () => window.localStorage.setItem(storeName, JSON.stringify({}));

	// Re-sync blocks
	const _syncBlocks = () => {
		const today = new Date();
		_clearStore();
		_fetchSections(today);
	};

	return (
		<PanelBody title={__("Related Sections")} initialOpen={true}>
			<div className="qubely-block-sections">
				<Tooltip text={__("Sync blocks")}>
					<button onClick={_syncBlocks} className={"qubely-block-refresh " + loadingState}>
						<span className="fas fa-sync-alt"></span>
					</button>
				</Tooltip>
				{sections.map((section, i) => (
					<div key={i} className="qubely-block-section">
						<img width="330" height="230" loading="lazy" src={section.image} alt={section.name} />
						<div className="qubely-block-section-btns">
							<button onClick={() => _insertSection(section.ID)}>{__("Import")}</button>
						</div>
					</div>
				))}
			</div>
		</PanelBody>
	);
};

export default withDispatch((dispatch) => ({ insertBlocks: dispatch("core/block-editor").insertBlocks }))(Sections);
