

const { __ } = wp.i18n
const { Component } = wp.element;
const { Toolbar } = wp.components;

import HeadingLevelIcon from './headingIcon';

class HeadingToolbar extends Component {
    createLevelControl(targetLevel, selectedLevel, onChange) {
        const isActive = targetLevel === selectedLevel;
        return {
            icon: <HeadingLevelIcon level={targetLevel} isPressed={isActive} />,
            title: __(`Heading ${targetLevel}`),
            isActive,
            onClick: () => onChange(targetLevel),
        };
    }

    headingLevels(minLevel, maxLevel) {
        let headingLevels = [];

        for (let level = minLevel; level <= maxLevel; level++) {
            headingLevels.push(level)
        }
        return headingLevels;
    }

    render() {
        const { isCollapsed = true, minLevel, maxLevel, selectedLevel, onChange } = this.props;

        return (
            <Toolbar
                isCollapsed={isCollapsed}
                icon={<HeadingLevelIcon level={selectedLevel} />}
                controls={this.headingLevels(minLevel, maxLevel).map(
                    (index) => this.createLevelControl(index, selectedLevel, onChange)
                )} />
        );
    }
}

export default HeadingToolbar;
