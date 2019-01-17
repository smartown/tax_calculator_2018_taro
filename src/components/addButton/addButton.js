import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./addButton.css"

interface Props {
    title: string
}

export default class AddButton extends Component<Props> {
    render() {
        return (
            <View className="add-button-container">
                <Text className="add-button-title">{this.props.title}</Text>
            </View>
        )
    }
}
