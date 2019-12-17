const { __ } = wp.i18n;
const icons = {};
const img_path = qubely_admin.plugin + 'assets/img/blocks';

icons.qubely = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 8c0-2.2-.8-4-2.3-5.5-1.5-1.5-3.4-2.3-5.5-2.3s-4 .8-5.5 2.3c-1.5 1.5-2.3 3.3-2.3 5.5s.8 4 2.3 5.5c1.5 1.5 3.3 2.3 5.5 2.3.9 0 1.8-.1 2.6-.4l-2.2-2.3c-.1-.1-.3-.2-.4-.2-1.4 0-2.5-.5-3.4-1.4-1-.9-1.4-2.1-1.4-3.5s.5-2.6 1.4-3.5c.9-.9 2-1.4 3.4-1.4s2.5.5 3.4 1.4c.9.9 1.4 2.1 1.4 3.5 0 .7-.1 1.4-.4 2-.2.5-.8.6-1.2.2-1.1-1.1-2.8-1.2-4-.2l2.5 2.6 2.1 2.2c.9.9 2.4 1 3.4.1l.3-.3-1.3-1.3c-.2-.2-.2-.4 0-.6 1-1.3 1.6-2.9 1.6-4.7z" /></svg>;

icons.solid = <svg xmlns="http://www.w3.org/2000/svg" width="19" height="2"><switch><g><path d="M0 0h19v2H0z" /></g></switch></svg>;
icons.dot = <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="18" height="2"><switch><g><g><g transform="translate(-1378 -121)"><g transform="translate(1229 110)"><g transform="translate(149 11)"><circle class="st0" cx="1" cy="1" r="1" /><circle class="st0" cx="17" cy="1" r="1" /><circle class="st0" cx="5" cy="1" r="1" /><circle class="st0" cx="13" cy="1" r="1" /><circle class="st0" cx="9" cy="1" r="1" /></g></g></g></g></g></switch></svg>;
icons.dash = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="2"><switch><g><path d="M18 2h-2V0h2v2zm-4 0h-2V0h2v2zm-4 0H8V0h2v2zM6 2H4V0h2v2zM2 2H0V0h2v2z" /></g></switch></svg>;
icons.wave = <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4"><switch><g><path d="M8 3.5c-.8 0-1.7-.3-2.5-.9C4 1.5 2.4 1.5.7 2.6c-.2.1-.5.1-.7-.2-.1-.2-.1-.5.2-.7 2-1.3 4-1.3 5.8 0 1.5 1 2.8 1 4.2-.2 1.6-1.4 3.4-1.4 5.3 0 1.5 1.1 3.1 1.2 4.7.1.2-.1.5-.1.7.1.1.2.1.5-.1.7-2 1.3-3.9 1.3-5.8-.1-1.5-1.1-2.9-1.1-4.1 0C9.9 3.1 9 3.5 8 3.5z" /></g></switch></svg>;

icons.vertical_top = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1)" fill="none"><rect class="qubely-svg-fill" x="4" y="4" width="6" height="12" rx="1" /><path class="qubely-svg-stroke" d="M0 1h14" stroke-width="2" stroke-linecap="square" /></g></svg>;
icons.vertical_middle = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none"><g transform="translate(1 1)"><rect class="qubely-svg-fill" x="4" width="6" height="14" rx="1" /><path d="M0 7h2" class="qubely-svg-stroke" stroke-width="2" stroke-linecap="square" /></g><path d="M13 8h2" class="qubely-svg-stroke" stroke-width="2" stroke-linecap="square" /></g></svg>;
icons.vertical_bottom = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1)" fill="none"><rect class="qubely-svg-fill" x="4" width="6" height="12" rx="1" /><path d="M0 15h14" class="qubely-svg-stroke" stroke-width="2" stroke-linecap="square" /></g></svg>;

icons.icon_classic = <img src={`${img_path}/icon/classic.svg`} alt={__('Classic')} />;
icons.icon_fill = <img src={`${img_path}/icon/fill.svg`} alt={__('Fill')} />;
icons.icon_line = <img src={`${img_path}/icon/outline.svg`} alt={__('Underline')} />;

icons.btn_fill = <img src={`${img_path}/button/fill.svg`} alt={__('Fill')} />;
icons.btn_outline = <img src={`${img_path}/button/outline.svg`} alt={__('Outline')} />;

icons.pie_fill = <img src={`${img_path}/pieprogress/fill.svg`} alt={__('Fill')} />;
icons.pie_outline = <img src={`${img_path}/pieprogress/outline.svg`} alt={__('Outline')} />;
icons.pie_outline_fill = <img src={`${img_path}/pieprogress/outline-fill.svg`} alt={__('Outline Fill')} />;

icons.corner_square = <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h10.967v10.763" stroke-width="2" className="qubely-svg-stroke" fill="none" /></svg>;
icons.corner_rounded = <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h6.967c2.209 0 4 1.791 4 4v6.763" stroke-width="2" className="qubely-svg-stroke" fill="none" /></svg>;
icons.corner_round = <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h1.967c4.971 0 9 4.029 9 9v1.763" stroke-width="2" className="qubely-svg-stroke" fill="none" /></svg>;

icons.tab_tabs = <img src={`${img_path}/tab/tabs.svg`} alt={__('Tabs')} />;
icons.tab_pills = <img src={`${img_path}/tab/pills.svg`} alt={__('Pills')} />;
icons.tab_underline = <img src={`${img_path}/tab/underline.svg`} alt={__('Underline')} />;

icons.social_normal = <img src={`${img_path}//socialicon/normal.svg`} alt={__('Normal')} />;
icons.social_fill = <img src={`${img_path}//socialicon/fill.svg`} alt={__('Fill')} />;

icons.accordion_fill = <img src={`${img_path}/accordion/fill.svg`} alt={__('Fill')} />;
icons.accordion_classic = <img src={`${img_path}/accordion/classic.svg`} alt={__('Classic')} />;

icons.infobox_1 = <img src={`${img_path}/infobox/1.svg`} alt={__('Layout 1')} />;
icons.infobox_2 = <img src={`${img_path}/infobox/2.svg`} alt={__('Layout 2')} />;
icons.infobox_3 = <img src={`${img_path}/infobox/3.svg`} alt={__('Layout 3')} />;
icons.infobox_4 = <img src={`${img_path}/infobox/4.svg`} alt={__('Layout 4')} />;

icons.testimonial_1 = <img src={`${img_path}/testimonial/1.svg`} alt={__('Testimonial 1')} />;
icons.testimonial_2 = <img src={`${img_path}/testimonial/2.svg`} alt={__('Testimonial 2')} />;
icons.testimonial_3 = <img src={`${img_path}/testimonial/3.svg`} alt={__('Testimonial 3')} />;
icons.avatar_left = <img src={`${img_path}/testimonial/avatars/1.svg`} alt={__('Avatar Left')} />;
icons.avatar_right = <img src={`${img_path}/testimonial/avatars/2.svg`} alt={__('Avatar Right')} />;
icons.avatar_top = <img src={`${img_path}/testimonial/avatars/3.svg`} alt={__('Avatar Top')} />;
icons.avatar_bottom = <img src={`${img_path}/testimonial/avatars/4.svg`} alt={__('Avatar Bottom')} />;

icons.team_1 = <img src={`${img_path}/team/1.svg`} alt={__('Layout 1')} />;
icons.team_2 = <img src={`${img_path}/team/2.svg`} alt={__('Layout 2')} />;
icons.team_3 = <img src={`${img_path}/team/3.svg`} alt={__('Layout 3')} />;

icons.list_fill = <img src={`${img_path}/list/1.svg`} alt={__('Fill')} />;
icons.list_classic = <img src={`${img_path}/list/2.svg`} alt={__('Classic')} />;

icons.form_classic = <img src={`${img_path}/form/classic.svg`} alt={__('Classic')} />;
icons.form_material = <img src={`${img_path}/form/material.svg`} alt={__('Material')} />;

icons.videopopup_fill = <img src={`${img_path}/videopopup/fill.svg`} alt={__('Fill')} />;
icons.videopopup_classic = <img src={`${img_path}/videopopup/classic.svg`} alt={__('Classic')} />;

icons.postgrid_1 = <img src={`${img_path}/postgrid/1.svg`} alt={__('Layout 1')} />;
icons.postgrid_2 = <img src={`${img_path}/postgrid/2.svg`} alt={__('Layout 2')} />;
icons.postgrid_3 = <img src={`${img_path}/postgrid/pro1.svg`} alt={__('Layout 3')} />;
icons.postgrid_4 = <img src={`${img_path}/postgrid/pro2.svg`} alt={__('Layout 4')} />;
icons.postgrid_5 = <img src={`${img_path}/postgrid/pro3.svg`} alt={__('Layout 4')} />;
icons.postgrid_design_1 = <img src={`${img_path}/postgrid/11.svg`} alt={__('Design 1')} />;
icons.postgrid_design_2 = <img src={`${img_path}/postgrid/12.svg`} alt={__('Design 2')} />;
icons.postgrid_design_3 = <img src={`${img_path}/postgrid/13.svg`} alt={__('Design 3')} />;
icons.postgrid_design_4 = <img src={`${img_path}/postgrid/14.svg`} alt={__('Design 4')} />;
icons.postgrid_design_5 = <img src={`${img_path}/postgrid/15.svg`} alt={__('Design 5')} />;
icons.postgrid_design_6 = <img src={`${img_path}/postgrid/16.svg`} alt={__('Design 6')} />;


icons.h1 = <svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill" fill-rule="nonzero"><path d="M10.83 13h-2.109v-5.792h-5.924v5.792h-2.101v-12.85h2.101v5.256h5.924v-5.256h2.109z" /><path d="M16.809 13h-1.147v-4.609c0-.55.013-.986.039-1.309l-.276.259c-.109.094-.474.394-1.096.898l-.576-.728 2.1-1.65h.957v7.139z" /></g></svg>;
icons.h2 = <svg width="19" height="13" viewBox="0 0 19 13" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill" fill-rule="nonzero"><path d="M10.83 13h-2.109v-5.792h-5.924v5.792h-2.101v-12.85h2.101v5.256h5.924v-5.256h2.109z" /><path d="M18.278 13h-4.839v-.869l1.841-1.851c.544-.557.904-.951 1.082-1.184.177-.233.307-.452.388-.657.081-.205.122-.425.122-.659 0-.322-.097-.576-.291-.762-.194-.186-.461-.278-.803-.278-.273 0-.538.05-.793.151-.256.101-.551.283-.886.547l-.62-.757c.397-.335.783-.573 1.157-.713s.773-.21 1.196-.21c.664 0 1.196.173 1.597.52.4.347.601.813.601 1.399 0 .322-.058.628-.173.918-.116.29-.293.588-.532.896-.239.308-.637.723-1.194 1.248l-1.24 1.201v.049h3.389v1.011z" /></g></svg>;
icons.h3 = <svg width="19" height="14" viewBox="0 0 19 14" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill" fill-rule="nonzero"><path d="M10.83 13h-2.109v-5.792h-5.924v5.792h-2.101v-12.85h2.101v5.256h5.924v-5.256h2.109z" /><path d="M18.01 7.502c0 .452-.132.829-.396 1.13-.264.301-.635.504-1.113.608v.039c.573.072 1.003.25 1.289.535.286.285.43.663.43 1.135 0 .687-.243 1.217-.728 1.589-.485.373-1.175.559-2.07.559-.791 0-1.458-.129-2.002-.386v-1.021c.303.15.623.265.962.347.339.081.664.122.977.122.553 0 .967-.103 1.24-.308.273-.205.41-.522.41-.952 0-.381-.151-.661-.454-.84-.303-.179-.778-.269-1.426-.269h-.62v-.933h.63c1.139 0 1.709-.394 1.709-1.182 0-.306-.099-.542-.298-.708-.199-.166-.492-.249-.879-.249-.27 0-.531.038-.781.115-.251.076-.547.225-.889.447l-.562-.801c.654-.482 1.414-.723 2.28-.723.719 0 1.281.155 1.685.464.404.309.605.736.605 1.279z" /></g></svg>;
icons.h4 = <svg width="19" height="13" viewBox="0 0 19 13" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill" fill-rule="nonzero"><path d="M10.83 13h-2.109v-5.792h-5.924v5.792h-2.101v-12.85h2.101v5.256h5.924v-5.256h2.109z" /><path d="M18.532 11.442h-.962v1.558h-1.118v-1.558h-3.262v-.884l3.262-4.717h1.118v4.648h.962v.952zm-2.08-.952v-1.792c0-.638.016-1.16.049-1.567h-.039c-.091.215-.234.475-.43.781l-1.772 2.578h2.192z" /></g></svg>;
icons.h5 = <svg width="19" height="14" viewBox="0 0 19 14" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill" fill-rule="nonzero"><path d="M10.83 13h-2.109v-5.792h-5.924v5.792h-2.101v-12.85h2.101v5.256h5.924v-5.256h2.109z" /><path d="M15.861 8.542c.719 0 1.289.19 1.709.571.42.381.63.9.63 1.558 0 .762-.238 1.357-.715 1.785-.477.428-1.155.642-2.034.642-.798 0-1.424-.129-1.88-.386v-1.04c.264.15.566.265.908.347.342.081.659.122.952.122.518 0 .911-.116 1.182-.347.27-.231.405-.57.405-1.016 0-.853-.544-1.279-1.631-1.279-.153 0-.342.015-.566.046-.225.031-.422.066-.591.105l-.513-.303.273-3.486h3.711v1.021h-2.7l-.161 1.768.417-.068c.164-.026.365-.039.603-.039z" /></g></svg>;
icons.h6 = <svg width="19" height="14" viewBox="0 0 19 14" xmlns="http://www.w3.org/2000/svg"><g className="qubely-svg-fill" fill-rule="nonzero"><path d="M10.83 13h-2.109v-5.792h-5.924v5.792h-2.101v-12.85h2.101v5.256h5.924v-5.256h2.109z" /><path d="M13.459 9.958c0-2.793 1.138-4.189 3.413-4.189.358 0 .661.028.908.083v.957c-.247-.072-.534-.107-.859-.107-.765 0-1.34.205-1.724.615-.384.41-.592 1.068-.625 1.973h.059c.153-.264.368-.468.645-.613.277-.145.602-.217.977-.217.648 0 1.152.199 1.514.596.361.397.542.936.542 1.616 0 .749-.209 1.34-.627 1.775-.418.435-.989.652-1.711.652-.511 0-.955-.123-1.333-.369s-.668-.604-.872-1.074c-.203-.47-.305-1.036-.305-1.697zm2.49 2.192c.394 0 .697-.127.911-.381.213-.254.32-.617.32-1.089 0-.41-.1-.732-.3-.967-.2-.234-.5-.352-.901-.352-.247 0-.475.053-.684.159-.208.106-.373.251-.493.435s-.181.372-.181.564c0 .459.125.846.374 1.16.249.314.567.471.955.471z" /></g></svg>;
icons.p = <svg width="20px" height="20px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1534 189v73q0 29-18.5 61t-42.5 32q-50 0-54 1-26 6-32 31-3 11-3 64v1152q0 25-18 43t-43 18h-108q-25 0-43-18t-18-43v-1218h-143v1218q0 25-17.5 43t-43.5 18h-108q-26 0-43.5-18t-17.5-43v-496q-147-12-245-59-126-58-192-179-64-117-64-259 0-166 88-286 88-118 209-159 111-37 417-37h479q25 0 43 18t18 43z" /></svg>
icons.span = <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20px" height="20px" /><g><path d="M9 6l-4 4 4 4-1 2-6-6 6-6zm2 8l4-4-4-4 1-2 6 6-6 6z" /></g></svg>
icons.div = <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20px" height="20px" /><g><path d="M9 6l-4 4 4 4-1 2-6-6 6-6zm2 8l4-4-4-4 1-2 6 6-6 6z" /></g></svg>

icons.pricing = {
    1: <img src={`${img_path}/pricing/1.svg`} alt={__('Layout 1')} />,
    2: <img src={`${img_path}/pricing/2.svg`} alt={__('Layout 2')} />,
    3: <img src={`${img_path}/pricing/3.svg`} alt={__('Layout 3')} />,
    4: <img src={`${img_path}/pricing/4.svg`} alt={__('Layout 4')} />,
    5: <img src={`${img_path}/pricing/5.svg`} alt={__('Layout 5')} />,
    6: <img src={`${img_path}/pricing/6.svg`} alt={__('Layout 6')} />
}

icons.pricing.badge = {
    1: <img src={`${img_path}/pricing/badges/1.svg`} alt={__('Badge 1')} />,
    2: <img src={`${img_path}/pricing/badges/2.svg`} alt={__('Badge 2')} />,
    3: <img src={`${img_path}/pricing/badges/3.svg`} alt={__('Badge 3')} />,
    4: <img src={`${img_path}/pricing/badges/4.svg`} alt={__('Badge 4')} />,
    5: <img src={`${img_path}/pricing/badges/5.svg`} alt={__('Badge 5')} />,
    6: <img src={`${img_path}/pricing/badges/6.svg`} alt={__('Badge 6')} />,
}

icons.image = {
    simple: <img src={`${img_path}/image/simple.svg`} alt={__('Simple')} />,
    blurb: <img src={`${img_path}/image/blurb.svg`} alt={__('Blurb')} />
}

icons.copy = <svg width="20px" height="15px" viewBox="0 0 1792 1792" class="dashicon" xmlns="http://www.w3.org/2000/svg"><path d="M1696 384q40 0 68 28t28 68v1216q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-288h-544q-40 0-68-28t-28-68v-672q0-40 20-88t48-76l408-408q28-28 76-48t88-20h416q40 0 68 28t28 68v328q68-40 128-40h416zm-544 213l-299 299h299v-299zm-640-384l-299 299h299v-299zm196 647l316-316v-416h-384v416q0 40-28 68t-68 28h-416v640h512v-256q0-40 20-88t48-76zm956 804v-1152h-384v416q0 40-28 68t-68 28h-416v640h896z" /></svg>
icons.paste = <svg width="20px" height="15px" viewBox="0 0 1792 1792" class="dashicon" xmlns="http://www.w3.org/2000/svg"><path d="M768 1664h896v-640h-416q-40 0-68-28t-28-68v-416h-384v1152zm256-1440v-64q0-13-9.5-22.5t-22.5-9.5h-704q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h704q13 0 22.5-9.5t9.5-22.5zm256 672h299l-299-299v299zm512 128v672q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-544q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h1088q40 0 68 28t28 68v328q21 13 36 28l408 408q28 28 48 76t20 88z" /></svg>

icons.spacing = {
    top: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#2184F9" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>,
    right: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#2184F9" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>,
    bottom: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#2184F9" d="M3 20h16v2h-16z" /></g></svg>,
    left: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#2184F9" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>
}

icons.border = {
    top: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#2184F9" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>,
    right: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#2184F9" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>,
    bottom: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#CACCCE" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#2184F9" d="M3 20h16v2h-16z" /></g></svg>,
    left: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#2184F9" d="M0 3h2v16h-2z" /><path fill="#CACCCE" d="M20 3h2v16h-2z" /><path fill="#CACCCE" d="M3 0h16v2h-16z" /><path fill="#CACCCE" d="M3 20h16v2h-16z" /></g></svg>
}

icons.borderRadius = {
    topLeft: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71z" id="Path" fill="#2184F9" /><path d="M13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71zM1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77zM13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z" fill="#CACCCE" /></g></svg>,
    topRight: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71z" id="Path" fill="#CACCCE" /><path d="M13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71z" id="Path" fill="#2184F9" /><path d="M1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77zM13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z" fill="#CACCCE" /></g></svg>,
    bottomRight: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71zM13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71zM1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77z" id="Path" fill="#CACCCE" /><path d="M13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z" fill="#2184F9" /></g></svg>,
    bottomLeft: <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71zM13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71z" id="Path" fill="#CACCCE" /><path d="M1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77z" id="Path" fill="#2184F9" /><path d="M13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z" fill="#CACCCE" /></g></svg>
}

icons.inlineColorIcon = <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-editor-textcolor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M13.23 15h1.9L11 4H9L5 15h1.88l1.07-3h4.18zm-1.53-4.54H8.51L10 5.6z"></path></svg>
icons.highlighterIcon = <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-admin-customizer" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 20 20"><path d="M18.33 3.57s.27-.8-.31-1.36c-.53-.52-1.22-.24-1.22-.24-.61.3-5.76 3.47-7.67 5.57-.86.96-2.06 3.79-1.09 4.82.92.98 3.96-.17 4.79-1 2.06-2.06 5.21-7.17 5.5-7.79zM1.4 17.65c2.37-1.56 1.46-3.41 3.23-4.64.93-.65 2.22-.62 3.08.29.63.67.8 2.57-.16 3.46-1.57 1.45-4 1.55-6.15.89z"></path></svg>
icons.upperCaseIcon = <svg viewBox="0 0 20 20" height="25" width="25" xmlns="http://www.w3.org/2000/svg" ><mask id="a" fill="#fff"><path d="m20 20h-20v-20h20z" fill="#fff" fill-rule="evenodd" /></mask><path d="m2 3v2.5h4.16666667v10.5h2.5v-10.5h4.16666663v-2.5zm16 4.5h-7.5v2.5h2.5v6h2.5v-6h2.5z" mask="url(#a)" /></svg>

icons.arrow_down = <svg width="18" height="18" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" /></svg>
icons.arrow_up = <svg width="18" height="18" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>

export default icons;