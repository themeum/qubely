const { Component } = wp.element
class Counter extends Component {
	constructor(props) {
		super(props)
		const { number, counterDuration } = this.props
		this.state = {
			count: 0,
			upperLimit: number,
			counterDuration: counterDuration,
			increment: Math.ceil((number / counterDuration) * 10)
		};
	}
	componentDidMount() {
		if (this.state.count < this.props.number) {
			this.intervalId = setInterval(this.findNextNumber, 10)
		}
	}
	componentWillReceiveProps(nextProps) {
		clearInterval(this.intervalId);
		if (this.state.count != nextProps.number || this.state.counterDuration != nextProps.counterDuration) {
			this.setState({
				upperLimit: nextProps.number,
				count: 0,
				counterDuration: nextProps.counterDuration,
				increment: Math.ceil((nextProps.number / nextProps.counterDuration) * 10)
			})
			this.intervalId = setInterval(this.findNextNumber, 10);
		}

	}
	isDone = () => {
		if (this.state.count == this.state.upperLimit) { clearInterval(this.intervalId); }
	}
	findNextNumber = () => {
		const { count, upperLimit, increment } = this.state
		let difference = upperLimit - count
		this.setState({ count: difference >= increment ? count + increment : difference >= 50 ? count + 50 : count + 1 });
		this.isDone();
	}

	render() {
		return this.state.count;
	}
}

export default Counter