const {
    Fragment,
    Component
} = wp.element;
const { select } = wp.data;
const { __ } = wp.i18n;

class TableOfContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers || []
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

            if (!wp.isShallowEqual(headings, this.state.headers)) {
                this.setState({ headers: headings });
            }
        };

        setHeaders();
    }

    createHierarchy = () => {

    }
    render() {
        const { headers } = this.state;
        if (headers.length === 0) {
            return (
                <div className="qubely-message">
                    {__("No header found, Please add headers before generating Table of Contents")}
                </div>
            );
        }

        console.log(this.createHierarchy())
        return (
            <div className="qubely-table-of-contents-wrapper">
                <ul className="qubely-table-of-contents qubely-unordered-list">
                    {
                        headers.map(({ content, anchor, level }, index) => {
                            return (
                                <li className="item" key={anchor}>
                                    <a
                                        href={`#${anchor}`}
                                        dangerouslySetInnerHTML={{
                                            __html: content.replace(
                                                /(<a.+?>|<\/a>)/g,
                                                ''
                                            )
                                        }}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}


export { TableOfContents };