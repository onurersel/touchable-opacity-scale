import React from "react"
import { Animated, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"

class TouchableOpacityScale extends React.Component {
	constructor(props){
		super(props)
		
		this._avScale = new Animated.Value(1)
		
		this._inHandler = this._inHandler.bind(this)
		this._outHandler= this._outHandler.bind(this)
	}
	
	_inHandler() {
		const scale = this.props.scale || 0.95
		Animated.timing(this._avScale, {
			toValue: scale,
			duration: 50,
			useNativeDriver: true,
		}).start()

		if (this.props.onPressIn) {
			this.props.onPressIn()
		}
	}
	
	_outHandler() {
		Animated.timing(this._avScale, {
			toValue: 1,
			duration: 80,
			useNativeDriver: true,
		}).start()

		if (this.props.onPressOut) {
			this.props.onPressOut()
		}
	}
	
	render() {
		const {style, ...rest} = this.props
		const scaleStyle = {transform: [{scale:this._avScale}]}
		return (
			<TouchableOpacity
				{...rest}
				onPressIn={this._inHandler}
				onPressOut={this._outHandler}
				style={[style, scaleStyle]} >
				{this.props.children}
			</TouchableOpacity>
		)
	}
}

TouchableOpacityScale.propTypes = {
	scale: PropTypes.number,
}

export default TouchableOpacityScale