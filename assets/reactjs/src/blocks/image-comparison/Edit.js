const { __ } = wp.i18n
const { Fragment, Component } = wp.element;
const { PanelBody, Toolbar } = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const { Media, Range, ButtonGroup, Typography, Toggle, Color, Url, gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, ContextMenu: { ContextMenu }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.qubelyComponents

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = { device: 'md', selector: true, spacer: true, openPanelSetting: '' };
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }

    handlePanelOpenings = (panelName) => {
        this.setState({ ...this.state, openPanelSetting: panelName })
    }

    dragFunc = (event) => {
        const container = event.target.parentNode;
        const resizeElement = container.querySelector('.comparison-resize-img');
        const dragCircle = document.querySelector('.comparison-scrollCircle');
        this.draging(container, dragCircle, resizeElement);
    }

    draging = (container, dragCircle, resizeElement) => {
        let moving = () => {
            let containerOffset = container.getBoundingClientRect().left - 40,//container.offsetLeft,
                containerWidth = container.offsetWidth,
                rect = container.getBoundingClientRect().left - 40,
                movingValue = ( ( event.pageX - 37 )  - containerOffset) / (containerWidth / 100);
            console.log(containerWidth, containerOffset,event.pageX, rect); //return 0;
            if(movingValue < 10)
                movingValue = 10;
            else if(movingValue > 90)
                movingValue = 90;
            dragCircle.style.left = movingValue+'%';
            resizeElement.style.width = movingValue+'%';
        }
    
        container.addEventListener('mousemove', moving);
    
        let dragRevoveFunc = (event) => {
            console.log("drag remove");
            container.removeEventListener('mousemove', moving);
        }
    
        container.addEventListener('mouseup',dragRevoveFunc);
        window.addEventListener('mouseup',dragRevoveFunc);
    
    }

    render() {
        const {
            uniqueId,
            recreateStyles,
            className,
            selector,
            layout,
            alignment,
            animateOnHover,
            originalTitle,
            titleLevel,
            originalTitleTypography,
            originalTitleColor,
            titleVisibleOnHover,
            modifiedTitle,
            circleBackground,
            disableTitle,
            circleWidth,

            image,
            image2x,
            imageType,
            externalImageUrl,
            imgAlt,
            imageUrl,
            image2,
            image2_2x,
            imageType2,
            externalImageUrl2,
            imgAlt2,
            imageUrl2,

            animation,
            globalZindex,
            enablePosition,
            selectPosition,
            positionXaxis,
            positionYaxis,
            hideTablet,
            hideMobile,
            globalCss,
            interaction
        } = this.props.attributes
        const { name, clientId, attributes, setAttributes, isSelected } = this.props
        const { openPanelSetting, device } = this.state
        console.log(modifiedTitle, this.props);

        const titleTagName = 'h' + titleLevel;
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Original Image')}>
                                <ButtonGroup
                                    label={__('Image Type')}
                                    options={
                                        [
                                            [__('Local'), 'local'],
                                            [__('External'), 'external']
                                        ]
                                    }
                                    value={imageType}
                                    onChange={value => setAttributes({ imageType: value })}
                                />
                                {
                                    imageType === 'local' ?
                                        <Fragment>
                                            <Media label={__('Image')} multiple={false} type={['image']} panel={true} value={image} onChange={val => setAttributes({ image: val })} />
                                            <Media label={__('Retina Image (@2x)')} multiple={false} type={['image']} panel={true} value={image2x} onChange={val => setAttributes({ image2x: val })} />
                                        </Fragment>
                                        :
                                        <Url label={__('Image Source')} disableAdvanced value={externalImageUrl} onChange={newUrl => setAttributes({ externalImageUrl: newUrl })} />
                                }
                                { disableTitle &&
                                    <Fragment>
                                        <Color label={__('Title Color')} value={originalTitleColor} onChange={(value) => setAttributes({ originalTitleColor: value })} />
                                        <Typography label={__('Typography')} value={originalTitleTypography} onChange={(value) => setAttributes({ originalTitleTypography: value })} disableLineHeight device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                                <Toggle label={__('Disable Title')} value={disableTitle} onChange={val => setAttributes({ disableTitle: val })} />

                            </PanelBody>

                        </InspectorTab>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Modified Image')} initialOpen={false}>
                                <ButtonGroup
                                    label={__('Image Type')}
                                    options={
                                        [
                                            [__('Local'), 'local'],
                                            [__('External'), 'external']
                                        ]
                                    }
                                    value={imageType}
                                    onChange={value => setAttributes({ imageType: value })}
                                />
                                {
                                    imageType === 'local' ?
                                        <Fragment>
                                            <Media label={__('Image')} multiple={false} type={['image']} panel={true} value={image2} onChange={val => setAttributes({ image2: val })} />
                                            <Media label={__('Retina Image (@2x)')} multiple={false} type={['image']} panel={true} value={image2_2x} onChange={val => setAttributes({ image2_2x : val })} />
                                        </Fragment>
                                        :
                                        <Url label={__('Image Source')} disableAdvanced value={externalImageUrl2} onChange={newUrl => setAttributes({ externalImageUrl2: newUrl })} />
                                }
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'style'} initialOpen={true}>
                            <PanelBody title={__('Circle')} initialOpen={false}>
                                <Range label={__('Size')} value={circleWidth} onChange={(value) => setAttributes({ circleWidth: value })} min={0} max={60} />
                                <Color label={__('Background')} value={circleBackground} onChange={(value) => setAttributes({ circleBackground: value })} />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}
                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div class="qubely-block-image-comparison">
                        {
                            (imageType === 'local' && image.url != undefined) ?
                                <Fragment>
                                    {image2x.url != undefined ?
                                        <img className="qubely-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                                        :
                                        <img className="qubely-image-image" src={image.url} alt={imgAlt && imgAlt} />
                                    }
                                </Fragment>
                                :
                                (imageType === 'external' && externalImageUrl.url != undefined) ?
                                    <img className="qubely-image-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
                                    :
                                    <div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image" /></div>
                        }
                        { disableTitle &&
                            <RichText
                                key="editable"
                                tagName="span"
                                className="comparison-image-text"
                                keepPlaceholderOnFocus
                                placeholder={__('Original')}
                                onChange={value => setAttributes({ originalTitle: value })}
                                value={originalTitle} />
                        }
                        <div class="comparison-resize-img">
                            {
                                (imageType === 'local' && image2.url != undefined) ?
                                    <Fragment>
                                        {image2_2x.url != undefined ?
                                            <img className="qubely-image-image" src={image2.url} srcset={image2.url + ' 1x, ' + image2_2x.url + ' 2x'} alt={imgAlt2 && imgAlt2} />
                                            :
                                            <img className="qubely-image-image" src={image2.url} alt={imgAlt2 && imgAlt2} />
                                        }
                                    </Fragment>
                                    :
                                    (imageType === 'external' && externalImageUrl2.url != undefined) ?
                                        <img className="qubely-image-image" src={externalImageUrl2.url} alt={imgAlt2 && imgAlt2} />
                                        :
                                        <div className="qubely-image-image qubely-image-placeholder"><i className="far fa-image" /></div>
                            }
                            { disableTitle &&
                                <RichText
                                    key="editable"
                                    tagName="span"
                                    className="comparison-image-text"
                                    keepPlaceholderOnFocus
                                    placeholder={__('Modified')}
                                    onChange={value => setAttributes({ modifiedTitle : value })}
                                    value={modifiedTitle} />
                            }
                        </div>
                        <span class="comparison-scrollCircle"
                            onMouseDown={ (event) => this.dragFunc(event) }
                        >
                        </span>
                    </div>

                    <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                        <ContextMenu
                            name={name}
                            clientId={clientId}
                            attributes={attributes}
                            setAttributes={setAttributes}
                            qubelyContextMenu={this.refs.qubelyContextMenu}
                        />
                    </div>

                </div>
            </Fragment>
        )
    }
}
export default withCSSGenerator()(Edit);