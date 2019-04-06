/*
*各种画echarts图表的方法都封装在这里
 */
import echarts from "echarts";
const install = function(Vue) {
  console.log('封装测试')
  console.log(Vue.prototype)
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画条形图
                    drawColumnChart(id) {
                      this.chartColumn = echarts.init(document.getElementById(id));
                      this.chartColumn.clear();
                      const optionData={
                        title: { text: 'Column Chart' },
                        tooltip: {},
                        xAxis: {
                            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                        },
                        yAxis: {},
                        series: [{
                            name: '销量',
                            type: 'bar',
                            data: [5, 20, 36, 10, 10, 20]
                          }]
                      };
                      this.chartColumn.setOption(optionData)
                  },
                  //画饼图
                  drawBarChart(id) {
                      this.chartBar = echarts.init(document.getElementById(id));
                      this.chartBar.clear();
                      const optionData={
                          title: {
                              text: 'Bar Chart',
                              subtext: '数据来自网络'
                          },
                          tooltip: {
                              trigger: 'axis',
                              axisPointer: {
                                  type: 'shadow'
                              }
                          },
                          legend: {
                              data: ['2011年', '2012年']
                          },
                          grid: {
                              left: '3%',
                              right: '4%',
                              bottom: '3%',
                              containLabel: true
                          },
                          xAxis: {
                              type: 'value',
                              boundaryGap: [0, 0.01]
                          },
                          yAxis: {
                              type: 'category',
                              data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                          },
                          series: [
                              {
                                  name: '2011年',
                                  type: 'bar',
                                  data: [18203, 23489, 29034, 104970, 131744, 630230]
                              },
                              {
                                  name: '2012年',
                                  type: 'bar',
                                  data: [19325, 23438, 31000, 121594, 134141, 681807]
                              }
                          ]
                      };
                      this.chartBar.setOption(optionData)
                  },
                  //画折线图
                  drawLineChart(id) {
                      this.chartLine = echarts.init(document.getElementById(id));
                      this.chartLine.clear();
                      const optionData={
                          title: {
                              text: 'Line Chart'
                          },
                          tooltip: {
                              trigger: 'axis'
                          },
                          legend: {
                              data: ['邮件营销', '联盟广告', '搜索引擎']
                          },
                          grid: {
                              left: '3%',
                              right: '4%',
                              bottom: '3%',
                              containLabel: true
                          },
                          xAxis: {
                              type: 'category',
                              boundaryGap: false,
                              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                          },
                          yAxis: {
                              type: 'value'
                          },
                          series: [
                              {
                                  name: '邮件营销',
                                  type: 'line',
                                  stack: '总量',
                                  data: [120, 132, 101, 134, 90, 230, 210]
                              },
                              {
                                  name: '联盟广告',
                                  type: 'line',
                                  stack: '总量',
                                  data: [220, 182, 191, 234, 290, 330, 310]
                              },
                              {
                                  name: '搜索引擎',
                                  type: 'line',
                                  stack: '总量',
                                  data: [820, 932, 901, 934, 1290, 1330, 1320]
                              }
                          ]
                      };
                      this.chartLine.setOption(optionData)
                  },
                  //画饼图
                  drawPieChart(id) {
                      this.chartPie = echarts.init(document.getElementById(id));
                      this.chartPie.clear();
                      const optionData={
                          title: {
                              text: 'Pie Chart',
                              subtext: '纯属虚构',
                              x: 'center'
                          },
                          tooltip: {
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)"
                          },
                          legend: {
                              orient: 'vertical',
                              left: 'left',
                              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                          },
                          series: [
                              {
                                  name: '访问来源',
                                  type: 'pie',
                                  radius: '55%',
                                  center: ['50%', '60%'],
                                  data: [
                                      { value: 335, name: '直接访问' },
                                      { value: 310, name: '邮件营销' },
                                      { value: 234, name: '联盟广告' },
                                      { value: 135, name: '视频广告' },
                                      { value: 1548, name: '搜索引擎' }
                                  ],
                                  itemStyle: {
                                      emphasis: {
                                          shadowBlur: 10,
                                          shadowOffsetX: 0,
                                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                                      }
                                  }
                              }
                          ]
                      };
                      this.chartPie.setOption(optionData)
                  },





                }
            }
        }
    })
}

export default {
    install
}
