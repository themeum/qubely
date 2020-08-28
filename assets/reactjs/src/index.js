const { __ } = wp.i18n;

import './components/FieldRender';
import './components/format-library';

import './editor.scss';
import './blocks/scss/style.scss';

import './blocks/row'                   // Row
import './blocks/row/column'            // Column
import './blocks/button'                // Button
import './blocks/text'                  // Text
import './blocks/icon'                  // Icon
import './blocks/map'                   // Map
import './blocks/divider'               // Divider
import './blocks/infobox'               // Info Box
import './blocks/image'                 // Image
import './blocks/testimonial'           // Testimonial
import './blocks/accordion'             // Accordion
import './blocks/heading'               // Heading Box
import './blocks/videopopup'            // Video popup
import './blocks/progressbar'           // Progress Bar
import './blocks/counter'               // counter
import './blocks/tabs'                  // Tabs
import './blocks/tabs/tab'              // Inner Tabs
import './blocks/socialicons'           // Social Icons
import './blocks/contactform'           // Contact Form
import './blocks/buttongroup'           // Button Group
import './blocks/advancedlist'          // Advanced List
import './blocks/iconlist'              // Icon List
import './blocks/wrapper'               // Wrapper
import './blocks/team'                  // Team
import './blocks/pricing'               // pricing
import './blocks/timeline'              // Timeline
import './blocks/postgrid'              // Postgrid
import './blocks/animatedheadline'      // Animated Headline
import './blocks/pieprogress'           // PieProgress
import './blocks/table-of-contents'
import './blocks/image-comparison'      // image-comparison


import './plugins';

// Global Settings
import './blocks/pagesettings'


window.qubelyDevice = 'md'
window.bindCss = false
window.globalData = {
    settings: {
        colorPreset1: qubely_admin.palette[0],
        colorPreset2: qubely_admin.palette[1],
        colorPreset3: qubely_admin.palette[2],
        colorPreset4: qubely_admin.palette[3],
        colorPreset5: qubely_admin.palette[4],
        colorPreset6: qubely_admin.palette[5],
    }
};
window.globalSaving = false

// Save CSS in Database/File
import ParseCss from './helpers/ParseCss';
wp.data.subscribe(() => {
    const {
        isPreviewingPost,
        isSavingPost,
        isAutosavingPost,
        isPublishingPost
    } = wp.data.select("core/editor");

    if (isPreviewingPost() || isPublishingPost() || (isSavingPost() && (!isAutosavingPost()))) {
        if (window.bindCss === false) {
            setTimeout(() => {
                ParseCss(isPreviewingPost() ? false : true);
            }, 600)

        }
    }
});
//UPDATE BLOCK CATEGORY ICON
wp.blocks.updateCategory('qubely', { icon: <img style={{ height: '20px', 'margin-top': '-2px' }} src={qubely_admin.plugin + 'assets/img/blocks/block-qubely.svg'} alt={__('Qubely')} /> });

//APPEND IMPORT LAYOUTS BUTTON TO POST HEADER TOOLBAR
import { ModalManager } from './helpers/ModalManager';
import PageListModal from './helpers/PageListModal';
document.addEventListener("DOMContentLoaded", appendImportButton);

function appendImportButton() {
    // let node = document.querySelector('.edit-post-header-toolbar');
    let node = document.querySelector('.edit-post-header__toolbar');
    let newElem = document.createElement('div');
    newElem.classList.add("qubely-import-wrapper");
    let html = '<div class="qubely-import-layout-btn-container">';
    html += `<button id="qubelyImportLayoutBtn" title=${__("Qubely")}><img src=${qubely_admin.plugin}assets/img/qubely-logo-white.svg alt=${__("Qubely")} /> ${__("Import Layout")}</button>`;
    html += '</div>';
    newElem.innerHTML = html;
    // node.appendChild(newElem);
    node.insertBefore(newElem, node.childNodes[0]);
    document.getElementById("qubelyImportLayoutBtn").addEventListener("click", qubelyImportLayout);
}
function qubelyImportLayout() {
    ModalManager.open(<PageListModal rowClientId={false} />);
}
