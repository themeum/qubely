
export const animationAttr = ( data ) => {
    if( typeof data !== 'undefined' && typeof data.name !== 'undefined' && data.openAnimation ){
        return { 'data-qubelyanimation': JSON.stringify( data ) }
    }else{
        return {}
    }
}

// Select Option Generator
export const selectValue = ( data ) => {
    return data.map( (val) => { return { value: val, label: val } })
}

export const isObject = ( obj ) => typeof obj === 'function' || typeof obj === 'object' && !!obj;
export const isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]';


export const setValue = ( defaultVal, key ) => {
    let data = {}
    defaultVal.forEach(val=>data[val]=false)
    if( key ){
        let innerData = {}
        key.forEach(val=>innerData[val]=true)
        return Object.assign( {}, data, innerData )
    }else{
        return data
    }
}


export const videoBackground = ( settings ) => {
    if( settings.bgType == 'video' ){
        if( settings.videoSource == 'local' ){
            if( settings.bgVideo && settings.bgVideo.url ){
                return (
                    <div className="qubely-video-bg-wrap">
                        <video className="qubely-video-bg" autoPlay muted loop>
                            <source src={settings.bgVideo.url} />
                        </video>
                    </div>
                )
            }
        }
        if( settings.videoSource == 'external' ){
            if( settings.bgExternalVideo ){
                let video = settings.bgExternalVideo,
                    src = '';
                if ( video.match('youtube|youtu\.be') ) {
                    let id = 0;
                    if( video.match('embed') ) { id = video.split(/embed\//)[1].split('"')[0]; }
                    else{ id = video.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]; }
                    src = '//www.youtube.com/embed/'+id+'?playlist='+id+'&iv_load_policy=3&enablejsapi=1&disablekb=1&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&wmode=transparent&widgetid=1';
                } else if (video.match('vimeo\.com')) {
                    let id = video.split(/video\/|https:\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
                    src = "//player.vimeo.com/video/"+id+"?autoplay=1&loop=1&title=0&byline=0&portrait=0"
                }
                return (
                    <div className="qubely-video-bg-wrap"><iframe src={src} frameBorder="0" allowFullScreen></iframe></div>
                )
            }
        }
    }
}

export const IsInteraction = (interaction) => {
    return (typeof interaction.while_scroll_into_view !== 'undefined' && interaction.while_scroll_into_view.enable === true) || (typeof interaction.mouse_movement !== 'undefined' && interaction.mouse_movement.enable === true)
}

export const _equal = ( value, other ) => {
    const isEqual = (value, other) => {
        const type = Object.prototype.toString.call(value);
        if (type !== Object.prototype.toString.call(other)) return false;

        if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

        const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) return false;
        const compare = (item1, item2) => {
            var itemType = Object.prototype.toString.call(item1);
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!isEqual(item1, item2)) return false;
            }
            else {
                if (itemType !== Object.prototype.toString.call(item2)) return false;
                if (itemType === '[object Function]') {
                    if (item1.toString() !== item2.toString()) return false;
                } else {
                    if (item1 !== item2) return false;
                }

            }
        }
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false) return false;
            }
        } else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false) return false;
                }
            }
        }
        return true;
    };
    return isEqual(value, other);
}

export const parseResponsiveViewPort = () => {
    let responsive = [
        { viewport: 1170 },
        { viewport: 980 },
        { viewport: 580 }
    ]
    if (typeof responsive === 'undefined')
        return
    let activeView = null

    for (let i = 0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].viewport) {
            activeView = responsive[i]
            break;
        }
    }
    if (activeView === null) {
        activeView = responsive[responsive.length - 1]
    }
    return activeView.viewport <= 1199 ? activeView.viewport <= 991 ? 'xs' : 'sm' : 'md'
}

export const copyToClipboard = (string) => {
    const textField = document.createElement('textarea')
    textField.innerText = string
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
}