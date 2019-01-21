import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./resultItem.css"

interface Props {
    title: string,
    value: string,
}

export default class ResultItem extends Component<Props> {

    render() {
        return (
            <View className="result-item-container padding-left-right">
                <View className="result-item-border" />
                <View className="result-item-content">
                    <Text className="result-item-title">{this.props.title}</Text>
                    <Text className="result-item-value">{this.props.value}</Text>
                </View>
            </View>
        )
    }

}