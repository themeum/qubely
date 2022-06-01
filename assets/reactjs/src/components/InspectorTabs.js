/* eslint-disable react/react-in-jsx-scope */
import "./css/inspectorTabs.scss";
import classnames from "classnames";
const { __ } = wp.i18n;
const { Fragment, cloneElement, Children } = wp.element;
const { Tooltip } = wp.components;

const { useState, useRef, useEffect } = wp.element,
	LAYOUT = "layout",
	STYLE = "style",
	ADVANCE = "advance";

const InspectorTabs = (props) => {
	const { defaultTab, children, tabs } = props,
		[currentTab, setCurrentTab] = useState(defaultTab ? defaultTab : tabs[0]),
		tabContainer = useRef(),
		offset = useRef(undefined);

	let sidebarPanel;

	useEffect(() => {
		sidebarPanel = tabContainer.current.closest(".components-panel");
	});

	const observer = new IntersectionObserver(
		([e]) => e.target.classList.toggle("qubely-is-sticky", e.intersectionRatio < 1),
		{ threshold: [1] }
	);

	// component did mount
	useEffect(() => {
		// sticky tabs menu
		const container = document.querySelector(".qubely-inspector-tabs-container");
		if (container) {
			observer.observe(container);
		}

		// component will unmount
		return () => {
			sidebarPanel && sidebarPanel.removeAttribute("data-qubely-tab");
		};
	}, []);

	useEffect(() => {
		sidebarPanel && sidebarPanel.setAttribute("data-qubely-tab", defaultTab);
	}, [defaultTab]);

	const _onTabChange = (tab) => {
		setCurrentTab(tab);
		sidebarPanel && sidebarPanel.setAttribute("data-qubely-tab", tab);
	};

	return (
		<Fragment>
			<div className={"qubely-inspector-tabs-container"}>
				{/*
				 * The tabs is static, you must use layout, style & advance
				 */}
				<div
					ref={tabContainer}
					className={classnames(
						"qubely-inspector-tabs",
						"qubely-inspector-tabs-count-" + tabs.length,
						currentTab
					)}
				>
					{tabs.indexOf(STYLE) > -1 && (
						<Tooltip text={__("Style")}>
							<button
								className={classnames({
									"qubely-active": currentTab === STYLE,
								})}
								onClick={() => _onTabChange(STYLE)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="21">
									<g fill="#565D66" fillRule="nonzero">
										<path d="M15.12 12.091a.814.814 0 00-.68-.378.814.814 0 00-.68.378c-.531.863-2.252 3.807-2.252 5.09 0 1.598 1.317 2.901 2.932 2.901s2.933-1.303 2.933-2.902c0-1.303-1.722-4.226-2.253-5.089zm-1.041 3.828c-.043.063-.744 1.198-.213 1.976a.52.52 0 01.064.358.409.409 0 01-.191.294.608.608 0 01-.255.084.476.476 0 01-.383-.21c-.871-1.283.149-2.902.192-2.986a.517.517 0 01.297-.21.534.534 0 01.361.063c.192.126.255.42.128.63zM13.314 10.388l1.36-.147c.446-.042.807-.337.935-.736.127-.4.042-.862-.276-1.157L7.258.294c-.255-.252-.68-.252-.957 0a.68.68 0 000 .947l.34.336-5.1 5.047C.82 7.339.5 8.348.67 9.379c.128.652.489 1.24.956 1.703l3.082 3.05c.467.462 1.062.82 1.72.946a3.134 3.134 0 002.785-.863l3.612-3.575a.74.74 0 01.489-.252zM7.576 2.502l5.759 5.7H2.073c.085-.232.212-.463.403-.653l5.1-5.047z" />
									</g>
								</svg>
								<h5>{__("Style")}</h5>
							</button>
						</Tooltip>
					)}

					{tabs.indexOf(ADVANCE) > -1 && (
						<Tooltip text={__("Advanced")}>
							<button
								className={classnames({
									"qubely-active": currentTab === ADVANCE,
								})}
								onClick={() => _onTabChange(ADVANCE)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
									<path
										fill="#565D66"
										fillRule="nonzero"
										d="M15.666 6.325c-.277-.05-.572-.082-.85-.115a6.385 6.385 0 00-.571-1.389c.18-.229.343-.457.523-.686a.994.994 0 00-.098-1.291l-.997-.997a.994.994 0 00-1.291-.098c-.23.163-.458.343-.687.523a6.954 6.954 0 00-1.39-.589c-.032-.277-.08-.572-.113-.85A.987.987 0 009.21 0H7.805a1 1 0 00-.98.834c-.05.277-.082.572-.115.85-.474.13-.947.326-1.389.571-.229-.18-.457-.343-.686-.523a.994.994 0 00-1.291.098l-.997.997a.994.994 0 00-.098 1.291c.163.23.343.458.523.687a6.954 6.954 0 00-.589 1.39c-.277.032-.572.08-.85.113A.987.987 0 00.5 7.29v1.406a1 1 0 00.834.98c.277.05.572.082.85.115.13.474.326.947.571 1.389-.18.229-.343.457-.523.686a.994.994 0 00.098 1.291l.997.997a.994.994 0 001.291.098c.23-.163.458-.343.687-.523.441.245.899.442 1.39.589.032.294.08.572.113.85.066.473.49.833.981.833h1.406a1 1 0 00.98-.834c.05-.277.082-.572.115-.85.474-.13.947-.326 1.389-.571.229.18.457.343.686.523a.994.994 0 001.291-.098l.997-.997a.994.994 0 00.098-1.291 19.095 19.095 0 00-.523-.687c.245-.441.442-.899.589-1.39.277-.032.572-.08.85-.113a.987.987 0 00.833-.981V7.305a1 1 0 00-.834-.98zM8.492 11.57a3.571 3.571 0 01-3.563-3.563 3.571 3.571 0 013.563-3.563 3.571 3.571 0 013.563 3.563 3.571 3.571 0 01-3.563 3.563z"
									/>
								</svg>
								<h5>{__("Advanced")}</h5>
							</button>
						</Tooltip>
					)}

					{tabs.indexOf(LAYOUT) > -1 && (
						<Tooltip text={__("Layout")}>
							<button
								className={classnames({
									"qubely-active": currentTab === LAYOUT,
								})}
								onClick={() => _onTabChange(LAYOUT)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15">
									<path
										fill="#565D66"
										fillRule="nonzero"
										d="M14.346 0H1.654C1.017 0 .5.517.5 1.154v12.692C.5 14.483 1.017 15 1.654 15h12.692c.637 0 1.154-.517 1.154-1.154V1.154C15.5.517 14.983 0 14.346 0zm-5.77 13.846v-5.77h5.77v5.77h-5.77z"
									/>
								</svg>
								<h5>{__("Layout")}</h5>
							</button>
						</Tooltip>
					)}
				</div>
			</div>
			{Array.isArray(children) &&
				Children.map(children, (child, index) => {
					if (!child.key) {
						throw new Error("props.key not found in <InspectorTab />, you must use `key` prop");
						return;
					}
					return cloneElement(child, {
						index,
						isActive: child.key === currentTab,
					});
				})}
		</Fragment>
	);
};

InspectorTabs.defaultProps = {
	defaultTab: null,
	tabs: ["style", "advance", "layout"],
};

export default InspectorTabs;
