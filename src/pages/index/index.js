import Taro, { Component } from "@tarojs/taro"
import { View, Image, ScrollView } from "@tarojs/components"
import EditItem from "../../components/editItem/editItem"
import check from "../../image/check.png"
import "./index.css"
import AddButton from "../../components/addButton/addButton";
import AddItem from "../../components/addItem/addItem";

const keys = {
  znjy: "znjy",
  jxjy: "jxjy",
  dbyl: "dbyl",
  zfdklx: "zfdklx",
  zfzj: "zfzj",
  sylr: "sylr",
}

export default class Index extends Component {

  config = {
    navigationBarTitleText: "2018新个税计算器"
  }

  constructor(props) {
    super(props);
    this.items = [];
    this.checkedItems = {};
    this.tags = [
      {
        key: keys.znjy,
        name: "子女教育",
      },
      {
        key: keys.jxjy,
        name: "继续教育",
      },
      {
        key: keys.dbyl,
        name: "大病医疗",
      },
      {
        key: keys.zfdklx,
        name: "住房贷款利息",
      },
      {
        key: keys.zfzj,
        name: "住房租金",
      },
      {
        key: keys.sylr,
        name: "赡养老人",
      }
    ];
    this.state = {
      addItem: false
    };
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let selections;
    if (this.state.addItem) {
      selections = this.tags.map(item => {
        if (selections !== undefined) {
          return [
            <AddItem tag={item.key} checked={this.checkedItems[item.key] !== undefined} title={item.name} onCheckChanged={this.setItemChecked.bind(this)} />,
            <View className="border" />
          ]
        }
        return <AddItem tag={item.key} checked={this.checkedItems[item.key] !== undefined} title={item.name} onCheckChanged={this.setItemChecked.bind(this)} />
      });
    }
    let addItems;
    if (this.items.length > 0) {
      addItems = this.items.map(item => {
        if (addItems !== undefined) {
          return [
            <EditItem title={item.title} placeholder={"••••••"} inputType={"number"} />,
            <View className="border" />
          ]
        }
        return <EditItem title={item.title} placeholder={"••••••"} inputType={"number"} />;
      });
    }
    return (
      this.state.addItem ?
        <View className="float-container" >
          <View className="section">
            {selections}
          </View>
          <View className="section" onClick={this.finishAddItem.bind(this)}>
            <AddButton title={"确认"} />
          </View>
        </View> :
        <View className="container background">
          <ScrollView className="scrollView">
            <View className="content">
              <View className="section">
                <EditItem ref={"salary"} title={"税前月薪"} placeholder={"••••••"} inputType={"number"} />
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
          </ScrollView>
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
    if (isCheck) {
      this.checkedItems[key] = { key: key, title: title, isCheck: isCheck };
    } else if (this.checkedItems[key]) {
      delete this.checkedItems[key]
    }
  }

}