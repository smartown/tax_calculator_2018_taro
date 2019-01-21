import Taro, { Component } from "@tarojs/taro"
import { View, Image, ScrollView } from "@tarojs/components"
import EditItem from "../../components/editItem/editItem"
import ic_calculate from "../../image/calculate.png"
import "./index.css"
import AddButton from "../../components/addButton/addButton";
import AddItem from "../../components/addItem/addItem";
import { tags, keys } from "../../components/constants";

export default class Index extends Component {

  config = {
    navigationBarTitleText: "2018新个税计算器"
  }

  constructor(props) {
    super(props);
    this.items = [];
    this.checkedItems = {};
    this.values = {};
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
    if (this.state.addItem) {
      const length = tags.length;
      let index = -1;
      const addItems = tags.map(item => {
        index++;
        return <AddItem hideDivider={index === length - 1} tag={item.key} checked={this.checkedItems[item.key] !== undefined} title={item.name} onCheckChanged={this.setItemChecked.bind(this)} />;
      });
      return (
        <View className="float-container background-color-141a32" >
          <View className="section margin-bottom-1rem">
            {addItems}
          </View>
          <AddButton title={"确认"} onClick={this.finishAddItem.bind(this)} />
        </View>
      );
    }
    if (this.items.length > 0) {
      const length = this.items.length;
      let index = -1;
      const editItems = this.items.map(item => {
        index++;
        return <EditItem tag={item.key} value={this.values[item.key]} hideDivider={index === length - 1} title={item.title} placeholder={"请输入"} inputType={"number"} maxLength={4} onValueChanged={this.setItemValue.bind(this)} />;
      });
      return (
        <View className="container background-color-141a32">
          <ScrollView className="background-color-141a32">
            <ad unit-id="adunit-3074e806ae3ff7f1"></ad>
            <View className="content">
              <View className="section margin-bottom-1rem">
                <EditItem tag={keys.yuexin} value={this.values[keys.yuexin]} title={"税前月薪"} placeholder={"请输入"} inputType={"digit"} maxLength={9} onValueChanged={this.setItemValue.bind(this)} />
                <EditItem tag={keys.shebao} value={this.values[keys.shebao]} title={"社保个人缴纳"} placeholder={"请输入"} inputType={"digit"} maxLength={9} onValueChanged={this.setItemValue.bind(this)} />
                <EditItem tag={keys.gongjijin} value={this.values[keys.gongjijin]} title={"公积金个人缴纳"} placeholder={"请输入"} inputType={"digit"} maxLength={9} hideDivider={true} onValueChanged={this.setItemValue.bind(this)} />
              </View>
              <View className="section margin-bottom-1rem">
                {editItems}
              </View>
              <AddButton title={"添加专项附加扣除"} onClick={this.addItem.bind(this)} />
            </View>
          </ScrollView>
          <View className="float-button" onClick={this.checkInput.bind(this)}>
            <Image className="float-button-icon" src={ic_calculate} />
          </View>
        </View>
      );
    }
    return (
      <View className="container background-color-141a32">
        <ScrollView className="background-color-141a32">
          <ad unit-id="adunit-3074e806ae3ff7f1"></ad>
          <View className="content">
            <View className="section margin-bottom-1rem">
              <EditItem tag={keys.yuexin} value={this.values[keys.yuexin]} title={"税前月薪"} placeholder={"请输入"} inputType={"digit"} maxLength={9} onValueChanged={this.setItemValue.bind(this)} />
              <EditItem tag={keys.shebao} value={this.values[keys.shebao]} title={"社保个人缴纳"} placeholder={"请输入"} inputType={"digit"} maxLength={9} onValueChanged={this.setItemValue.bind(this)} />
              <EditItem tag={keys.gongjijin} value={this.values[keys.gongjijin]} title={"公积金个人缴纳"} placeholder={"请输入"} inputType={"digit"} maxLength={9} hideDivider={true} onValueChanged={this.setItemValue.bind(this)} />
            </View>
            <AddButton title={"添加专项附加扣除"} onClick={this.addItem.bind(this)} />
          </View>
        </ScrollView>
        <View className="float-button" onClick={this.checkInput.bind(this)}>
          <Image className="float-button-icon" src={ic_calculate} />
        </View>
      </View>
    );
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

  setItemValue(key, value) {
    this.values[key] = value;
  }

  checkInput() {
    const yuexin = this.values[keys.yuexin];
    if (!yuexin) {
      this.showToast("请输入税前月薪");
      return;
    }
    const shebao = this.values[keys.shebao];
    if (!shebao) {
      this.showToast("请输入社保个人缴纳金额");
      return;
    }
    const gongjijin = this.values[keys.gongjijin];
    if (!gongjijin) {
      this.showToast("请输入公积金个人缴纳金额");
      return;
    }
    const inputValues = {
      yuexin: yuexin,
      shebao: shebao,
      gongjijin: gongjijin,
    }
    let deduction = 0;
    let error = false;
    const length = this.items.length;
    for (let index = 0; index < length; index++) {
      const item = this.items[index];
      const value = this.values[item.key];
      if (!value) {
        error = true;
        this.showToast("请输入" + item.title + "扣除金额");
        break;
      }
      deduction += parseInt(value);
      inputValues[item.key] = value;
    }
    if (!error) {
      inputValues.deduction = deduction;
      Taro.navigateTo({
        url: '/pages/result/result?params=' + JSON.stringify(inputValues)
      })
    }
  }

  showToast(msg) {
    Taro.showToast({ title: msg, icon: "none", duration: 2000 });
  }

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '发现一个超好用的个税计算器，赶紧收藏吧！',
      path: 'pages/index/index',
      imageUrl: "../../image/app_icon.jpg"
    }
  }
}