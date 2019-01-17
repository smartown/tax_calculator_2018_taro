import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./addItem.css"

interface Props {
    checked: boolean,
    title: string
}

export default class AddItem extends Component<Props> {
    render() {
        return (
            <View className="add-item-container" onClick={this.switch.bind(this)}>
                <Text className="add-item-title">{this.props.title}</Text>
            </View>
        )
    }
}
