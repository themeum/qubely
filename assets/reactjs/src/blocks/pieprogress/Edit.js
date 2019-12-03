import React, {Fragment} from 'react'
import Progress from './Progress'
const {RichText} = wp.editor
const Edit = (props) => {
    const {className, attributes, setAttributes} = props
    return (
        <Fragment>
            <Progress size={120} />
            <RichText
                tagName='h2'
                className={className}
                value={attributes.content}
                onChange={(content) => setAttributes({content})}
            />
        </Fragment>
    )
}

export default Edit
