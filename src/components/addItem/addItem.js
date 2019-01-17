import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./addItem.css"
import iconCheck from "../../image/check_box_check.png"
import iconUncheck from "../../image/check_box_uncheck.png"

interface Props {
    tag: string,
    checked: boolean,
    title: string,
    onCheckChanged: Function,
}

export default class AddItem extends Component<Props> {

    constructor(props) {
        super(props);
        this.key = this.props.tag;
        this.title = this.props.title;
        this.state = {
            checked: this.props.checked
        }
    }

    render() {
        return (
            <View className="add-item-container" onClick={this.switch.bind(this)}>
                <Image className="add-item-check" src={this.state.checked ? iconCheck : iconUncheck} />
                <Text className="add-item-title">{this.props.title}</Text>
            </View>
        )
    }

    switch() {
        const isCheck = !this.state.checked;
        this.setState({ checked: isCheck });
        if (this.props.onCheckChanged) {
            this.props.onCheckChanged(this.key, this.title, isCheck);
        }
    }
}
