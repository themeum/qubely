const { __ } = wp.i18n;
const {
    Fragment,
    Component
} = wp.element;

const {
    PanelBody,
    Toolbar
} = wp.components;

const {
    RichText,
    BlockIcon,
    BlockControls,
    MediaPlaceholder,
    InspectorControls,
} = wp.blockEditor;

const {
    Url,
    Color,
    Media,
    Range,
    Toggle,
    Typography,
    ButtonGroup,
    Inline: {
        InlineToolbar
    },
    ContextMenu: {
        ContextMenu
    },
    gloalSettings: {
        animationSettings,
        interactionSettings,
        globalSettingsPanel,
    },
    InspectorTab,
    InspectorTabs,
    withCSSGenerator,
} = wp.qubelyComponents;

const DEFAULT_SIZE_SLUG = 'large';
const ALLOWED_MEDIA_TYPES = ['image'];


class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md'
        };
    }

    componentDidMount() {
        const {
            clientId,
            setAttributes,
            attributes: {
                uniqueId
            }
        } = this.props;
        const _client = clientId.substr(0, 6);

        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
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
                movingValue = ((event.pageX - 37) - containerOffset) / (containerWidth / 100);
            console.log(containerWidth, containerOffset, event.pageX, rect); //return 0;
            if (movingValue < 10)
                movingValue = 10;
            else if (movingValue > 90)
                movingValue = 90;
            dragCircle.style.left = movingValue + '%';
            resizeElement.style.width = movingValue + '%';
        }

        container.addEventListener('mousemove', moving);

        let dragRevoveFunc = (event) => {
            console.log("drag remove");
            container.removeEventListener('mousemove', moving);
        }

        container.addEventListener('mouseup', dragRevoveFunc);
        window.addEventListener('mouseup', dragRevoveFunc);

    }
    onSelectImage = (media, imageId) => {
        if (!media || !media.url) {
            return;
        }
        this.props.setAttributes(imageId === 'A' ? {
            image: media
        } : {
                image2: media
            }
        );
    }
    onUploadError = (message) => {
        const { noticeOperations } = this.props;
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice(message);
    }
    onSelectURL = (newURL, imageId) => {

        const { image, image2 } = this.props.attributes;
        let currentImage = image;
        if (imageId === 'B') {
            currentImage = image2;
        }
        if (newURL !== currentImage.url) {
            currentImage = {
                ...currentImage,
                url: newURL,
                id: undefined,
                sizeSlug: DEFAULT_SIZE_SLUG
            }
        }
        this.props.setAttributes(imageId === 'A' ? {
            image: currentImage
        } : {
                image2: currentImage
            });
    }

    render() {
        const {
            name,
            noticeUI,
            clientId,
            attributes,
            setAttributes,
            attributes: {
                uniqueId,
                className,
                originalTitle,
                titleLevel,
                originalTitleTypography,
                originalTitleColor,
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
            }
        } = this.props;

        const { device } = this.state;

        const renderPlaceholder = (imageId) => {
            let selectedImage = image;
            if (imageId === 'B') {
                selectedImage = image2;
            }
            const mediaPreview = !!selectedImage.url && (
                <img
                    alt={__('Edit image')}
                    title={__('Edit image')}
                    className={'edit-image-preview'}
                    src={selectedImage.url}
                />
            );
            return (
                <MediaPlaceholder
                    accept="image/*"
                    multiple={false}
                    notices={noticeUI}
                    icon="format-image"
                    mediaPreview={mediaPreview}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    onError={() => this.onUploadError()}
                    labels={{ title: `Image ${imageId}` }}
                    onSelect={media => this.onSelectImage(media, imageId)}
                    onSelectURL={newUrl => this.onSelectURL(newUrl, imageId)}
                    disableMediaButtons={selectedImage.url}
                    value={{ id: selectedImage.id, src: selectedImage.src }}
                />
            )
        }
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
                                {disableTitle &&
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
                                            <Media label={__('Retina Image (@2x)')} multiple={false} type={['image']} panel={true} value={image2_2x} onChange={val => setAttributes({ image2_2x: val })} />
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
                        <div className="temp-wrapper">  {/** this tag or classname should be replaced  */}
                            <div className="image-container image-one">
                                {renderPlaceholder('A')}
                            </div>

                            <div className="image-container image-two">
                                {renderPlaceholder('B')}
                            </div>
                        </div>


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
                        {disableTitle &&
                            <RichText
                                tagName="span"
                                value={originalTitle}
                                keepPlaceholderOnFocus
                                placeholder={__('Original')}
                                className="comparison-image-text"
                                onChange={value => setAttributes({ originalTitle: value })}
                            />
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
                            {disableTitle &&
                                <RichText
                                    tagName="span"
                                    value={modifiedTitle}
                                    keepPlaceholderOnFocus
                                    placeholder={__('Modified')}
                                    className="comparison-image-text"
                                    onChange={value => setAttributes({ modifiedTitle: value })}
                                />
                            }
                        </div>
                        <span
                            class="comparison-scrollCircle"
                            onMouseDown={(event) => this.dragFunc(event)}
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