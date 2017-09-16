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
	}
	
	_outHandler() {
		Animated.timing(this._avScale, {
			toValue: 1,
			duration: 80,
			useNativeDriver: true,
		}).start()
	}
	
	render() {
		const scaleStyle = {transform: [{scale:this._avScale}]}
		return (
			<TouchableOpacity
				onPressIn={this._inHandler}
				onPressOut={this._outHandler}
				style={[this.props.style, scaleStyle]}>
				{this.props.children}
			</TouchableOpacity>
		)
	}
}

TouchableOpacityScale.propTypes = {
	scale: PropTypes.number,
}

export default TouchableOpacityScale