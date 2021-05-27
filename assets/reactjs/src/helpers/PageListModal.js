const { compose } = wp.compose;
const { withDispatch } = wp.data;
const { Component, Fragment } = wp.element
const { Spinner, Modal } = wp.components;
const { parse } = wp.blocks
const { apiFetch } = wp;
const { __ } = wp.i18n
import { Modal as QubelyModal, ModalManager } from './ModalManager'
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
            searchContext: '',
            isSearchEnable: false,
            notFoundMessage: 'Sorry, we couldn\'t find the match.',
            requestFailedMsg: '',
            spinner: false,
            lazyloadThrottleTimeout: 0,
            priceFilter: '',
            isOpen: false,
            rememberChoice: false
        };
        this._lazyload = this._lazyload.bind(this);
    }

    componentDidMount() {

        this.setState({ loading: true });
        let requestFailedMsg = [];

        const options = {
            method: 'POST',
            url: qubely_admin.ajax + '?action=qubely_get_sections',
            headers: { 'Content-Type': 'application/json' }
        }
        apiFetch(options).then(response => {

            if (response.success) {

                let blockCategories = [],
                    blockData = {};

                response.data.map(item => {
                    if (item.category) {
                        item.category.map(cat => {
                            if (cat.slug in blockData) {
                                blockData[cat.slug].push(item)
                            } else {
                                blockData[cat.slug] = [];
                                blockData[cat.slug].push(item)
                            }
                            let index = -1;
                            blockCategories.forEach((change, i) => {
                                if (cat.slug == change.slug) {
                                    index = i
                                    blockCategories[i].count = blockCategories[i].count + 1
                                }
                            });
                            if (index === -1) {
                                blockCategories.push({ name: cat.name, slug: cat.slug, count: 1 })
                            }
                        })
                    }
                });

                this.setState({
                    loading: false,
                    blockCategories,
                    blockData
                });

                let node = document.querySelector('#modalContainer');
                node.addEventListener("scroll", this._lazyload, true);
                this._lazyload();

            } else {
                this.setState({
                    loading: false,
                    requestFailedMsg: response.data.message
                });
            }

        }).catch(error => {
            requestFailedMsg.push(error.code + ' : ' + error.message);
            this.setState({
                loading: false,
                requestFailedMsg
            });
        });
    }

    componentDidUpdate() {
        if (this.state.layer === 'single') {
            this._lazyload();
        }
    }

    componentWillUnmount() {
        let node = document.querySelector('#modalContainer');
        node && node.removeEventListener('scroll', this._lazyload);
    };


    getCurrentPageData() {
        let { itemType, priceFilter } = this.state;
        let pageData = (itemType == 'block') ? this.state.blockData : this.state.layoutData;
        let pageCategories = (itemType == 'block') ? this.state.blockCategories : this.state.layoutCategories;
        let selectedCategory = (itemType == 'block') ? this.state.selectedBlockCategory : this.state.selectedLayoutCategory;
        let currentPageData = [];
        let tempDataID = [];

        if (this.state.layer === 'single') {
            if (this.state.parent_id) { //if click from multiple entry
                for (let key in pageData) {
                    pageData[key].map(value => {
                        if (value.parentID && this.state.parent_id === value.parentID && !(tempDataID.indexOf(value.ID) > -1)) {
                            currentPageData.push(value);
                            tempDataID.push(value.ID);
                        }
                    })
                }
            } else {
                if (selectedCategory) {
                    pageData[selectedCategory].map(value => {
                        if (itemType == 'block') {
                            if (!(tempDataID.indexOf(value.ID) > -1)) {
                                currentPageData.push(value);
                                tempDataID.push(value.ID);
                            }
                        } else {
                            if (value.parentID && !(tempDataID.indexOf(value.ID) > -1)) {
                                currentPageData.push(value);
                                tempDataID.push(value.ID);
                            }
                        }
                    })
                } else {
                    for (let key in pageData) {
                        Array.isArray(pageData[key]) && pageData[key].map(value => {
                            if (itemType == 'block') {
                                if (!(tempDataID.indexOf(value.ID) > -1)) {
                                    currentPageData.push(value);
                                    tempDataID.push(value.ID);
                                }
                            } else {
                                if (value.parentID && !(tempDataID.indexOf(value.ID) > -1)) {
                                    currentPageData.push(value);
                                    tempDataID.push(value.ID);
                                }
                            }
                        })
                    }
                }
            }
        }

        if (this.state.layer === 'multiple') {
            if (selectedCategory) {
                let itemCount = 0;
                pageData[selectedCategory].map(value => {
                    if (!value.parentID && !(tempDataID.indexOf(value.ID) > -1)) {
                        let found = value.category.find(item => item.slug == selectedCategory);
                        if (found) {
                            tempDataID.push(value.ID);
                            currentPageData.push(value);
                        }
                    }
                })
            } else {
                for (let key in pageData) {
                    if (typeof pageData[key] === 'object') {
                        pageData[key].map(value => {
                            if (!value.parentID && !(tempDataID.indexOf(value.ID) > -1)) {
                                tempDataID.push(value.ID);
                                currentPageData.push(value);
                            }
                        });
                    }
                }
            }
        }

        if (this.state.layer === 'block') {
            currentPageData = this.state.savedBlocks;
        }

        if (itemType != 'saved_blocks') {
            currentPageData = priceFilter == 'pro' ? currentPageData.filter(item => item.pro == true) : (priceFilter == 'free' ? currentPageData.filter(item => item.pro == false) : currentPageData);
        }

        if (this.state.isSearchEnable) {
            let filterData = currentPageData.filter(item => item.name.toLowerCase().indexOf(this.state.searchContext.toLowerCase()) != -1);
            return { pageCategories, selectedCategory, currentPageData: filterData }
        }

        return { pageCategories, selectedCategory, currentPageData }
    }

    deleteSavedBlock(index, blockID) {
        let { savedBlocks } = this.state;
        let requestFailedMsg = [];
        const options = {
            method: 'POST',
            url: qubely_admin.ajax + '?action=qubely_delete_saved_block&block_id=' + blockID,
            headers: { 'Content-Type': 'application/json' }
        }
        apiFetch(options).then(response => {
            if (response.success) {
                delete savedBlocks[index];
                this.setState({ savedBlocks });
            }
        }).catch(error => {
            requestFailedMsg.push(error.code + ' : ' + error.message);
            this.setState({
                requestFailedMsg
            });
        });
    }

    importLayoutBlock(itemData, isPro) {

        let { itemType } = this.state;
        const { insertBlocks, removeBlock, rowClientId } = this.props;
        let globalSettings, importWithGlobal = false;

        if (typeof itemData.global_settings !== 'undefined' && itemData.global_settings) {
            importWithGlobal = true;
        }

        if (!qubely_admin.pro_enable && isPro == true) {
            //
        } else {
            this.setState({ spinner: itemData.ID });
            if (importWithGlobal) {
                globalSettings = JSON.parse(itemData.global_settings)
            }

            let requestFailedMsg = [];
            const options = {
                method: 'POST',
                url: qubely_admin.ajax + '?action=qubely_get_single_' + itemType + '&' + itemType + '_id=' + itemData.ID,
                headers: { 'Content-Type': 'application/json' }
            }
            apiFetch(options).then(response => {
                if (response.success) {
                    //import layout
                    let pageData = parse(response.data.rawData);

                    if (importWithGlobal) {
                        let temp = JSON.stringify(pageData);
                        if (typeof globalSettings.colors !== 'undefined' && globalSettings.colors.length > 0) {
                            globalSettings.colors.forEach((color, index) => {
                                temp = temp.replace(new RegExp(`var.--qubely-color-${index + 1}.`, "g"), color)
                            })
                        }
                        if (typeof globalSettings.typography !== 'undefined' && globalSettings.typography.length > 0) {
                            globalSettings.typography.forEach((typo, index) => {
                                let tempValue = JSON.stringify({ ...typo.value, activeSource: "custom" })
                                temp = temp.replace(new RegExp(`\"globalSource\":\"${index + 1}\"`, "g"), tempValue.slice(1, -1))
                            })
                        }
                        if (qubely_admin.import_with_global_settings === 'always') {
                            this.props.insertBlocks(pageData)
                            ModalManager.close();
                        } else if (qubely_admin.import_with_global_settings === 'never') {
                            this.props.insertBlocks(JSON.parse(temp))
                            ModalManager.close();
                        } else if (qubely_admin.import_with_global_settings === 'manually' ||
                            !qubely_admin.import_with_global_settings ||
                            typeof qubely_admin.import_with_global_settings === 'undefined') {
                            localStorage.setItem('changed', temp);
                            localStorage.setItem('original', JSON.stringify(pageData));
                            this.setState({ isOpen: true });
                        }
                    } else {
                        insertBlocks(pageData);
                        ModalManager.close();
                    }

                    if (rowClientId) {
                        removeBlock(rowClientId);// remove row block
                    }
                }
            }).catch(error => {
                requestFailedMsg.push(error.code + ' : ' + error.message);
                this.setState({
                    requestFailedMsg
                });
            });
        }
    }

    importSavedBlock(block) {
        const { insertBlocks, removeBlock, rowClientId } = this.props;
        const blocks = parse(block.post_content);
        insertBlocks(blocks);
        if (rowClientId) {
            removeBlock(rowClientId);// remove row block
        }
        ModalManager.close();
    }

    _onlickBlocksTab() {
        this.setState({
            itemType: 'block',
            layer: 'single',
            parent_id: '',
            searchContext: '',
            priceFilter: ''
        })
    }

    _onlickLayoutsTab() {

        let { layoutData, layoutCategoryItems } = this.state;

        if (!layoutData) {
            this.setState({ loading: true });
            let requestFailedMsg = [];

            const options = {
                method: 'POST',
                url: qubely_admin.ajax + '?action=qubely_get_layouts',
                headers: { 'Content-Type': 'application/json' }
            }
            apiFetch(options).then(response => {

                if (response.success) {

                    let layoutCategories = [],
                        layoutData = {};

                    response.data.map(item => {

                        let itemKey = `item${item.parentID}`;
                        if (layoutCategoryItems.hasOwnProperty(itemKey)) {
                            layoutCategoryItems[itemKey] += 1;
                        } else {
                            layoutCategoryItems[itemKey] = 1;
                        }

                        if (item.category) {
                            item.category.map(cat => {
                                if (cat.slug in layoutData) {
                                    layoutData[cat.slug].push(item)
                                } else {
                                    layoutData[cat.slug] = [];
                                    layoutData[cat.slug].push(item)
                                }
                                let index = -1;
                                layoutCategories.forEach((change, i) => {
                                    if (cat.slug == change.slug) {
                                        index = i
                                        if (item.parentID == 0) {
                                            layoutCategories[i].count = layoutCategories[i].count + 1
                                        }
                                    }
                                });
                                if (index == -1) {
                                    layoutCategories.push({ name: cat.name, slug: cat.slug, count: item.parentID == 0 ? 1 : 0 })
                                }
                            })
                        }
                    });

                    this.setState({
                        loading: false,
                        layoutCategories,
                        layoutCategoryItems,
                        layoutData
                    });

                    let node = document.querySelector('#modalContainer');
                    node.addEventListener("scroll", this._lazyload, true);
                    this._lazyload();

                } else {
                    this.setState({
                        loading: false,
                        requestFailedMsg: response.data.message
                    });
                }

            }).catch(error => {
                requestFailedMsg.push(error.code + ' : ' + error.message);
                this.setState({
                    loading: false,
                    requestFailedMsg
                });
            });
        }

        this.setState({
            itemType: 'layout',
            layer: 'multiple',
            parent_id: '',
            searchContext: '',
            priceFilter: ''
        })
    }

    _onlickSavedBlocksTab() {
        let requestFailedMsg = [];
        let { savedBlocks } = this.state;
        if (!savedBlocks) {
            this.setState({ loading: true });
            const options = {
                method: 'POST',
                url: qubely_admin.ajax + '?action=qubely_get_saved_block',
                headers: { 'Content-Type': 'application/json' }
            }
            apiFetch(options).then(response => {
                this.setState({
                    loading: false,
                    layer: 'block',
                    itemType: 'saved_blocks',
                    savedBlocks: response.data,
                    searchContext: '',
                    priceFilter: ''
                });
            }).catch(error => {
                requestFailedMsg.push(error.code + ' : ' + error.message);
                this.setState({
                    loading: false,
                    requestFailedMsg,
                    searchContext: '',
                    priceFilter: ''
                });
            });
        } else {
            this.setState({
                layer: 'block',
                itemType: 'saved_blocks',
                searchContext: '',
                priceFilter: ''
            });
        }
    }

    _onClickSingleEntity(template_id) {
        this.setState({
            layer: 'single',
            parent_id: template_id
        })
    }

    _lazyload() {
        let { lazyloadThrottleTimeout } = this.state;
        let lazyloadImages = document.querySelectorAll('img.lazy');
        if (lazyloadImages.length) {
            if (lazyloadThrottleTimeout) {
                this.setState({
                    lazyloadThrottleTimeout: clearTimeout(lazyloadThrottleTimeout)
                });
            }
            let modalContainer = document.querySelector('#modalContainer');

            lazyloadThrottleTimeout = setTimeout(function () {
                let firstElement = document.querySelector('#first-single-item');
                if (firstElement) {
                    let rect = firstElement.getBoundingClientRect(),
                        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                        scrollTopOffset = Math.abs(rect.top + scrollTop);

                    lazyloadImages.forEach(function (img) {
                        if (img.offsetTop < (modalContainer.clientHeight + scrollTopOffset)) {
                            img.src = img.dataset.src;
                            //img.classList.remove('lazy');
                        }
                    });
                }

                if (lazyloadImages.length == 0) {
                    modalContainer.removeEventListener("scroll", this._lazyload);
                }
            }, 20);
        }
    }

    _OnChangeCategory(value) {
        if (this.state.itemType == 'block') {
            this.setState({ selectedBlockCategory: value });
        } else if (this.state.itemType == 'layout') {
            this.setState({ selectedLayoutCategory: value });
        }
    }


    _sliceCurrentData(data, n = 3, balanced = true) {
        if (n < 2)
            return [data];

        var len = data.length,
            out = [],
            i = 0,
            size;

        if (len % n === 0) {
            size = Math.floor(len / n);
            while (i < len) {
                out.push(data.slice(i, i += size));
            }
        } else if (balanced) {
            while (i < len) {
                size = Math.ceil((len - i) / n--);
                out.push(data.slice(i, i += size));
            }
        } else {

            n--;
            size = Math.floor(len / n);
            if (len % size === 0)
                size--;
            while (i < size * n) {
                out.push(data.slice(i, i += size));
            }
            out.push(data.slice(size * n));

        }
        return out;
    }


    _OnSearchTemplate(event) {
        let { isSearchEnable } = this.state;
        isSearchEnable = event.target.value === '' ? false : true
        this.setState({ isSearchEnable, searchContext: event.target.value })
    }

    _backgroundImage(url) {
        if (!url) {
            return qubely_admin.plugin + 'assets/img/qubely-medium.jpg';
        }
        return url;
    }

    _getDataLength(type, singleCount) {
        const { selectedBlockCategory, blockCategories, selectedLayoutCategory, itemType, blockData, layoutCategories } = this.state
        let count = 0;
        if (type == 'heading') {
            if (itemType == 'block') {
                if (selectedBlockCategory == '') {
                    count = singleCount
                    //blockCategories.forEach(function (data) { count = count + data.count; });
                } else {
                    blockCategories.forEach(function (data) {
                        if (data.slug == selectedBlockCategory) {
                            count = data.count
                        }
                    });
                }
                return count;
            } else {
                if (this.state.layer == 'multiple') {
                    if (selectedLayoutCategory == '') {
                        //layoutCategories.forEach(function (data) { count = count + data.count; });
                        count = singleCount
                    } else {
                        layoutCategories.forEach(function (data) {
                            if (data.slug == selectedLayoutCategory) {
                                count = data.count
                            }
                        });
                    }
                    return count
                } else {
                    return singleCount
                }
            }
        } else {
            if (itemType == 'block') {
                Object.keys(blockData).forEach(function (key) { count = count + blockData[key].length; });
                return count
            } else {
                layoutCategories.forEach(function (data) { count = count + data.count; });
                return count
            }
        }
    }

    _changePriceFilter(val = '') {
        this.setState({
            priceFilter: val ? val : ''
        })
    }


    render() {
        let { pageCategories, currentPageData } = this.getCurrentPageData();
        let types = qubely_admin.pro_enable ? 'active' : 'inactive';
        let {
            itemType,
            blockData,
            layer,
            isOpen,
            rememberChoice,
            selectedBlockCategory,
            selectedLayoutCategory
        } = this.state;

        const closeModal = () => this.setState({ isOpen: false });

        const importBlocks = (actionType) => {
            let type = 'changed';
            if (actionType === 'yes') {
                type = 'original';
            }
            this.props.insertBlocks(JSON.parse(localStorage.getItem(type)));
            ModalManager.close();
            if ((qubely_admin.import_with_global_settings === "manually" ||
                !qubely_admin.import_with_global_settings ||
                typeof qubely_admin.import_with_global_settings === 'undefined') && rememberChoice) {
                $.post({
                    url: qubely_urls.ajax,
                    data: {
                        action: 'update_qubely_options',
                        _wpnonce: qubely_urls.nonce,
                        options: {
                            'import_with_global_settings': actionType === 'yes' ? 'always' : 'never',
                        }
                    }
                }).success(function (response) {
                    qubely_admin['import_with_global_settings'] = actionType === 'yes' ? 'always' : 'never'
                }).fail(function (error) {
                    console.log("error : ", error);
                });
            }
        }
        return (
            <Fragment>
                <QubelyModal className="qubely-builder-modal-pages-list" customClass="qubely-builder-modal-template-list" onRequestClose={this.props.onRequestClose} openTimeoutMS={0} closeTimeoutMS={0}>

                    <div className="qubely-builder-modal-header">
                        <div className="template-search-box">
                            <i className="fas fa-search" />
                            <input type="search" onChange={this._OnSearchTemplate.bind(this)} value={this.state.searchContext} placeholder={__('Type to search')} className="form-control" />
                        </div>

                        <div className="qubely-template-list-header">
                            <button className={this.state.itemType == 'block' ? 'active' : ''} onClick={e => this._onlickBlocksTab()}> {__('Sections')} </button>
                            <button className={this.state.itemType == 'layout' ? 'active' : ''} onClick={e => this._onlickLayoutsTab()}> {__('Starter Packs')} </button>
                            <button className={this.state.itemType == 'saved_blocks' ? 'active' : ''} onClick={e => this._onlickSavedBlocksTab()}> {__('Saved')} </button>
                            <button className="qubely-builder-close-modal" onClick={e => { ModalManager.close() }} >
                                <i className={"fas fa-times"} />
                            </button>
                        </div>
                    </div>

                    <div className="qubely-layout-modal-sidebar">

                        <div className="qubely-modal-sidebar-content">
                            {
                                (!(itemType == 'layout' && layer == 'single') && !(itemType == 'saved_blocks') ||
                                    (this.state.parent_id && layer === 'single')) && <h3>Categories</h3>
                            }
                            {
                                ((!this.state.parent_id && layer != 'block') || (this.state.parent_id && layer === 'single')) &&
                                <ul className="qubely-template-categories">
                                    <li
                                        className={itemType == 'block' ? '' == selectedBlockCategory ? 'active' : '' : '' == selectedLayoutCategory ? 'active' : ''}
                                        onClick={() => this._OnChangeCategory('')}>
                                        {__('All ')}{itemType == 'block' ? 'Sections' : 'Starter Packs'}
                                        <span>
                                            {this._getDataLength('category', currentPageData.length)}
                                        </span>
                                    </li>
                                    {
                                        pageCategories.map((data, index) => (
                                            <li className={itemType == 'block' ? data.slug == selectedBlockCategory ? 'active' : '' : data.slug == selectedLayoutCategory ? 'active' : ''}
                                                onClick={() => this._OnChangeCategory(data.slug)}
                                                key={index}>
                                                {data.name}
                                                <span>
                                                    {
                                                        itemType == 'block' ? blockData[data.slug] ? blockData[data.slug].length : 0 : data.count
                                                    }
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="qubely-layout-modal-content-area">

                        {itemType != 'saved_blocks' && <div className="qubely-template-list-sub-header">
                            <h4>
                                {(this.state.itemType == 'layout' && this.state.layer == 'single') &&
                                    <span className={"qubely-template-back"} onClick={() => this.setState({ layer: 'multiple', parent_id: '' })}><span className="dashicons dashicons-arrow-left-alt" />&nbsp;</span>
                                }
                                {this._getDataLength(itemType === 'layout' && selectedLayoutCategory === '' && layer !== 'single' ? 'category' : 'heading', currentPageData.length)}&nbsp;
                            {itemType == 'block' ? __('Sections') : this.state.layer == 'single' ? __('Layouts') : __('Starter Packs')}
                            </h4>
                            <div className="qubely-template-filter-button-group">
                                <button onClick={() => this._changePriceFilter()} className={'' == this.state.priceFilter ? 'active' : ''}>{__('All')}</button>
                                <button onClick={() => this._changePriceFilter('free')} className={'free' == this.state.priceFilter ? 'active' : ''}>{__('Free')}</button>
                                <button onClick={() => this._changePriceFilter('pro')} className={'pro' == this.state.priceFilter ? 'active' : ''}>
                                    <img src={qubely_admin.plugin + 'assets/img/icon-premium.svg'} alt="" />
                                    {__('Premium')}
                                </button>
                            </div>
                        </div>}

                        {!this.state.loading ?
                            <div id="modalContainer" className="qubely-template-list-modal">
                                <div className="qubely-builder-template-list-container">
                                    {/*<div className="qubely-template-option-header">
                                        ( this.state.itemType == 'layout' ) &&
                                        <div className="template-options">
                                            <ul>
                                                <li className={ this.state.layer === 'multiple' ? 'active' : '' }> <i className="qubely-folder-view" onClick={ e => this.setState( { layer: 'multiple', parent_id: '' } ) } /></li>
                                                <li className={ this.state.layer === 'single' ? 'active' : '' }> <i className="qubely-grid-view" onClick={ e => this.setState( { layer: 'single' } ) } /> </li>
                                            </ul>
                                        </div>

                                </div>*/}

                                    <div id="layouts-blocks-list" className={"qubely-builder-page-templates " + (this.state.itemType == "saved_blocks" ? 'qubely-frontendd-block-list' : '')}>
                                        {
                                            this.state.layer == 'single' && this._sliceCurrentData(currentPageData).map(item => (
                                                <div className="qubely-pagelist-column">
                                                    {
                                                        item.map((data, index) =>
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
                                                        )
                                                    }
                                                </div>
                                            ))

                                        }

                                        {this.state.layer == 'multiple' &&
                                            currentPageData.map((data, index) =>
                                                <MultipleItem
                                                    key={index}
                                                    data={data}
                                                    types={types}
                                                    totalLayouts={this.state.layoutCategoryItems[`item${data.ID}`]}
                                                    onClickSingleEntity={this._onClickSingleEntity.bind(this)}
                                                    backgroundImage={this._backgroundImage}
                                                />
                                            )}

                                        {(this.state.layer == 'block' && currentPageData.length != 0) &&
                                            <div className="qubely-reusable-list-title">
                                                <div className="qubely-reusable-list-content">
                                                    <span className="qubely-tmpl-title" > {__('Title')}</span>
                                                </div>
                                                <div className="qubely-reusable-list-info">
                                                    <div className="qubely-reusable-list-info-date">{__('Publish')} </div>
                                                </div>
                                            </div>
                                        }

                                        {this.state.layer == 'block' &&
                                            currentPageData.map((data, index) =>
                                                <ReusableBlockItem
                                                    key={index}
                                                    data={data}
                                                    index={index}
                                                    importSavedBlock={this.importSavedBlock.bind(this)}
                                                    deleteSavedBlock={this.deleteSavedBlock.bind(this)}
                                                    backgroundImage={this._backgroundImage}
                                                />
                                            )}

                                        {(currentPageData.length === 0) &&
                                            <div className="qubely-builder-template-found-empty">
                                                <h3 className="qubely-builder-empty-title"> {this.state.notFoundMessage} </h3>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div style={{ height: "600px" }}>
                                    {this.state.requestFailedMsg ?
                                        this.state.requestFailedMsg.map((error, index) => <p key={index}>{error}</p>)
                                        :
                                        <div className="qubely-modal-loader">
                                            <Spinner />
                                        </div>
                                    }
                                    {/*<button
                                    className="qubely-builder-close-modal"
                                    onClick={ () => { ModalManager.close() } }
                                >
                                    <i className={"fas fa-times"} />
                                </button>*/}
                                </div>
                            </div>
                        }
                    </div>
                </QubelyModal>
                {
                    (isOpen && (qubely_admin.import_with_global_settings === "manually" ||
                        !qubely_admin.import_with_global_settings ||
                        typeof qubely_admin.import_with_global_settings === 'undefined')) && (
                        <Modal
                            title={__('Import Type Settings')}
                            className="qubely-import-global"
                            onRequestClose={closeModal}
                        >
                            <div className="qubely-import-settings">
                                <div className="label">{__("Apply global styling while importing this?")} </div>
                                <div className="qubely-import-settings-footer">
                                    <div className="remember-choice-box">
                                        <input
                                            id="isGoing"
                                            name="isGoing"
                                            type="checkbox"
                                            checked={rememberChoice}
                                            onChange={() => this.setState(state => { return { rememberChoice: !state.rememberChoice } })}
                                        />
                                        <label for="isGoing" className="label">{__("Don't ask me again")}</label>
                                    </div>
                                    <div className="action-buttons">
                                        <div className="action-button no" onClick={() => { importBlocks('no') }}>{__('No')}</div>
                                        <div className="action-button yes" onClick={() => { importBlocks('yes') }}>{__('Yes')}</div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </Fragment>
        )
    }
}


export default compose([
    withDispatch((dispatch) => {
        const {
            insertBlocks,
            removeBlock
        } = dispatch('core/block-editor');

        return {
            insertBlocks,
            removeBlock
        };
    }),
])(PageListModal);