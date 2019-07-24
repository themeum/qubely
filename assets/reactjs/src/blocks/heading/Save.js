const { Fragment, Component } = wp.element;
const { RichText } = wp.editor
import svg from '../heading/separators';
import { animationAttr } from '../../components/HelperFunction'

class Save extends Component {

    render() {
        const { uniqueId, content, selector, separatorStyle, separatorPosition, subHeading, subHeadingLevel, subHeadingContent, subHeadingPosition, animation } = this.props.attributes

        const separators = {
            solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
            double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
            dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
            dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
            pin: { type: 'svg', separator: 'pin', svg: svg['pin'], width: 100, stroke: 0 },
            pin_filled: { type: 'svg', separator: 'pin_filled', svg: svg['pin_filled'], width: 100, stroke: 0 },
            zigzag: { type: 'svg', separator: 'zigzag', svg: svg['zigzag'], style: 'fill', width: 88, stroke: 5 },
            zigzag_large: { type: 'svg', separator: 'zigzag_large', svg: svg['zigzag_large'], style: 'fill', width: 161, stroke: 5 },
        }

        const renderSeparators = <Fragment>
            {separatorStyle &&
                <Fragment>
                    {separators[separatorStyle].type == 'css' &&
                        <span className={`qubely-separator-type-css qubely-separator-${separatorStyle}`}></span>
                    }
                    {separators[separatorStyle].type == 'svg' &&
                        <span className={`qubely-separator-type-svg qubely-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                    }
                </Fragment>
            }
        </Fragment>

        const subSubTagName = 'h' + subHeadingLevel;

        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)} >
                <div className={`qubely-block-heading ${separatorStyle ? 'qubely-has-separator qubely-separator-position-' + separatorPosition : ''}`}>
                    {(subHeading && subHeadingPosition == 'before_title') &&
                        <RichText.Content tagName={subSubTagName} className="qubely-sub-heading-selector" value={subHeadingContent} />
                    }
                    <div className="qubely-heading-container">
                        {separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? <div className="qubely-separator qubely-separator-before">{renderSeparators}</div> : ''}
                        <RichText.Content tagName={selector} className="qubely-heading-selector" value={content} />
                        {separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? <div className="qubely-separator qubely-separator-after">{renderSeparators}</div> : ''}
                    </div>
                    {(subHeading && subHeadingPosition == 'after_title') &&
                        <RichText.Content tagName={subSubTagName} className="qubely-sub-heading-selector" value={subHeadingContent} />
                    }
                </div>
            </div>
        )
    }
}
export default Save