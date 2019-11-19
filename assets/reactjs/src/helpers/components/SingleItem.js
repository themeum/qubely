const {__} = wp.i18n
const { Fragment } = wp.element;

export default (props) => {
    return (
        <div id={(props.index==0) ? 'first-single-item' : ''} className={ 'qubely-single-block-item ' + (( props.types == 'inactive' && props.data.pro == true ) ? 'inactive' : '') }>
            <div className="qubely-single-item-inner">
                <div className="qubely-default-template-image">
                    <img className="lazy" alt={__('Lazy Loading')} src={ qubely_admin.plugin+'assets/img/image-loader.gif'} data-src={props.backgroundImage(props.data.image)} />
                    { props.data.pro && <span className="qubely-pro">{__('Pro')}</span> }
                </div>{/* qubely-default-template-image */}
                <div className="qubely-tmpl-info">
                    <div className="qubely-import-button-group">
                        { props.itemType != 'comming' ?
                            <Fragment>
                                { props.data.liveurl && <a className="qubely-button" target="_blank" href={props.data.liveurl}><i className="fa fa-share"/> {__('Preview')} </a> }
                                { (props.types == 'inactive' && props.data.pro == true) ? 
                                    <a className="qubely-button-download" target="_blank" href="https://www.themeum.com/product/qubely/">
                                        <i className="fas fa-upload"/> {__('Upgrade to Pro')}
                                    </a>
                                    :    
                                    <a className="qubely-button qubely-button-download" onClick={(e) => { props.importLayoutBlock( props.data, props.data.pro ) } }> 
                                        { props.spinner == props.data.ID ? <i className="fas fa-spinner fa-pulse"/> : <i className="fas fa-download"/>}{__('Import')} 
                                    </a>
                                }
                            </Fragment>
                            :
                            <div className="qubely-coming-soon" style={{color:'#ffffff'}}>{__('Coming Soon.')}</div>
                        }
                    </div>{/* qubely-import-button-group */}
                </div>{/* qubely-tmpl-info */}
            </div>{/* qubely-single-item-inner */}
            <h4 className="qubely-tmpl-title" dangerouslySetInnerHTML={{__html:props.data.name}}/>
        </div>
    )
}