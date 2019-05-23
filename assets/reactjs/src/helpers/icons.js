const { __ } = wp.i18n;
const icons = {};
const img_block = qubely_admin.plugin + 'assets/img/blocks/';
const img_com = qubely_admin.plugin + 'assets/img/com/';

icons.qubely = <img src={`${img_com}logo-white.svg`} alt={__('Global Settings')} />;

icons.vertical_top = <img src={`${img_com}vertical-top.svg`} alt={__('Vertical Top')} />
icons.vertical_middle = <img src={`${img_com}vertical-middle.svg`} alt={__('Vertical Middle')} />
icons.vertical_bottom = <img src={`${img_com}vertical-bottom.svg`} alt={__('Vertical Bottom')} />

icons.icon_classic = <img src={`${img_block}icon/classic.svg`} alt={__('Classic')} />;
icons.icon_fill = <img src={`${img_block}icon/fill.svg`} alt={__('Fill')} />;
icons.icon_line = <img src={`${img_block}icon/outline.svg`} alt={__('Underline')} />;

icons.btn_fill = <img src={`${img_block}button/fill.svg`} alt={__('Fill')} />;
icons.btn_outline = <img src={`${img_block}button/outline.svg`} alt={__('Outline')} />;

icons.tab_tabs = <img src={`${img_block}tab/tabs.svg`} alt={__('Tabs')} />;
icons.tab_pills = <img src={`${img_block}tab/pills.svg`} alt={__('Pills')} />;
icons.tab_underline = <img src={`${img_block}tab/underline.svg`} alt={__('Underline')} />;

icons.social_normal = <img src={`${img_block}socialicon/normal.svg`} alt={__('Normal')} />;
icons.social_fill = <img src={`${img_block}socialicon/fill.svg`} alt={__('Fill')} />;

icons.accordion_fill = <img src={`${img_block}accordion/fill.svg`} alt={__('Fill')} />;
icons.accordion_classic = <img src={`${img_block}accordion/classic.svg`} alt={__('Classic')} />;

icons.infobox_1 = <img src={`${img_block}infobox/1.svg`} alt={__('Layout 1')} />;
icons.infobox_2 = <img src={`${img_block}infobox/2.svg`} alt={__('Layout 2')} />;
icons.infobox_3 = <img src={`${img_block}infobox/3.svg`} alt={__('Layout 3')} />;
icons.infobox_4 = <img src={`${img_block}infobox/4.svg`} alt={__('Layout 4')} />;

icons.testimonial_1 = <img src={`${img_block}testimonial/1.svg`} alt={__('Testimonial 1')} />;
icons.testimonial_2 = <img src={`${img_block}testimonial/2.svg`} alt={__('Testimonial 2')} />;
icons.avatar_left = <img src={`${img_block}testimonial/avatars/1.svg`} alt={__('Avatar Left')} />;
icons.avatar_right = <img src={`${img_block}testimonial/avatars/2.svg`} alt={__('Avatar Right')} />;
icons.avatar_top = <img src={`${img_block}testimonial/avatars/3.svg`} alt={__('Avatar Top')} />;
icons.avatar_bottom = <img src={`${img_block}testimonial/avatars/4.svg`} alt={__('Avatar Bottom')} />;

icons.team_1 = <img src={`${img_block}team/1.svg`} alt={__('Layout 1')} />;
icons.team_2 = <img src={`${img_block}team/2.svg`} alt={__('Layout 2')} />;
icons.team_3 = <img src={`${img_block}team/3.svg`} alt={__('Layout 3')} />;

icons.list_fill = <img src={`${img_block}list/1.svg`} alt={__('Fill')} />;
icons.list_classic = <img src={`${img_block}list/2.svg`} alt={__('Classic')} />;

icons.form_classic = <img src={`${img_block}form/classic.svg`} alt={__('Classic')} />;
icons.form_material = <img src={`${img_block}form/material.svg`} alt={__('Material')} />;

icons.videopopup_fill = <img src={`${img_block}videopopup/fill.svg`} alt={__('Fill')} />;
icons.videopopup_classic = <img src={`${img_block}videopopup/classic.svg`} alt={__('Classic')} />;

icons.h1 = <img src={`${img_com}h1.svg`} alt={__('H1')} />
icons.h2 = <img src={`${img_com}h2.svg`} alt={__('H2')} />
icons.h3 = <img src={`${img_com}h3.svg`} alt={__('H3')} />
icons.h4 = <img src={`${img_com}h4.svg`} alt={__('H4')} />
icons.h5 = <img src={`${img_com}h5.svg`} alt={__('H5')} />
icons.h6 = <img src={`${img_com}h6.svg`} alt={__('H6')} />
icons.p = <img src={`${img_com}p.svg`} alt={__('p')} />
icons.span = <img src={`${img_com}span.svg`} alt={__('span')} />
icons.div = <img src={`${img_com}div.svg`} alt={__('div')} />

icons.pricing = {
    1: <img src={`${img_block}pricing/1.svg`} alt={__('Pricing Layout 1')} />,
    2: <img src={`${img_block}pricing/2.svg`} alt={__('Pricing Layout 2')} />,
    3: <img src={`${img_block}pricing/3.svg`} alt={__('Pricing Layout 3')} />,
    4: <img src={`${img_block}pricing/4.svg`} alt={__('Pricing Layout 4')} />,
    5: <img src={`${img_block}pricing/5.svg`} alt={__('Pricing Layout 5')} />,
    6: <img src={`${img_block}pricing/6.svg`} alt={__('Pricing Layout 6')} />
}

icons.copy = <img src={`${img_com}copy.svg`} alt={__('Copy')} />
icons.paste = <img src={`${img_com}paste.svg`} alt={__('Paste')} />

icons.spacing = {
    top: <img src={`${img_com}spacing-top.svg`} alt={__('Spacing Top')} />,
    right: <img src={`${img_com}spacing-right.svg`} alt={__('Spacing Right')} />,
    bottom: <img src={`${img_com}spacing-bottom.svg`} alt={__('Spacing Bottom')} />,
    left: <img src={`${img_com}spacing-left.svg`} alt={__('Spacing Left')} />
}

icons.border = {
    top: <img src={`${img_com}border-top.svg`} alt={__('Border Top')} />,
    right: <img src={`${img_com}border-right.svg`} alt={__('Border Right')} />,
    bottom: <img src={`${img_com}border-bottom.svg`} alt={__('Border Bottom')} />,
    left: <img src={`${img_com}border-left.svg`} alt={__('Border Left')} />
}

icons.borderRadius = {
    topLeft: <img src={`${img_com}radius-top-left.svg`} alt={__('Border Radius Top Left')} />,
    topRight: <img src={`${img_com}radius-top-right.svg`} alt={__('Border Radius Top Right')} />,
    bottomRight: <img src={`${img_com}radius-bottom-right.svg`} alt={__('Border Radius Bottom Right')} />,
    bottomLeft: <img src={`${img_com}radius-bottom-left.svg`} alt={__('Border Radius Bottom Left')} />
}

icons.inlineColorIcon = <img src={`${img_com}inline-color-icon.svg`} alt={__('Inline Color')} />
icons.highlighterIcon = <img src={`${img_com}highlighter-icon.svg`} alt={__('Highlighter Icon')} />
icons.upperCaseIcon = <img src={`${img_com}uppercase-icon.svg`} alt={__('Upper Case Icon')} />

icons.border_global = <img src={`${img_com}border-global.svg`} alt={__('Border Global')} />
icons.border_custom = <img src={`${img_com}border-custom.svg`} alt={__('Border Custom')} />

icons.radius_global = <img src={`${img_com}radius-global.svg`} alt={__('Border Radius Global')} />
icons.radius_custom = <img src={`${img_com}radius-custom.svg`} alt={__('Border Radius Custom')} />

export default icons;