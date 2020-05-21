import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

/**
 * Portal 组件
 * @param {Object} props 属性对象
 */
function HomePortal(props) {
	return ReactDOM.createPortal(<div>Portal</div>, document.body); // 挂载到 body 下
}

/**
 * 子组件
 * @param {Object} props 属性对象
 */
function HomeChild(props) {
	return <div>Child</div>;
}

/**
 * 父组件
 */
class HomeParent extends PureComponent {
	/**
   * 把父组件的信息传递到子组件
   */
	getChild() {
		const { name, age, children } = this.props;

		if (!children) return null;

		return React.Children.map(children, (child) => {
			if (typeof child !== 'object') return child;

			return React.cloneElement(child, {
				name,
				age
			});
		});
	}

	render() {
		return this.getChild();
	}
}

export default class Home extends PureComponent {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		const dom = ReactDOM.findDOMNode(this); // 这个 API 基本用不到，一般都用 ref
		console.log(dom);
    console.log(this.myRef.current);
    console.log(this._width(dom))
	}

	/**
   * 计算元素宽度
   * @param {element} el 元素
   */
	_width = (el) => {
		const styles = el.ownerDocument.defaultView.getComputedStyle(el, null);
		const width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);
    const boxSizing = styles.boxSizing || 'content-box';

		if (boxSizing === 'border-box') {
			return width;
    }

		const borderLeftWidth = parseFloat(styles.borderLeftWidth);
		const borderRightWidth = parseFloat(styles.borderRightWidth);
		const paddingLeft = parseFloat(styles.paddingLeft);
    const paddingRight = parseFloat(styles.paddingRight);

		return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
	}

	render() {
		return (
			<div ref={this.myRef}>
				<HomeParent name="KokoTa" age="24">
					Parent
					<HomeChild id="1">A</HomeChild>
					<HomeChild id="2">B</HomeChild>
					<HomeChild id="3">C</HomeChild>
				</HomeParent>
				<HomePortal />
			</div>
		);
	}
}
