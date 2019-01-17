import Taro, { Component } from "@tarojs/taro"
import { View, Image } from "@tarojs/components"
import EditItem from "../../components/editItem/editItem"
import check from "../../image/check.png"
import "./index.css"
import AddButton from "../../components/addButton/addButton";
import AddItem from "../../components/addItem/addItem";

export default class Index extends Component {

  config = {
    navigationBarTitleText: "2018新个税计算器"
  }

  constructor(props) {
    super(props);
    this.state = {
      addItem: false,
      items: [

      ]
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      this.state.addItem ?
        <View className="float-container" >
          <View className="section">
            <AddItem />
            <View className="border" />
            <AddItem />
            <View className="border" />
            <AddItem />
          </View>
        </View> :
        <View className="container">
          <View className="content">
            <View className="section">
              <EditItem title={"税前月薪"} placeholder={"••••••"} inputType={"number"} />
              <View className="border" />
              <EditItem title={"社保个人缴纳"} placeholder={"••••••"} inputType={"number"} />
              <View className="border" />
              <EditItem title={"公积金个人缴纳"} placeholder={"••••••"} inputType={"number"} />
            </View>
            {this.state.items.length > 0 ?
              (
                <View className="section" onClick={this.addItem}>
                  <AddButton />
                </View>
              ) : undefined}
            <View className="section" onClick={this.addItem.bind(this)}>
              <AddButton />
            </View>
          </View>
          <View className="float-button" onClick={this.commit}>
            <Image className="float-button-icon" src={check} />
          </View>
        </View>
    )
  }

  commit() {
    console.log("commit")
  }

  addItem() {
    this.setState({ addItem: true });
  }
}