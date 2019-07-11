<template>
 <div>
   <p>粉丝概况</p>
   <div id="main" style="witch: 600px; height: 400px"></div>
   <br>
   <!-- <EChartsBar></EChartsBar> -->
   <br>
   <EchartsFinance></EchartsFinance>
 </div>
</template>

<script>
import echarts from 'echarts'
import EchartsFinance from './components/echarts-finance.vue'
// import EChartsBar from './components/echarts-bar.vue'
export default {
  name: 'Fans',
  components: {
    // EChartsBar,
    EchartsFinance
  },
  data () {
    return {}
  },
  mounted () {
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: { // X 轴的数据
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {}, // y 轴配置项
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}
</script>

<style  scoped lang='less'>

</style>
