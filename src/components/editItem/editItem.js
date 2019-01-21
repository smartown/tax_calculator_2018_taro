import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./editItem.css"

interface Props {
    hideDivider?: boolean,
    title: string,
    tag: string,
    value: string,
    placeholder: string,
    maxLength?: number,
    inputType: 'number' | 'digit',
    onValueChanged: Function
}

export default class EditItem extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hideDivider) {
            return (
                <View className="edit-item-content padding-left-right">
                    <Text className="edit-item-title">{this.props.title}</Text>
                    <Input
                        className="edit-item-value"
                        value={this.props.value}
                        type={this.props.inputType}
                        placeholder={this.props.placeholder}
                        placeholderClass="edit-item-value-placeholder"
                        maxLength={this.props.maxLength ? this.props.maxLength : 140}
                        onInput={this.onInput.bind(this)} />
                </View>
            )
        }
        return (
            <View className="edit-item-container padding-left-right">
                <View className="edit-item-content">
                    <Text className="edit-item-title">{this.props.title}</Text>
                    <Input
                        className="edit-item-value"
                        value={this.props.value}
                        type={this.props.inputType}
                        placeholder={this.props.placeholder}
                        placeholderClass="edit-item-value-placeholder"
                        maxLength={this.props.maxLength ? this.props.maxLength : 140}
                        onInput={this.onInput.bind(this)} />
                </View>
                <View className="edit-item-border" />
            </View>
        )
    }

    onInput(text) {
        this.props.onValueChanged(this.props.tag, text.detail.value);
    }

}