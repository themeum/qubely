import { IntParser } from "./InteractionParser";
import RenderFields from "./RenderFields";
import { interactionActions } from "./InteractionData";
import isShallowEqual from "@wordpress/is-shallow-equal";
const { __ } = wp.i18n;
const { Component } = wp.element;

class Timeline extends Component {
	constructor(props) {
		super();
		this.state = {
			isActionList: false,
			timeline: false,
			initialAction: [
				{ id: "", name: "", keyframe: 0, timing_func: "", property: null },
				{ id: "", name: "", keyframe: 100, timing_func: "", property: null },
			],
			selectedActionIndex: null,
			coPosition: { x: 0, y: 0 },
			contextAxis: { x: 0, y: 0 },
			timeLineCoPosition: {
				linePosition: 0,
				percentage: 0,
				id: null,
				isVisible: false,
				index: null,
			},
			contextMenuVisible: null,
			isHoverAction: false,
			showTimelineActionList: false,

			enableAnimationNameField: false,
			currentAction: null,
			// Live scroll percetage
			scrollPercent: 0,
			timelineHeight: 0,
			addOnId: null,
			keyframeCounter: {},

			actionListDargIndex: null,
			actionListOverKeyframe: null,
			selectedDargAction: null,
			maskPosition: 0,
		};
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside.bind(this));
		const editorView = document.getElementsByClassName("edit-post-layout__content");
		if (editorView.length > 0) {
			editorView[0].addEventListener("scroll", this.handleScroll.bind(this), true);
		}
		this.renderAnimationActionList();
	}
	componentWillUnmount() {
		const editorView = document.getElementsByClassName("edit-post-layout__content");
		document.removeEventListener("mousedown", this.handleClickOutside.bind(this));
		if (editorView.length > 0) {
			editorView[0].removeEventListener("scroll", this.handleScroll.bind(this), false);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			!isShallowEqual(prevProps.actionList, this.props.actionList) ||
			prevState.selectedActionIndex !== this.state.selectedActionIndex ||
			prevState.contextMenuVisible !== this.state.contextMenuVisible ||
			prevState.actionListOverKeyframe !== this.state.actionListOverKeyframe
		) {
			this.renderAnimationActionList();
		}
	}

	handleScroll(event) {
		if (typeof this.timelineWrapper === "undefined" || this.timelineWrapper === null) {
			return false;
		}
		let element = document.getElementsByClassName(`qubely-block-${this.props.uniqueId}`);
		if (element.length > 0) {
			element = element[0].parentElement;
			let percentage = this.percentageSeen(element);
			let timelineHeight = this.timelineWrapper.getBoundingClientRect().height;
			if (percentage > -1 && percentage <= 100) {
				this.setState({ scrollPercent: percentage, timelineHeight });
			}
		}
	}

	percentageSeen(element) {
		let elementRect = element.getBoundingClientRect();
		let viewportHeight = document.body.offsetHeight,
			scrollTop = window.pageYOffset,
			elementOffsetTop = elementRect.top,
			elementHeight = elementRect.height;
		if (elementOffsetTop > scrollTop + viewportHeight) {
			return -1;
		} else if (elementOffsetTop + elementHeight < scrollTop) {
			return 101;
		} else {
			var distance = scrollTop + viewportHeight - elementOffsetTop;
			var percentage = distance / ((viewportHeight + elementHeight) / 100);
			return percentage > 100 ? 100 : percentage;
		}
	}

	handleClickOutside(event) {
		if (this.itemWrapper && !this.itemWrapper.contains(event.target) && this.state.contextMenuVisible !== null) {
			if (typeof this.contextMenuRoot !== "undefined" && !this.contextMenuRoot.contains(event.target)) {
				this.setState({ contextMenuVisible: null });
			}
		}
		if (this.actionListWrapper && !this.actionListWrapper.contains(event.target) && this.state.isActionList) {
			this.setState({ isActionList: false });
		}
	}

	// List fo the actions
	showActionList() {
		this.setState({ isActionList: !this.state.isActionList });
	}

	revisedRandId() {
		let S4 = () => {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return S4() + S4() + S4() + S4() + S4();
	}

	onMouseMoveAction(keyStart, keyEnd, id, index, event) {
		let trect = this.timelineWrapper.getBoundingClientRect();
		let rect = event.target.getBoundingClientRect();
		let yAxis = event.clientY - rect.top;
		let startFrom = parseInt(keyStart) - 1;
		let endTo = parseInt(keyEnd) + 1;
		let fullKeyFrame = startFrom + endTo - 1;
		let percentage = Math.floor((yAxis / rect.height) * startFrom) + endTo;
		let yyAxis = event.clientY - trect.top;
		let position = Math.abs((yyAxis / trect.height) * 100);

		let isVisible = !(fullKeyFrame + 1 === endTo);
		let timeLineCoPosition = {
			linePosition: position,
			percentage: percentage,
			id: id,
			isVisible,
			index: index,
		};
		this.setState({ timeLineCoPosition, isHoverAction: true });
	}

	// Select action for update
	onSelectAction(index) {
		let { actionList } = this.props;
		let currentAction = actionList[index];
		this.setState({
			selectedActionIndex: index,
			contextMenuVisible: null,
			currentAction,
			showTimelineActionList: false,
		});
		this.props.selectAction(currentAction);
	}

	onContextMenu(index, event) {
		event.preventDefault();
		let contextAxis = { x: event.clientX, y: event.clientY };
		this.setState({ contextMenuVisible: index, contextAxis, showTimelineActionList: false });
	}
	/*
	 * Need set the position with mouse position
	 */
	setContextMenuRoot(node) {
		this.contextMenuRoot = node;
	}

	_onDeleteItem(index) {
		let { actionList } = this.props;
		actionList.splice(index, 1);
		this.setState({ contextMenuVisible: null, selectedActionIndex: null });
		this.props.onChange(actionList);
	}

	_onDuplicateItem(index) {
		let { actionList } = this.props;
		let currentItem = JSON.parse(JSON.stringify(actionList[index]));
		let actionIndex = index + 1;
		currentItem.id = this.revisedRandId();
		actionList.splice(actionIndex, 0, currentItem);
		this.setState({
			currentAction: currentItem,
			contextMenuVisible: null,
			selectedActionIndex: actionIndex,
		});
		this.props.onChange(actionList);
	}

	//Context menu
	contextMenu(index) {
		const { contextAxis } = this.state;
		let trect = this.timelineWrapper.getBoundingClientRect();
		let position = contextAxis.x - trect.left;
		position = trect.width < position + 120 ? Math.abs(position - 120) : position;
		const style = { left: position + "px" };
		return (
			<div style={style} className="qubely-action-context-menu" ref={this.setContextMenuRoot.bind(this)}>
				<div className="qubely-action-content-menu-item" onClick={this._onDeleteItem.bind(this, index)}>
					{" "}
					<i className="fa fa-trash" /> Delete{" "}
				</div>
				<div className="qubely-action-content-menu-item" onClick={this._onDuplicateItem.bind(this, index)}>
					{" "}
					<i className="fa fa-clone" /> Duplicate{" "}
				</div>
			</div>
		);
	}

	onMouseDragStartOnActionList(index, event) {
		let trect = this.timelineWrapper.getBoundingClientRect();
		let yyAxis = event.clientY - trect.top;
		let position = Math.abs((yyAxis / trect.height) * 100);
		this.timeCounter = 0;
		this.onDragDelayTimer = setInterval(() => {
			this.updateDragAction(position, index);
			this.timeCounter = this.timeCounter + 1;
		}, 100);
	}

	updateDragAction(position, index) {
		if (this.timeCounter > 0) {
			clearInterval(this.onDragDelayTimer);
			this.timeCounter = 0;
			let { actionList } = this.props;
			this.setState({
				actionListDargIndex: index,
				selectedDargAction: actionList[index],
				maskPosition: position,
			});
		}
	}

	onMouseOverOnActionList(keyframe, event) {
		if (this.state.actionListDargIndex !== null) {
			this.setState({ actionListOverKeyframe: keyframe });
		}
	}

	onMouseOutOnActionList(event) {
		if (this.state.actionListOverKeyframe !== null) {
			this.setState({ actionListOverKeyframe: null });
		}
	}

	onMouseDragEndOnActionList(event) {
		let {
			actionListDargIndex,
			actionListOverKeyframe,
			timeLineCoPosition: { percentage },
		} = this.state;
		if (actionListDargIndex !== null) {
			if (actionListOverKeyframe !== null) {
				percentage = parseInt(actionListOverKeyframe);
			}
			const newActionList = JSON.parse(JSON.stringify(this.props.actionList));
			let newAction = Object.assign({}, newActionList[actionListDargIndex], { keyframe: percentage });
			newActionList[actionListDargIndex] = newAction;
			this.setState({
				actionListDargIndex: null,
				selectedDargAction: null,
				actionListOverKeyframe: null,
				selectedActionIndex: actionListDargIndex,
				currentAction: newAction,
			});
			this.props.onChange(newActionList);
		}
		if (this.onDragDelayTimer) {
			clearInterval(this.onDragDelayTimer);
		}
	}

	onMouseMoveOnTimeline(event) {
		let { actionListDargIndex } = this.state;
		if (actionListDargIndex === null) return;
		let trect = this.timelineWrapper.getBoundingClientRect();
		let yyAxis = event.clientY - trect.top;
		let position = Math.abs((yyAxis / trect.height) * 100);
		this.setState({ maskPosition: position });
	}

	// Created action lists
	actionItemHtml(action, index) {
		let { selectedActionIndex, contextMenuVisible, currentAction } = this.state;

		let activeClass = selectedActionIndex === index ? "qubely-action-active" : "";
		activeClass = contextMenuVisible === index ? activeClass + " qubely-action-context-menu-active" : activeClass;
		activeClass = action.id === "" ? activeClass + " qubely-action-empty-box" : activeClass;
		let similarAction =
			currentAction !== null && selectedActionIndex !== index && action.name === currentAction.name
				? "qubely-action-similar"
				: "";
		return (
			<div
				key={index}
				className={`qubely-action-item ${activeClass} ${similarAction}`}
				ref={(ref) => {
					this.itemWrapper = ref;
				}}
				onMouseDown={this.onMouseDragStartOnActionList.bind(this, index)}
			>
				<div className="qubely-action-item-inner">
					<div className="qubely-action-pointer-range">
						<div className="qubely-connect-line"></div>
						<div className="qubely-point-bullet">&nbsp;</div>
						<div className="qubely-point-range">{action.keyframe}%</div>
					</div>
					<div
						className={`qubely-action-property`}
						onClick={this.onSelectAction.bind(this, index)}
						onContextMenu={this.onContextMenu.bind(this, index)}
					>
						{action.name}
					</div>
				</div>
				{contextMenuVisible === index && this.contextMenu(index)}
			</div>
		);
	}

	parentItemHtml(actions, ci) {
		const mouseOverClass =
			actions.keyframe === this.state.actionListOverKeyframe ? "qubley-action-mouse-on-item" : "";
		return (
			<div
				className={`qubely-parent-item-container ${mouseOverClass}`}
				key={ci}
				onMouseEnter={this.onMouseOverOnActionList.bind(this, actions.keyframe)}
				onMouseLeave={this.onMouseOutOnActionList.bind(this)}
			>
				{actions.map((action) => {
					return this.actionItemHtml(action, action.index);
				})}
			</div>
		);
	}

	actionBlankSpaceHtml(keyFrame, lastKeyframe, id, index) {
		let style = {
			flexGrow: keyFrame / 100,
		};
		if (keyFrame === 0) style.padding = 0;
		return (
			<div
				key={this.revisedRandId()}
				className="qubely-action-item-blank-space"
				onMouseMove={this.onMouseMoveAction.bind(this, keyFrame, lastKeyframe, id, index)}
				style={style}
			></div>
		);
	}

	renderAnimationActionList() {
		let { actionList } = this.props;
		let htmlView = [];
		let collection = {};
		let lastKeyframe = 0;
		let checkSingleEntry = {};

		if (actionList.length > 0) {
			actionList.map((action, index) => {
				//Check if action not add second time
				if (typeof checkSingleEntry[action.name] === "undefined") {
					action.single = true;
					checkSingleEntry[action.name] = action.keyframe;
				} else {
					delete action.single;
				}

				if (typeof collection[action.keyframe] !== "undefined") {
					action.index = index;
					collection[action.keyframe].push(action);
				} else {
					action.index = index;
					collection[action.keyframe] = [action];
					collection[action.keyframe].keyframe = action.keyframe;
					collection[action.keyframe].index = index;
				}
			});

			_.map(collection, (actions, ci) => {
				let keyDiff = Math.abs(lastKeyframe - actions.keyframe);
				htmlView.push(this.actionBlankSpaceHtml(keyDiff, lastKeyframe, ci, actions.index));
				htmlView.push(this.parentItemHtml(actions, ci));
				lastKeyframe = actions.keyframe;
			});
			if (lastKeyframe !== 100) {
				let keyDiff = Math.abs(lastKeyframe - 100);
				htmlView.push(
					this.actionBlankSpaceHtml(keyDiff, lastKeyframe, this.revisedRandId(), actionList.length)
				);
			}
		} else {
			this.state.initialAction.map((action) => {
				let keyframeDiff = Math.abs(lastKeyframe - action.keyframe);
				if (lastKeyframe !== action.keyframe) {
					htmlView.push(this.actionBlankSpaceHtml(keyframeDiff, lastKeyframe, this.revisedRandId(), 0));
					htmlView.push(this.actionItemHtml(action, this.revisedRandId()));
				} else {
					htmlView.push(this.actionItemHtml(action, this.revisedRandId()));
				}
				lastKeyframe = action.keyframe;
			});
		}
		this.setState({ renderHtmlActionlist: htmlView });
	}

	//Create timeline action
	createAction(action, rowIndex) {
		let { actionList } = this.props;
		let actionIndex = actionList.length;
		let newAction = Object.assign({}, action, { id: this.revisedRandId(), keyframe: 0 });

		if (this.state.isActionList) {
			actionList.push(newAction);
			let lastAction = JSON.parse(JSON.stringify(newAction));
			lastAction.keyframe = 100;
			lastAction.id = this.revisedRandId();
			actionList.push(lastAction);
		} else {
			if (rowIndex !== null) {
				let {
					timeLineCoPosition: { percentage },
				} = this.state;
				actionIndex = rowIndex;
				newAction.keyframe = percentage;
				actionList.splice(rowIndex, 0, newAction);
			} else {
				actionList.splice(actionList.length - 1, 0, newAction);
			}
		}
		this.setState({
			currentAction: newAction,
			isActionList: false,
			selectedActionIndex: actionIndex,
			showTimelineActionList: false,
		});
		this.props.onChange(actionList);
	}

	// Action List
	renderAnimationActions(rowIndex = null) {
		return (
			<div className="qubely-animation-action-option-box" ref={(ref) => (this.actionListWrapper = ref)}>
				<div className="qubely-animation-action-option-lists">
					{interactionActions.map((action, index) => (
						<div
							key={index}
							onClick={this.createAction.bind(this, action, rowIndex)}
							className="qubely-animation-action-option-item"
						>
							{action.name}
						</div>
					))}
				</div>
			</div>
		);
	}

	showAnimationAction() {
		this.setState({ showTimelineActionList: !this.state.showTimelineActionList });
	}
	enableEverything() {
		this.setState({ showTimelineActionList: !this.state.showTimelineActionList });
	}

	_changeProperty(property) {
		let { selectedActionIndex } = this.state;
		let { actionList } = this.props;
		const newActionList = JSON.parse(JSON.stringify(actionList));
		let newAction = Object.assign({}, newActionList[selectedActionIndex], { ...property });
		newActionList[selectedActionIndex] = newAction;
		this.props.onChange(newActionList);
		this.setState({ currentAction: newAction });
	}

	/**
	 * Render timeline view
	 */
	timeline() {
		const { actionList, transformOrigin } = this.props;
		let {
			selectedActionIndex,
			currentAction,
			timeLineCoPosition: { linePosition, percentage, index, isVisible },
			showTimelineActionList,
			scrollPercent,
			timelineHeight,
			maskPosition,
			actionListDargIndex,
			selectedDargAction,
		} = this.state;
		let timelineEmptyClass = actionList.length > 0 ? "qubely-timeline-has-no-memory" : "";
		let pointerStyle = { top: `${linePosition}%` };

		const showPerc = (timelineHeight * scrollPercent) / 100;
		const liveStyle = { top: showPerc + "px" };
		let maskStyle = { top: `${maskPosition}%` };
		if (actionList.length > 0) {
			let cssProps = IntParser.parseScrollAction(actionList, this.state.scrollPercent, transformOrigin);
			$(`.qubely-block-${this.props.uniqueId}`).addClass("qubely-block-interaction").css(cssProps);
		}
		return (
			<div className="qubely-animation-timeline-container">
				<div className="qubely-animation-view">
					<div className="qubely-animation-trigger-header">
						<label> Scroll Action </label>
						<span className="qubely-add-animation-action-btn" onClick={this.showActionList.bind(this)}>
							﹢
						</span>
						{this.state.isActionList && this.renderAnimationActions()}
					</div>
					<div className="qubely-animation-flexible-area">
						<div
							className={`qubely-animation-flexible-area-inner-box ${timelineEmptyClass}`}
							ref={(node) => {
								this.timelineWrapper = node;
							}}
							onMouseMove={this.onMouseMoveOnTimeline.bind(this)}
							onMouseUp={this.onMouseDragEndOnActionList.bind(this)}
							onMouseLeave={this.onMouseDragEndOnActionList.bind(this)}
						>
							<div
								className="qubely-animation-timline-bar"
								ref={(ref) => (this.timeLineBarWrapper = ref)}
							/>

							{/* <div className="qubely-timeline-live-action-bar" style={liveStyle}><div className="qubely-inner-arrow"/></div> */}

							{this.state.renderHtmlActionlist}

							{actionListDargIndex !== null && (
								<div className="qubely-action-drag-mask" style={maskStyle}>
									<div className="qubely-action-mask-peroperty">
										<span className="qubely-action-percentage"> {percentage}% </span>
										<span className="qubely-action-title"> {selectedDargAction.title} </span>
									</div>
								</div>
							)}

							{isVisible && actionList.length > 0 && (
								<div
									style={pointerStyle}
									className="qubely-timeline-pointer-hr-line"
									onClick={this.showAnimationAction.bind(this)}
								>
									<div className="qubely-action-item-pointer">
										<span> {percentage}% </span>
									</div>
									<div className="qubely-action-item-pointer-icon">
										<span>+</span>
									</div>
									<div className="qubely-action-item-line-hr-container" />
									{showTimelineActionList && this.renderAnimationActions(index)}
								</div>
							)}
							{actionList.length === 0 && (
								<div className={`qubely-animation-timeline-placeholder`}>
									<div className={`qubely-animation-timeline-placeholder-text`}>
										<i className="fa fa-send" />
										<h3 className="qubely-timeline-placeholder-title"> Animation </h3>
										<p>
											{" "}
											Apply various actions on one or multiple elements to create a sequenced
											animation.{" "}
										</p>
										{/* <a href="#" className="qubely-timeline-tutorial-button"> <i className="fa fa-video-camera"/> Video Tutorial </a> */}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="qubely-animation-controller-view">
					<div className="qubely-animation-controller-header">
						<label>
							<span className="fa fa-gear" /> Interaction Settings{" "}
						</label>
					</div>
					<div className="qubely-animation-controller-body">
						{this.state.selectedActionIndex === null && (
							<div className={`qubely-animation-timeline-placeholder`}>
								<div className={`qubely-animation-timeline-placeholder-text`}>
									<h3 className="qubely-timeline-placeholder-title"> No Action Selected </h3>
									<p> Select an action in the list to adjust the settings. </p>
								</div>
							</div>
						)}
						{this.state.selectedActionIndex !== null && (
							<RenderFields fields={currentAction} onChange={(value) => this._changeProperty(value)} />
						)}
					</div>
				</div>
			</div>
		);
	}
	render() {
		return this.timeline();
	}
}

export default Timeline;
