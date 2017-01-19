import React, { Component } from 'react';
import {
    TouchableHighlight ,
    Text
} from 'react-native';

import Styles from './Style';

export default class InputButton extends Component {

    render(){
        return(
            <TouchableHighlight style={[Styles.inputButton, this.props.highlight ? Styles.inputButtonHighlighted : null]}
                                underlayColor="#193441"
                                onPress={this.props.onPress}>
                <Text style={Styles.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }

}
