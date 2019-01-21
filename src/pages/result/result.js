import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { keys, rule20181001 } from "../../components/constants";
import "../index/index.css";
import ResultItem from "../../components/resultItem/resultItem";
import AddButton from "../../components/addButton/addButton";

export default class Result extends Component {

  config = {
    navigationBarTitleText: "2018新个税计算器"
  }

  componentWillMount() {
    this.params = JSON.parse(this.$router.params.params);
    this.result = this.calculate(this.params, rule20181001);
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const {
      yuexin,
      shebao,
      gongjijin,
      deduction,
      start,
      pure,
      taxRatio,
      quick,
      finalTax
    } = this.result;
    return (
      <View className="container background-color-141a32">
        <ad unit-id="adunit-32d9c373378f92c1"></ad>
        <ScrollView className="background-color-141a32">
          <ad unit-id="adunit-32d9c373378f92c1"></ad>
          <View className="content">
            <View className="section margin-bottom-1rem">
              <Text className="text1">到手工资</Text>
              <Text className="text2">{this.result.finalSalary.toFixed(2)}</Text>
              <ResultItem title="税前月薪" value={yuexin} />
              <ResultItem title="社保个人缴纳" value={shebao} />
              <ResultItem title="公积金个人缴纳" value={gongjijin} />
              <ResultItem title="专项附加扣除" value={deduction} />
              <ResultItem title="起征点" value={start} />
              <ResultItem title="应纳税所得税额" value={pure.toFixed(2)} />
              <ResultItem title="税率" value={(taxRatio * 100) + "%"} />
              <ResultItem title="速算扣除数" value={quick} />
              <ResultItem title="个人所得税" value={finalTax.toFixed(2)} />
            </View>
            <AddButton title={"用的满意记得分享给小伙伴哦！"} onClick={this.share}></AddButton>
          </View>
        </ScrollView>
      </View>
    );
  }

  calculate(params, ruleObject) {
    //应纳所得税额
    let pure = params[keys.yuexin] - params[keys.shebao] - params[keys.gongjijin] - params.deduction - ruleObject.start;
    if (pure < 0) {
      pure = 0;
    }

    //速算扣除数
    let quick = 0;
    //税额，实际交税还要减去速算扣除数
    let taxRatio = 0;
    //税额，实际交税还要减去速算扣除数
    let tax = 0;

    if (pure > 0) {
      let taxRule;
      for (let item of ruleObject.rule) {
        if (pure > item.min && (pure <= item.max || item.max === -1)) {
          taxRule = item;
          break
        }
      }
      if (taxRule) {
        quick = taxRule.quick;
        taxRatio = taxRule.ratio;
        tax = taxRatio * pure;
      }
    }

    const finalTax = tax - quick;
    const finalSalary = params[keys.yuexin] - params[keys.shebao] - params[keys.gongjijin] - finalTax;
    return {
      yuexin: params[keys.yuexin],
      shebao: params[keys.shebao],
      gongjijin: params[keys.gongjijin],
      deduction: params.deduction,
      start: ruleObject.start,
      pure: pure,
      taxRatio: taxRatio,
      tax: tax,
      quick: quick,
      finalTax: finalTax,
      finalSalary: finalSalary
    }
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

  share() {
    wx.showShareMenu();
  }
}