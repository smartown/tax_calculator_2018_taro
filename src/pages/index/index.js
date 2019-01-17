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
    this.items = [];
    this.checkedItems = {};
    this.state = {
      addItem: false
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let addItems;
    if (this.items.length > 0) {
      console.log(this.items)
      addItems = this.items.map(item => {
        if (addItems) {
          return [
            <EditItem title={item.title} placeholder={"••••••"} inputType={"number"} />,
            <View className="border" />
          ]
        }
        return <EditItem title={item.title} placeholder={"••••••"} inputType={"number"} />;
      })
    }
    return (
      this.state.addItem ?
        <View className="float-container" >
          <View className="section">
            <AddItem tag={"fangdai"} checked={this.checkedItems.fangdai} title={"房贷"} onCheckChanged={this.setItemChecked.bind(this)} />
            <View className="border" />
            <AddItem tag={"zinv"} checked={this.checkedItems.zinv} title={"子女"} onCheckChanged={this.setItemChecked.bind(this)} />
            <View className="border" />
            <AddItem tag={"fumu"} checked={this.checkedItems.fumu} title={"父母"} onCheckChanged={this.setItemChecked.bind(this)} />
          </View>
          <View className="section" onClick={this.finishAddItem.bind(this)}>
            <AddButton title={"确认"} />
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
            <View className="section" >
              {addItems}
            </View>
            <View className="section" onClick={this.addItem.bind(this)}>
              <AddButton title={"添加专项附加扣除"} />
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

  finishAddItem() {
    this.items = [];
    for (const key in this.checkedItems) {
      this.items.push(this.checkedItems[key]);
    }
    this.setState({ addItem: false });
  }

  setItemChecked(key, title, isCheck) {
    this.checkedItems[key] = { key: key, title: title, isCheck: isCheck };
  }

}