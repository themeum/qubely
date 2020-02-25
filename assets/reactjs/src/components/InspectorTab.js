const { Fragment} = wp.element;

const InspectorTab = props => {
    const {children} = props;
    return (
        <Fragment>{Array.isArray(children) ? children.map(item => item) : children} </Fragment>
    )
}

export default InspectorTab