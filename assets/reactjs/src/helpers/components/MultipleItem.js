const {__} = wp.i18n
export default (props) => {

    return (
        <div className="qubely-multiple-template-box">
            <div className="multiple-template-view" onClick={ () => props.onClickSingleEntity( props.data.ID ) } >
                <div className="qubely-default-template-image"><img alt={__('Default template')} src={props.backgroundImage(props.data.image)} srcSet={props.backgroundImage(props.data.image)+ ' 2x'}/>
                { props.data.pro &&
                    <span className="qubely-pro"> {__('Pro')} </span>
                }</div>
                <div className="qubely-tmpl-info">
                    <h5 className="qubely-tmpl-title" dangerouslySetInnerHTML={{__html:props.data.name}}/>
                    <span className="qubely-temp-count">{ props.totalLayouts } {__('Layouts')}</span>
                </div>
            </div>
        </div>
    )
}

