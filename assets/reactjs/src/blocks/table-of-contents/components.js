const {
    Fragment,
    Component
} = wp.element;
const { select, subscribe } = wp.data;
const { __ } = wp.i18n;

class TableOfContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers,
            unsubscribe: null
        };
    }

    componentDidMount() {
        const getsHeadingBlocks = () => {
            let targetBlocks = [];
            const allBlocks = select('core/block-editor').getBlocks();
            allBlocks.forEach(block => {
                if (block.name === 'core/heading' || block.name === 'qubely/heading' || block.name === 'qubely/text') {
                    targetBlocks.push(block.attributes);
                } else if (block.innerBlocks.length > 0) {
                    let childHeadingBlocks = getAllChildHeadingBlocks(block);
                    if (childHeadingBlocks.length > 0) {
                        targetBlocks.push(...childHeadingBlocks);
                    }
                }
            })
            return targetBlocks;
        };
        const getAllChildHeadingBlocks = (parentBlock) => {
            let childs = [];
            parentBlock.innerBlocks.forEach(childBlock => {
                if (childBlock.name === 'core/heading' || childBlock.name === 'qubely/heading' || childBlock.name === 'qubely/text') {
                    childs.push(childBlock.attributes);
                }
                if (childBlock.innerBlocks.length > 0) {
                    childs.push(...getAllChildHeadingBlocks(childBlock));
                }
            });
            return childs;
        };

        const setHeaders = () => {
            let headings = getsHeadingBlocks();
            headings.forEach((heading, key) => {
                heading.anchor =
                    key +
                    "-" +
                    heading.content
                        .toString()
                        .toLowerCase()
                        .replace(/( |<.+?>|&nbsp;)/g, "-");
                heading.anchor = encodeURIComponent(
                    heading.anchor.replace(
                        /[^\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s-]/g,
                        ""
                    )
                );
            });
            console.log('headings : ', headings)
            // if (!wp.isShallowEqual(headings, this.state.headers)) {
            // this.setState({ headers: headings });
            // }
        };

        setHeaders();

        const unsubscribe = subscribe(_ => setHeaders());
        this.setState({ unsubscribe });
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.headers) !== JSON.stringify(prevState.headers)) {
            this.props.blockProp.setAttributes({
                links: JSON.stringify(this.state.headers)
            });
        }
    }
    componentWillUnmount() {
        this.state.unsubscribe();
    }
    render() {
        const { headers } = this.state;
        let listStyle = 'numbered'
        if (headers.length === 0) {
            return (
                <div className="qubely-message">
                    {__("No header found, Please add headers before generating Table of Contents")}
                </div>
            );
        }

        const createHierarchy = (formattedHeaders, currentHeader) => {
            let lastIndex = formattedHeaders.length - 1;

            if (formattedHeaders.length === 0 || formattedHeaders[0].level === currentHeader.level) {
                formattedHeaders.push(currentHeader);
            } else if (formattedHeaders[lastIndex].level < currentHeader.level) {
                if (!formattedHeaders[lastIndex].children) {
                    formattedHeaders[lastIndex].children = [currentHeader];
                } else {
                    createHierarchy(formattedHeaders[lastIndex].children, currentHeader);
                }
            }
        }
        const formatHeaders = allHeaders => {
            let formattedHeaders = [];
            allHeaders.forEach(header => createHierarchy(formattedHeaders, header));
            console.log('qubely : ', formattedHeaders);
            return formattedHeaders;
        };

        const parseList = list =>
            list.map(item => (
                <li>
                    <a
                        href={`#${item.anchor}`}
                        dangerouslySetInnerHTML={{
                            __html: item.content.replace(/(<.+?>)/g, "")
                        }}
                    />
                    {item.children &&
                        (listStyle === "numbered" ? (
                            <ol>{parseList(item.children)}</ol>
                        ) : (
                                <ul
                                    style={{
                                        listStyle: listStyle === "plain" ? "none" : null
                                    }}
                                >
                                    {parseList(item.children)}
                                </ul>
                            ))}
                </li>
            ));
        return (
            <div className="qubely-table-of-contents-wrapper">
                <ul className="qubely-table-of-contents qubely-unordered-list">
                    {parseList(formatHeaders(headers))}
                </ul>
            </div>
        );
    }
}


export { TableOfContents };