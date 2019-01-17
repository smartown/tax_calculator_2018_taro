import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./addItem.css"

interface Props {
    checked: boolean,
    title: string,
    onCheckChanged: Function,
}

export default class AddItem extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        }
    }

    render() {
        return (
            <View className="add-item-container" onClick={this.switch.bind(this)}>
                <Image className="add-item-check" src={this.state.checked ? "../../image/check_box_check.png" : "../../image/check_box_uncheck.png"} />
                <Text className="add-item-title">{this.props.title}</Text>
            </View>
        )
    }

    switch() {
        const isCheck = !this.state.checked;
        this.setState({ checked: isCheck });
        if (this.props.onCheckChanged) {
            this.props.onCheckChanged(isCheck);
        }
    }
}
