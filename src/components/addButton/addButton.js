import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./addButton.css"

export default class AddButton extends Component {
    render() {
        return (
            <View className="add-button-container">
                <Text className="add-button-title">添加专项附加扣除</Text>
            </View>
        )
    }
}
