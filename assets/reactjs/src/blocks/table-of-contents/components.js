import { generateAnchor } from '../../components/HelperFunction';

const { Fragment, Component } = wp.element;
const { select, subscribe } = wp.data;
const { __ } = wp.i18n;

class TableOfContents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headers: props.headers,
			unsubscribe: null,
		};
	}

	getHeadings = (headings = [], type = 'default') => {
		if (type === 'default')
			return headings.filter((heading) => heading.level !== undefined);
		return headings.filter((heading) => heading.level === undefined);
	};

	componentDidMount() {
		const getAllChildHeadingBlocks = (parentBlock) => {
			let childs = [];
			parentBlock.innerBlocks.forEach((childBlock) => {
				if (
					childBlock.name === 'core/heading' ||
					childBlock.name === 'qubely/heading' ||
					childBlock.name === 'qubely/text'
				) {
					childs.push(childBlock);
				}
				if (childBlock.innerBlocks.length > 0) {
					childs.push(...getAllChildHeadingBlocks(childBlock));
				}
			});
			return childs;
		};
		const getsHeadingBlocks = () => {
			let targetBlocks = [];
			const allBlocks = select('core/block-editor').getBlocks();
			allBlocks.forEach((block) => {
				if (
					block.name === 'core/heading' ||
					block.name === 'qubely/heading' ||
					block.name === 'qubely/text'
				) {
					targetBlocks.push(block);
				} else if (block.innerBlocks.length > 0) {
					let childHeadingBlocks = getAllChildHeadingBlocks(block);
					if (childHeadingBlocks.length > 0) {
						targetBlocks.push(...childHeadingBlocks);
					}
				}
			});
			return targetBlocks;
		};

		const setHeaders = () => {
			const headings = getsHeadingBlocks().map((header) => header.attributes);
			const advancedHeadings = this.getHeadings(headings, 'advanced');
			const simpleHeadings = this.getHeadings(headings);

			simpleHeadings.forEach((heading, key) => {
				if (!heading.anchor) {
					heading.anchor = generateAnchor(heading.content, `${key + 1}`);
				}
			});

			advancedHeadings.forEach((heading, key) => {
				if (!heading.anchor) {
					heading.anchor = generateAnchor(heading.title, `${key + 1}`);
				}
			});

			if (JSON.stringify(headings) !== JSON.stringify(this.state.headers)) {
				this.setState({ headers: headings });
			}
		};

		setHeaders();

		const unsubscribe = subscribe((_) => setHeaders());
		this.setState({ unsubscribe });
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify(prevProps.headers) !== JSON.stringify(prevState.headers)
		) {
			this.props.blockProp.setAttributes({
				headerLinks: JSON.stringify(this.state.headers),
			});
		}
	}
	componentWillUnmount() {
		this.state.unsubscribe();
	}
	render() {
		const { headers } = this.state;
		const { tableType, allowedAnchors } = this.props.blockProp.attributes;
		let ListTag = 'ul';
		if (tableType === 'ordered') {
			ListTag = 'ol';
		}
		if (headers.length === 0) {
			return <div className="qubely-message">{__('No header found')}</div>;
		}

		const createHierarchy = (formattedHeaders, currentHeader) => {
			let lastIndex = formattedHeaders.length - 1;
			if (
				formattedHeaders.length === 0 ||
				formattedHeaders[0].level === currentHeader.level
			) {
				formattedHeaders.push(Object.assign({}, currentHeader));
			} else if (formattedHeaders[lastIndex].level < currentHeader.level) {
				if (!formattedHeaders[lastIndex].children) {
					formattedHeaders[lastIndex].children = [
						Object.assign({}, currentHeader),
					];
				} else
					createHierarchy(formattedHeaders[lastIndex].children, currentHeader);
			}
		};

		const formatHeaders = (allHeaders) => {
			let formattedHeaders2 = [];
			allHeaders
				.filter((header) => allowedAnchors[`h${header.level}`])
				.forEach((header) => createHierarchy(formattedHeaders2, header));

			return formattedHeaders2;
		};

		const formatHeadersAdvanced = (allHeaders) => {
			let formattedAdvancedHeaders = [];
			allHeaders.forEach((header) => {
				if (header.subTitle) {
					header.children = [
						{
							anchor: generateAnchor(header.subTitleContent),
							title: header.subTitleContent,
						},
					];
				}
				formattedAdvancedHeaders.push(header);
			});

			return formattedAdvancedHeaders;
		};

		const parseList = (list, listType = 'default') => {
			if (listType === 'advanced') {
				return list.map((item) => (
					<li key={item.anchor}>
						<a href={`#${item.anchor}`}>
							{item.title.replace(/(<.+?>)/g, '')}
						</a>
						{item.children && (
							<ListTag className="child-list">
								{parseList(item.children, listType)}
							</ListTag>
						)}
					</li>
				));
			} else {
				return list.map((item) => (
					<li key={item.anchor}>
						<a href={`#${item.anchor}`}>
							{item.content.replace(/(<.+?>)/g, '')}
						</a>
						{item.children && (
							<ListTag className="child-list">
								{parseList(item.children, listType)}
							</ListTag>
						)}
					</li>
				));
			}
		};

		return (
			<ListTag className={`${tableType}-list`}>
				{[
					...parseList(formatHeaders(this.getHeadings(headers))),
					...parseList(
						formatHeadersAdvanced(this.getHeadings(headers, 'advanced')),
						'advanced',
					),
				]}
			</ListTag>
		);
	}
}

export { TableOfContents };
