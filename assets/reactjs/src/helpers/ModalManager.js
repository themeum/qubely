const { __ } = wp.i18n
const { Component, Fragment } = wp.element


var onClose;

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            afterOpen: false,
            beforeClose: false,
        }
    }
    close() {
        if (!this.props.onRequestClose || this.props.onRequestClose()) {
            Manager.close()
        }
    }
    handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            Manager.close()
        }
    }
    componentDidMount() {
        const { openTimeoutMS, closeTimeoutMS } = this.props
        document.addEventListener('keydown', this.handleKeyDown)
        setTimeout(() => this.setState({ afterOpen: true }), openTimeoutMS ? openTimeoutMS : 150)

        onClose = (callback) => {
            this.setState({ beforeClose: true }, () => {
                this.closeTimer = setTimeout(callback, closeTimeoutMS ? closeTimeoutMS : 150)
            });
        };
    }
    componentWillUnmount() {
        onClose = null;
        clearTimeout(this.closeTimer)
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {

        return (
            <Fragment>
                <span onClick={e => { this.close() }} className="qubely-pagelist-modal-overlay">&nbsp;</span>
                <div className={`qubely-pagelist-modal-inner`} onClick={e => e.stopPropagation()}   >
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

var node;
const Manager = {
    open(component) {
        if (onClose) {
            throw __('There is already one modal.It must be closed before one new modal will be opened');
        }
        if (!node) {
            node = document.createElement('div')
            node.className = "qubely-builder-modal"
            document.body.appendChild(node)
        }
        wp.element.render(component, node)
        document.body.classList.add('qubely-builder-modal-open')
    },
    close() {
        onClose && onClose(() => {
            wp.element.unmountComponentAtNode(node)
            document.body.classList.remove('qubely-builder-modal-open')
        });
    },
}

module.exports = {
    Modal: Modal,
    ModalManager: Manager,
};
