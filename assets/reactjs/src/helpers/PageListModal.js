const { compose } = wp.compose;
const { withDispatch } = wp.data;
const { Component } = wp.element
const { Spinner } = wp.components;
const { parse } = wp.blocks
const { apiFetch } = wp;
const {__} = wp.i18n
import { Modal, ModalManager } from './ModalManager'
import SingleItem from './components/SingleItem'
import MultipleItem from './components/MultipleItem'
import ReusableBlockItem from './components/ReusableBlockItem'
import './PageLIstModal.scss'


class PageListModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            blockCategories: [],
            layoutCategories: [],
            layoutCategoryItems: {},
            selectedBlockCategory: '',
            selectedLayoutCategory: '',
            blockData: '',
            layoutData: '',
            savedBlocks: '',
            itemType: 'block',
            layer: 'single',
            searchContext:'',
            isSearchEnable: false,
            notFoundMessage: 'Sorry we couldn\'t find your match request!',
            requestFailedMsg: '',
            spinner: false,
            lazyloadThrottleTimeout: 0
        };
        this._lazyload = this._lazyload.bind(this);
    }

    componentDidMount() {

        this.setState( { loading: true } );
        let requestFailedMsg = [];
        
        const options = {
            method: 'POST',
            url: qubely_admin.ajax+'?action=qubely_get_blocks',
            headers: { 'Content-Type': 'application/json' }
        }
        apiFetch( options ).then( response => {

            if ( response.success ) {

                let blockCategories = [],
                    blockData = {};

                response.data.map( item => {
                    if( item.category ) {
                        item.category.map( cat => {
                            if( cat.slug in blockData ) {
                                blockData[ cat.slug ].push( item )
                            } else {
                                blockData[ cat.slug ] = [];
                                blockData[ cat.slug ].push( item )
                            }
                            let index = -1;
                            blockCategories.forEach( ( change, i ) => {
                                if ( cat.slug == change.slug ) {
                                    index = i
                                }
                            } );
                            if ( index === -1 ) {
                                blockCategories.push( { name: cat.name, slug: cat.slug } )
                            }
                        } )
                    }
                } );
                
                this.setState( {
                    loading: false,
                    blockCategories,
                    blockData
                } );

                let node = document.querySelector( '#modalContainer' );
                node.addEventListener( "scroll", this._lazyload, true );
                this._lazyload(); 

            } else {
                this.setState( {
                    loading: false, 
                    requestFailedMsg: response.data.message
                } );
            }
                
        } ).catch( error => {
            requestFailedMsg.push( error.code+' : '+error.message );
            this.setState({
                loading: false,
                requestFailedMsg
            } );
        } );
    }

    componentDidUpdate() {
        if( this.state.layer === 'single' ) {
            this._lazyload();
        }
    }

    componentWillUnmount() {
        let node = document.querySelector('#modalContainer');
        node.removeEventListener('scroll', this._lazyload);
    };

    getCurrentPageData() {
        let { itemType } = this.state;
        let pageData = ( itemType == 'block' ) ? this.state.blockData : this.state.layoutData;
        let pageCategories = ( itemType == 'block' ) ? this.state.blockCategories : this.state.layoutCategories;
        let selectedCategory = ( itemType == 'block' ) ? this.state.selectedBlockCategory : this.state.selectedLayoutCategory;
        let currentPageData = [];
        let tempDataID = [];

        if( this.state.layer === 'single' ) {
            if( this.state.parent_id ) { //if click from multiple entry
                for( let key in pageData ) {
                    pageData[ key ].map( value => {
                        if( value.parentID && this.state.parent_id === value.parentID  && ! (tempDataID.indexOf(value.ID) > -1 )  ) {
                            currentPageData.push( value );
                            tempDataID.push( value.ID );
                        }
                    })
                }
            } else {
                if( selectedCategory ) {
                    pageData[ selectedCategory ].map( value => {
                        if( itemType == 'block' ) {
                            if( !(tempDataID.indexOf(value.ID) > -1 )  ) {
                                currentPageData.push( value );
                                tempDataID.push(value.ID);
                            }
                        } else {
                            if( value.parentID  && ! (tempDataID.indexOf(value.ID) > -1 )  ) {
                                currentPageData.push( value );
                                tempDataID.push( value.ID );
                            }
                        }
                    } )
                } else {
                    for( let key in pageData ) {
                        pageData[ key ].map( value => {
                            if( itemType == 'block' ) {
                                if( !(tempDataID.indexOf(value.ID) > -1 )  ) {
                                    currentPageData.push( value );
                                    tempDataID.push(value.ID);
                                }
                            } else {
                                if( value.parentID  && ! (tempDataID.indexOf(value.ID) > -1 )  ) {
                                    currentPageData.push( value );
                                    tempDataID.push( value.ID );
                                }
                            }
                        })
                    }
                }
            }
        }

        if( this.state.layer === 'multiple' ) {
            if( selectedCategory ) {
                let itemCount = 0;
                pageData[ selectedCategory ].map( value => {

                    if( ! value.parentID   && ! (tempDataID.indexOf(value.ID) > -1 ) ) {
                        let found = value.category.find( item => item.slug == selectedCategory );
                        if( found ) {
                            tempDataID.push(value.ID);
                            currentPageData.push( value );
                        }
                    }
                })
            } else {
                for(let key in pageData) {
                    pageData[ key ].map( value => {
                        if( ! value.parentID && ! (tempDataID.indexOf(value.ID) > -1 )  ) {
                            currentPageData.push( value );
                            tempDataID.push(value.ID);
                        }
                    })
                }
            }
        }

        if( this.state.layer === 'block' ) {
            currentPageData = this.state.savedBlocks;
        }

        if( this.state.isSearchEnable && currentPageData.length > 0 ) {
            let filterData;
            if( this.state.layer === 'block' ) {
                filterData = currentPageData.filter( item => item.post_title.toLowerCase().search(this.state.searchContext.toLowerCase()) !== -1 );
            } else {
                filterData = currentPageData.filter( item => item.keyword.toLowerCase().search(this.state.searchContext.toLowerCase()) !== -1 );
            }
            return { pageCategories, selectedCategory, currentPageData: filterData }
        }
        return { pageCategories, selectedCategory, currentPageData }
    }

    deleteSavedBlock( index, blockID ) {
        let { savedBlocks } = this.state;
        let requestFailedMsg = [];
        const options = {
            method: 'POST',
            url: qubely_admin.ajax+'?action=qubely_delete_saved_block&block_id='+blockID,
            headers: {'Content-Type': 'application/json'}
        }
        apiFetch( options ).then( response => {
            if(response.success) {
                delete savedBlocks[ index ];
                this.setState({ savedBlocks });
            }
        }).catch( error => {
            requestFailedMsg.push(error.code+' : '+error.message);
            this.setState({
                requestFailedMsg
            });
        });
    }

    importLayoutBlock( itemData , isPro ) {

        let { itemType } = this.state;
        const { insertBlocks, removeBlock, rowClientId } = this.props;

        if( typeof wp.QUBELY_PRO_VERSION === 'undefined' && isPro == true ){
            //
        } else {
        
            this.setState( { spinner: itemData.ID } )

            if( itemType == 'block' ) {
                //import block
                let pageData = parse( itemData.rawData );
                insertBlocks( pageData );
                if( rowClientId ) {
                    removeBlock( rowClientId );// remove row block
                }
                ModalManager.close();

            } else  if( itemType == 'layout' ) {
                let requestFailedMsg = [];
                const options = {
                    method: 'POST',
                    url: qubely_admin.ajax+'?action=qubely_get_single_layout&layout_id='+itemData.ID,
                    headers: {'Content-Type': 'application/json'}
                }
                apiFetch( options ).then( response => {
                    if( response.success ) {
                        //import layout
                        let pageData = parse( response.data.rawData );
                        insertBlocks( pageData );
                        if( rowClientId ) {
                            removeBlock( rowClientId );// remove row block
                        }
                        ModalManager.close(); //close modal
                    }
                } ).catch( error => {
                    requestFailedMsg.push(error.code+' : '+error.message);
                    this.setState( { 
                        requestFailedMsg
                    } );
                } );
            }
        }
    }

    importSavedBlock( block ) {
        const { insertBlocks, removeBlock, rowClientId} = this.props;
        const blocks = parse( block.post_content );
        insertBlocks( blocks );
        if( rowClientId ) {
            removeBlock( rowClientId );// remove row block
        }
        ModalManager.close();
    }

    _onlickBlocksTab() {
        this.setState( {
            itemType:'block', 
            layer: 'single', 
            parent_id: ''
        } )
    }

    _onlickLayoutsTab() {

        let { layoutData, layoutCategoryItems } = this.state;

        if( !layoutData ) {
            this.setState( { loading: true } );
            let requestFailedMsg = [];

            const options = {
                method: 'POST',
                url: qubely_admin.ajax+'?action=qubely_get_layouts',
                headers: {'Content-Type': 'application/json'}
            }
            apiFetch( options ).then( response => {

                if ( response.success ) {

                    let layoutCategories = [],
                        layoutData = {};

                    response.data.map( item => {

                        let itemKey = `item${item.parentID}`;
                        if( layoutCategoryItems.hasOwnProperty( itemKey ) ) {
                            layoutCategoryItems[ itemKey ] += 1; 
                        } else {
                            layoutCategoryItems[ itemKey ] = 1;
                        }

                        if( item.category ) {
                            item.category.map( cat => {
                                if( cat.slug in layoutData ) {
                                    layoutData[ cat.slug ].push( item )
                                } else {
                                    layoutData[ cat.slug ] = [];
                                    layoutData[ cat.slug ].push( item )
                                }
                                let index = -1;
                                layoutCategories.forEach( ( change, i ) => {
                                    if ( cat.slug == change.slug ) {
                                        index = i
                                    }
                                });
                                if ( index === -1 ) {
                                    layoutCategories.push( { name: cat.name, slug: cat.slug } )
                                }
                            })
                        }
                    });
                    
                    this.setState( {
                        loading: false,
                        layoutCategories,
                        layoutCategoryItems,
                        layoutData
                    } );

                    let node = document.querySelector('#modalContainer');
                    node.addEventListener("scroll", this._lazyload, true);
                    this._lazyload(); 
                    
                } else {
                    this.setState( {
                        loading: false, 
                        requestFailedMsg: response.data.message
                    } );
                }
                    
            } ).catch( error => {
                requestFailedMsg.push( error.code+' : '+error.message );
                this.setState( { 
                    loading: false,
                    requestFailedMsg
                } );
            } );
        }
        
        this.setState( {
            itemType:'layout',
            layer: 'multiple',
            parent_id: ''
        } )
    }

    _onlickSavedBlocksTab() {
        let requestFailedMsg = [];
        let { savedBlocks } = this.state;
        if( !savedBlocks ) {
            this.setState( { loading: true } );
            const options = {
                method: 'POST',
                url: qubely_admin.ajax+'?action=qubely_get_saved_block',
                headers: {'Content-Type': 'application/json'}
            }
            apiFetch( options ).then( response => {
                this.setState( {
                    loading: false,
                    layer: 'block',
                    itemType: 'saved_blocks',
                    savedBlocks: response.data,
                } );
            } ).catch( error => {
                requestFailedMsg.push( error.code+' : '+error.message );
                this.setState( {
                    loading: false,
                    requestFailedMsg
                } );
            } );
        } else {
            this.setState( { 
                layer: 'block',
                itemType: 'saved_blocks'
            } );
        }
    }

    _onClickSingleEntity( template_id ) {
        this.setState( {
            layer:'single',
            parent_id : template_id 
        } )
    }

    _lazyload() {
        let { lazyloadThrottleTimeout } = this.state;
        let lazyloadImages = document.querySelectorAll('img.lazy');

        if( lazyloadImages.length ) {

            if ( lazyloadThrottleTimeout ) {
                this.setState( {
                    lazyloadThrottleTimeout: clearTimeout(lazyloadThrottleTimeout)
                } );
            }
            let modalContainer = document.querySelector( '#modalContainer' );
    
            lazyloadThrottleTimeout = setTimeout( function () {
                let firstElement = document.querySelector( '#first-single-item' ),
                    rect = firstElement.getBoundingClientRect(),
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                    scrollTopOffset = Math.abs( rect.top + scrollTop );
    
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (modalContainer.clientHeight + scrollTopOffset)) {
                        img.src = img.dataset.src;
                        //img.classList.remove('lazy');
                    }
                } );
                if ( lazyloadImages.length == 0 ) {
                    modalContainer.removeEventListener("scroll", this._lazyload);
                }
            }, 20);
        }
    }

    _OnChangeCategory( event ) {
        event.preventDefault();
        let  value = event.target.value;
        if( this.state.itemType == 'block' ) {
            this.setState({ selectedBlockCategory: value });
        } else if( this.state.itemType == 'layout' ) {
            this.setState({ selectedLayoutCategory: value });
        }
    }

    _OnSearchTemplate( event ) {
        let { isSearchEnable } = this.state;
        isSearchEnable = event.target.value === '' ? false : true
        this.setState({ isSearchEnable , searchContext: event.target.value })
    }

    _backgroundImage( url ) {
        if ( !url ) {
            return qubely_admin.plugin+'assets/img/qubely-medium.jpg';
        }
        return url;
    }

    render() {
        let { pageCategories, selectedCategory, currentPageData } = this.getCurrentPageData();
        let types = typeof wp.QUBELY_PRO_VERSION === 'undefined' ? 'inactive' : 'active';
        
        return (
            <Modal className="qubely-builder-modal-pages-list" customClass="qubely-builder-modal-template-list" onRequestClose={this.props.onRequestClose} openTimeoutMS={0} closeTimeoutMS={0}>
                { !this.state.loading ?
					<div id="modalContainer" className="qubely-template-list-modal">
                        <div className="qubely-builder-template-list-container">

                            <div className="qubely-template-list-header">
                                <span className={ this.state.itemType == 'block' ? 'active' : ''} onClick={ e => this._onlickBlocksTab() }> {__('Sections')} </span>
                                <span className={ this.state.itemType == 'layout' ? 'active' : ''} onClick={ e => this._onlickLayoutsTab() }> {__('Layouts')} </span>
                                <span className={ this.state.itemType == 'saved_blocks' ? 'active' : ''} onClick={ e => this._onlickSavedBlocksTab() }> {__('Saved')} </span>
							</div>

                            <div className="qubely-template-option-header">
                            
                                { ( this.state.itemType == 'layout' && this.state.layer == 'single' ) &&
                                    <span className={"qubely-template-back"} onClick={()=>this.setState({layer:'multiple', parent_id: ''})}><span className="dashicons dashicons-arrow-left-alt" /></span>
                                }

                                { ( !this.state.parent_id ) && this.state.layer != 'block' &&
                                <div className="qubely-template-option-select">
                                    <select onChange={this._OnChangeCategory.bind(this) } value={ selectedCategory }>
                                        <option value="">{__('All Categories')}</option>
                                        { 
                                            pageCategories.map( ( data, index ) => {
                                                return(
                                                    <option key={ index } value={ data.slug }> { data.name } </option>
                                                )
                                            }
                                        ) }
                                    </select>
                                </div>
                                }
                                <div className="template-search-box">
                                    <input type="text" onChange={this._OnSearchTemplate.bind(this)} value={this.state.searchContext} placeholder={__('Enter Keyword')} className="form-control"/>
                                </div>
                                
                                { ( this.state.itemType == 'layout' ) &&
                                    <div className="template-options">
                                        <ul>
                                            <li className={ this.state.layer === 'multiple' ? 'active' : '' }> <i className="qubely-folder-view" onClick={ e => this.setState( { layer: 'multiple', parent_id: '' } ) } /></li>
                                            <li className={ this.state.layer === 'single' ? 'active' : '' }> <i className="qubely-grid-view" onClick={ e => this.setState( { layer: 'single' } ) } /> </li>
                                        </ul>
                                    </div>
                                }
							</div>

                            <ul id="layouts-blocks-list" className={"qubely-builder-page-templates " + (this.state.itemType == "saved_blocks" ? 'qubely-frontendd-block-list' : '')}>
                                { this.state.layer == 'single' && 
                                currentPageData.map((data, index) =>
                                    <SingleItem
                                        key={index} 
                                        data={data}
                                        index={index}
                                        types={types}
                                        itemType={this.state.itemType}
                                        spinner={this.state.spinner}
                                        importLayoutBlock={this.importLayoutBlock.bind(this)}
                                        backgroundImage={this._backgroundImage}
                                    />
                                ) }

                                { this.state.layer == 'multiple' &&
                                currentPageData.map((data, index) =>
                                    <MultipleItem 
                                        key={ index }
                                        data={ data }
                                        totalLayouts={ this.state.layoutCategoryItems[ `item${data.ID}` ] }
                                        onClickSingleEntity={this._onClickSingleEntity.bind(this)}
                                        backgroundImage={this._backgroundImage}
                                    />
                                ) }

                                { ( this.state.layer == 'block' ) &&
                                    <li className="qubely-reusable-list-title">
                                        <div className="qubely-reusable-list-content">
                                            <span className="qubely-tmpl-title" > {__('Title')}</span>
                                        </div>
                                        <div className="qubely-reusable-list-info">
                                            <div className="qubely-reusable-list-info-date">{__('Publish')} </div>
                                        </div>
                                    </li>
                                }

                                { this.state.layer == 'block' &&
                                currentPageData.map((data, index) =>
                                    <ReusableBlockItem
                                        key={index}
                                        data={data}
                                        index={index}
                                        importSavedBlock={this.importSavedBlock.bind(this)}
                                        deleteSavedBlock={this.deleteSavedBlock.bind(this)}
                                        backgroundImage={this._backgroundImage}
                                    />
                                ) }

                                { ( currentPageData.length === 0 ) &&
                                    <li className="qubely-builder-template-found-empty">
                                        <h3 className="qubely-builder-empty-title"> {this.state.notFoundMessage} </h3>
                                    </li>
                                }
                                
                            </ul>
                        </div>
                        <button
                            className="qubely-builder-close-modal" 
                            onClick={ e => { ModalManager.close() } }
                        >
                            <i className={"fas fa-times"} />
                        </button>
                    </div>
                    :
                    <div>
                        <div style={ { height: "600px"} }>
                            { this.state.requestFailedMsg ?
                                this.state.requestFailedMsg.map( (error, index) => <p key={index}>{error}</p> )
                                :
                                <div className="qubely-modal-loader"> 
                                    <Spinner /> 
                                </div>
                            }
                            <button
                                className="qubely-builder-close-modal" 
                                onClick={ () => { ModalManager.close() } }
                            >
                                <i className={"fas fa-times"} />
                            </button>
                        </div>
                    </div>
                }
            </Modal>
        )
    }
}


export default compose( [
    withDispatch( ( dispatch ) => {
        const {
            insertBlocks,
            removeBlock
        } = dispatch( 'core/editor' );

        return {
            insertBlocks,
            removeBlock
        };
    } ),
] )( PageListModal );