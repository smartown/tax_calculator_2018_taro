import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, ScrollView } from "@tarojs/components";
import { rule20181001, calculate } from "../../components/constants";
import "../../app.css"
import ResultItem from "../../components/resultItem/resultItem";

export default class Result extends Component {

  config = {
    navigationBarTitleText: "2018新个税计算器"
  }

  componentWillMount() {
    this.params = JSON.parse(this.$router.params.params);
    this.result = calculate(this.params, rule20181001);
    wx.reportAnalytics('salary', {
      salary: Number(this.params.yuexin),
      social_security: Number(this.params.shebao)
    });
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
      zhuanxiangkouchu,
      qizhengdian,
      yingnashuie,
      shuilv,
      gerensuodeshui,
      susuankouchushu,
      daoshougongzi } = this.result;
    return (
      <View className="container background-color-141a32">
        <ad unit-id="adunit-32d9c373378f92c1"></ad>
        <ScrollView className="background-color-141a32">
          <ad unit-id="adunit-32d9c373378f92c1"></ad>
          <View className="content">
            <View className="section margin-bottom-1rem">
              <Text className="text1">到手工资</Text>
              <Text className="text2">{daoshougongzi.toFixed(2)}</Text>
              <ResultItem title="税前月薪" value={yuexin} />
              <ResultItem title="社保个人缴纳" value={shebao} />
              <ResultItem title="公积金个人缴纳" value={gongjijin} />
              <ResultItem title="专项附加扣除" value={zhuanxiangkouchu} />
              <ResultItem title="起征点" value={qizhengdian} />
              <ResultItem title="应纳税所得税额" value={yingnashuie.toFixed(2)} />
              <ResultItem title="税率" value={(shuilv * 100) + "%"} />
              <ResultItem title="速算扣除数" value={susuankouchushu} />
              <ResultItem title="个人所得税" value={gerensuodeshui.toFixed(2)} />
            </View>
            <Button openType="share">用的满意记得分享给小伙伴哦！</Button>
          </View>
        </ScrollView>
      </View>
    );
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