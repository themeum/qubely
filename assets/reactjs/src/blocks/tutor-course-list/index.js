const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

if ( ! qubely_admin.pro_enable ) {
    if ( '1' === qubely_admin.is_tutor_active ) {
        registerBlockType('qubely/tutor-course-list', {
            title: __('Course List'),
            description: 'Fetch Tutor Courses and display them beautifully with Qubely Tutor Course List Block.',
            icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-post-grid.svg'} alt={__('Tutor Course List Block')} />,
            category: 'qubely',
            supports: {
                align: ['center', 'wide', 'full'],
            },
            keywords: [
                __('Tutor'),
                __('Tutor Course List'),
                __('Courses'),
            ],
            example: {
                attributes: {
                    layout: 2,
                    column: {
                        md: 1
                    },
                    showExcerpt: false,
                    postsToShow: 1
                },
            },
            edit: function () {
                return 'Hello';
            },
            save: function (props) {
                return null;
            }
        });
    }
}