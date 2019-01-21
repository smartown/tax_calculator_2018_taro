import Taro, { Component, StandaProps } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./addButton.css"

interface Props extends StandaProps {
    title: string,
    onClick: Function,
}

export default class AddButton extends Component<Props> {
    render() {
        return (
            <View className="add-button-container" onClick={this.props.onClick}>
                <Text className="add-button-title">{this.props.title}</Text>
            </View>
        )
    }
}
