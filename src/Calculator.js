import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Styles from './Style';
import InputButton from './InputButton';
import ArithmeticOperations from './ArithmeticOperations'


const inputButtons = [
    [1,2,3,'/'],
    [4,5,6,'*'],
    [7,8,9,'-'],
    [0,'.','=','+']
];

export default class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedOperation: null,
            performOperation: null,
            operationPerformed: false,
            history: ""
        };
    };

    render() {
        return (
            <View style={Styles.rootContainer}>
                <View style={Styles.displayContainer}>
                    <Text style={Styles.displayHistory}>{this.state.history}</Text>
                    <Text style={Styles.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Styles.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    };

    _renderInputButtons = function() {

        let views = [];

        for(var r = 0, rows = inputButtons.length; r < rows; r++){

            let row = inputButtons[r],
                inputRow = [];

            for(var i = 0, elements = row.length; i < elements; i++){

                let buttonText = row[i];

                inputRow.push(
                    <InputButton value={buttonText}
                                 highlight={this.state.selectedOperation === buttonText}
                                 onPress={this._onInputButtonPressed.bind(this,buttonText)}
                                 key={r+"-"+i} />
                );

            }

            views.push(<View style={Styles.inputRow} key={"row-"+r}>{inputRow}</View>);

        }

        return views;

    };

    _onInputButtonPressed(input) {
       switch (typeof input) {
           case 'number':
               return this._handleNumberInput(input);
           case 'string':
               return this._handleStringInput(input);
       }
    };

    _handleNumberInput(num) {

        let operationPerformed = this.state.operationPerformed,
            inputValue = operationPerformed ? num : (this.state.inputValue * 10) + num,
            history =  operationPerformed ? "" : this.state.history;

        this.setState({
            inputValue: inputValue,
            history: history,
            operationPerformed: false
        });
    }

    _handleStringInput(operation){

        let selectedOperation = this.state.selectedOperation,
            performOperation = this.state.performOperation;


        if(operation === "="){

            if (!selectedOperation || !performOperation){
                return;
            }

            this.setState({
                previousInputValue: 0,
                inputValue: performOperation(this.state.previousInputValue, this.state.inputValue),
                selectedOperation: null,
                performOperation: null,
                history: this.state.history + " " + this.state.inputValue + " =",
                operationPerformed: true
            });


        } else if (operation === "."){

            //not implemented yet!

        } else if (typeof ArithmeticOperations[operation] === "function") {

            let previousInputValue = (!!selectedOperation && !!performOperation) ? ArithmeticOperations[selectedOperation](this.state.previousInputValue, this.state.inputValue) : this.state.inputValue;

            this.setState({
                selectedOperation: operation,
                performOperation: ArithmeticOperations[operation],
                previousInputValue: previousInputValue,
                inputValue: 0,
                history: (this.state.operationPerformed ? "" : this.state.history + " ") + this.state.inputValue + " "+ operation,
                operationPerformed: false
            });

        }

    }

}



