const {__} = wp.i18n
export default (props) => {

    return (
        <div>
            <div className="qubely-reusable-list-content">
                <span className="qubely-tmpl-title" dangerouslySetInnerHTML={ { __html:props.data.post_title } }/>
            </div>
            <div className="qubely-reusable-list-info">
                <div className="qubely-reusable-list-info-date">16 Feb 2019 </div>
                <div className="qubely-reusable-list-button">
                    <button className="qubely-builder-btn qubely-btn-success" onClick={ (e) => { props.importSavedBlock( props.data ) } }>
                        <i className="fas fa-download"/>
                    </button>
                    <button className="qubely-builder-btn qubely-btn-success" onClick={ (e) => { props.deleteSavedBlock( props.index, props.data.ID ) } }>
                        <i className="fas fa-trash"/>
                    </button>
                </div>
            </div>

        </div>
    )
}