const { __ } = wp.i18n
import Edit from './Edit'
import Save from './Save'
const { registerBlockType } = wp.blocks
const { gloalSettings: { globalAttributes } } = wp.qubelyComponents

registerBlockType( 'qubely/counter', {
    title: __('Counter'),
    description: 'Set counters in your pages and posts with Qubely Counter.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin+'assets/img/blocks/block-counter.svg'} alt={__('Counter Block')} />,
    keywords: [ __('Counter'), __('Animated Number'), __('Count up'), ],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {
            counterLimit: 9999,
            postfix: '+',
            counterTypo: {
                openTypography: 1,
                size: {
                    md: 82,
                    unit: 'px'
                }
            },
        },
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,
        spacer: { type: 'object', default:{spaceTop: { md: '10', unit: "px"}, spaceBottom: { md: '10', unit: "px"}}, style: [{ selector: '{{QUBELY}}' }] },
        alignment: { type: 'object', default: {md: 'center'}, style: [{ selector: '{{QUBELY}} .qubely-block-counter {text-align: {{alignment}};}' }] },
        prefix: { type: 'string', default: '' },
        postfix: { type: 'string', default: '' },
        counterLimit: { type: 'string', default: "500" },
        counterDuration: { type: 'string', default: "500" },
        prepostTypo: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-counter-prefix, {{QUBELY}} .qubely-block-counter-postfix' }] },
        prepostColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-counter-prefix {color: {{prepostColor}};} {{QUBELY}} .qubely-block-counter-postfix {color: {{prepostColor}};}' }] },
        prepostSpacing: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-counter-prefix {margin-right: {{prepostSpacing}};} {{QUBELY}} .qubely-block-counter-postfix {margin-left: {{prepostSpacing}};}' }] },
        counterTypo: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}} .qubely-block-counter-content' }] },
        counterColor: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-block-counter-content {color: {{counterColor}};}' }] },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save
});
