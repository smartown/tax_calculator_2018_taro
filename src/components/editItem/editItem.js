import Taro, { Component } from "@tarojs/taro";
import { View, Text, Icon, Input } from "@tarojs/components";
import { Colors } from "../constants";
import "./editItem.css"
import PropTypes from 'prop-types';

interface Props {
    title: string,
    placeholder: string,
    maxLength?: number,
    inputType: 'number' | 'digit',
}

export default class EditItem extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            value: undefined
        }
    }

    render() {
        return (
            <View className="edit-item-container">
                <Text className="edit-item-title">{this.props.title}</Text>
                <Input
                    className="edit-item-value"
                    type={this.props.inputType}
                    placeholder={this.props.placeholder}
                    placeholderClass="edit-item-value-placeholder"
                    onInput={this.onInput.bind(this)} />
            </View>
        )
    }

    onInput(text) {
        this.setState({ value: text })
    }

    getValue() {
        return this.state.value;
    }
}
