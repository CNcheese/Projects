<template>
  <div ref="main" style="width: 600px;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: '',
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.initChart()
    this.loadData()
  },
  methods: {
    initChart () {
      this.myChart = echarts.init(this.$refs.main)
      // 显示标题，图例和空的坐标轴
      this.myChart.setOption({
        title: {
          text: '异步数据加载示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: []
        }]
      })
    },
    loadData () {
      this.myChart.showLoading()
      setTimeout(() => {
        this.$http({
          method: 'GET',
          url: 'http://localhost:3000/barData'
        }).then(data => {
          this.myChart.setOption({
            xAxis: {
              data: data.xAxisData
            },
            series: [{
              name: '销量',
              data: data.seriesData
            }]
          })
          this.myChart.hideLoading()
        })
      }, 2000)
    }
  }
}
</script>

<style  scoped lang='less'>
</style>
