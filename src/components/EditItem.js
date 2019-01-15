import Taro, { Component } from "@tarojs/taro";
import { View, Text, Icon, Input } from "@tarojs/components";
import { Colors } from "./constants";

export default class EditItem extends Component {

    constructor() {
        super();
        this.state = {
            value: undefined
        }
    }

    render() {
        return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"flex-start",
                    padding: 16,
                    backgroundColor: Colors._35384F,
                    borderRadius: 4,
                    marginBottom: 16,
                    boxShadow: "0 0 4px #0004",
                }}>
                <Text style={{ fontSize: 12, color: "white", borderWidth:2, borderBottomColor: "#34b38e" }}>税前月薪</Text>
                <Input
                    type="number"
                    placeholder="请输入税前月薪"
                    style={{ fontSize: 16, paddingTop: 16, color: this.state.value ? "black" : "black" }}
                    onInput={(text) => this.setState({ value: text })} />
            </View>
        )
    }
}