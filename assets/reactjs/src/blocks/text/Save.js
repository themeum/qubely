const { Fragment, Component } = wp.element;
const { RichText } = wp.blockEditor;
import svg from '../heading/separators';
const {
	HelperFunction: { animationAttr, IsInteraction },
} = wp.qubelyComponents;
class Save extends Component {
	render() {
		const separators = {
			solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
			double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
			dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
			dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
			pin: {
				type: 'svg',
				separator: 'pin',
				svg: svg['pin'],
				width: 100,
				stroke: 0,
			},
			pin_filled: {
				type: 'svg',
				separator: 'pin_filled',
				svg: svg['pin_filled'],
				width: 100,
				stroke: 0,
			},
			zigzag: {
				type: 'svg',
				separator: 'zigzag',
				svg: svg['zigzag'],
				style: 'fill',
				width: 88,
				stroke: 5,
			},
			zigzag_large: {
				type: 'svg',
				separator: 'zigzag_large',
				svg: svg['zigzag_large'],
				style: 'fill',
				width: 161,
				stroke: 5,
			},
		};

		const {
			uniqueId,
			content,
			selector,
			dropCap,
			enableTitle,
			titleLevel,
			subTitleLevel,
			separatorStyle,
			separatorPosition,
			title,
			subTitle,
			subTitleContent,
			animation,
			interaction,
			anchor,
		} = this.props.attributes;
		const titleTagName = 'h' + titleLevel;
		const subTitleTagName = 'h' + subTitleLevel;
		const interactionClass = IsInteraction(interaction)
			? 'qubley-block-interaction'
			: '';

		const renderSeparators = (
			<Fragment>
				{separatorStyle && (
					<Fragment>
						{separators[separatorStyle].type == 'css' && (
							<span
								className={`qubely-separator-type-css qubely-separator-${separatorStyle}`}
							/>
						)}
						{separators[separatorStyle].type == 'svg' && (
							<span
								className={`qubely-separator-type-svg qubely-separator-${separatorStyle}`}
							>
								{separators[separatorStyle].svg}
							</span>
						)}
					</Fragment>
				)}
			</Fragment>
		);
		return (
			<div
				className={`qubely-block-${uniqueId}`}
				id={anchor}
				{...animationAttr(animation)}
			>
				<div
					className={`qubely-block-text ${interactionClass} ${
						dropCap == 1 ? 'qubely-has-drop-cap' : ''
					}`}
				>
					{enableTitle == 1 && (
						<div
							className={`qubely-block-text-title-container ${
								separatorStyle ? 'qubely-has-separator' : ''
							} ${
								separatorPosition
									? 'qubely-separator-position-' + separatorPosition
									: ''
							}`}
						>
							<div className="qubely-block-text-title-inner">
								{separatorStyle &&
								(separatorPosition == 'left' ||
									separatorPosition == 'top' ||
									separatorPosition == 'leftright') ? (
									<div className="qubely-separator qubely-separator-before">
										{renderSeparators}
									</div>
								) : (
									''
								)}
								<RichText.Content
									tagName={titleTagName}
									className="qubely-block-text-title"
									value={title}
								/>
								{separatorStyle != '' &&
								(separatorPosition == 'right' ||
									separatorPosition == 'bottom' ||
									separatorPosition == 'leftright') ? (
									<div className="qubely-separator qubely-separator-after">
										{renderSeparators}
									</div>
								) : (
									''
								)}
							</div>

							{subTitle == 1 && (
								<div
									className="qubely-block-text-sub-title-container"
									onClick={() => this.handlePanelOpenings('Sub Title')}
								>
									<RichText.Content
										tagName={subTitleTagName}
										className="qubely-block-text-sub-title"
										value={subTitleContent}
									/>
								</div>
							)}
						</div>
					)}

					<RichText.Content tagName={selector} value={content} />
				</div>
			</div>
		);
	}
}
export default Save;
