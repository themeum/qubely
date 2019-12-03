import React from 'react'
const {Content} = wp.editor.RichText
const Save = (props) => {
    const {attributes} = props
    return (
        <Content
            tagName='h2'
            value={ attributes.content }
        />
    )
}

export default Save
