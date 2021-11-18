<template>
  <div class="root">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="search">
        <el-select placeholder="选择城市" v-model="form.city" clearable class="input-with-select">
          <el-option v-for="item in cities" :label="item.name" :value="item.code" :key="item.code"/>
        </el-select>
        <el-select placeholder="选择社区" v-model="form.community" clearable class="input-with-select">
          <el-option v-for="item in communities" :label="item.name" :value="item.code" :key="item.code"/>
        </el-select>
      </div>
      <div class="search">
        <el-date-picker
          class="search-by-time"
          v-model="searchTime"
          type="monthrange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 400px"
          @input="handleDate"
        ></el-date-picker>
        <el-button @click="getStatistics" icon="el-icon-search" type="primary"/>
      </div>
    </el-form>
    <div id="chartOrder" class="my-chart" style="width: 100%;height: 400px"/>
    <div id="chartFee" class="my-chart" style="width: 100%;height: 400px"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import moment from "moment";
import {getChartData} from "@/api/statics";
import {getCities, getCommunities} from "@/api/dict";

export default {
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error("未选择日期范围"));
      } else {
        callback();
      }
    }
    return {
      data: [],
      communities: [
        {
          code: 0,
          name: "幸福小区"
        },
        {
          code: 1,
          name: "汤臣一品"
        },
        {
          code: 2,
          name: "翻斗花园"
        }
      ],
      cities: [
        {
          code: 0,
          name: "北京"
        },
        {
          code: 1,
          name: "上海"
        },
        {
          code: 2,
          name: "广州"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近1个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近3个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近6个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchTime: [],
      form: {
        startTime: '',
        endTime: '',
        city: '',
        community: ''
      },
      rules: {
        startTime: [
          {required: true, trigger: "blur", validator: validateStartTime}
        ]
      },
      charts: '',
      xAxisDate: [],
      orderSeries: [],
      feeSeries: []
    };
  },
  mounted: function () {
    //加载城市字典
    getCities().then(res=>{
      this.cities=res.data
    })
    //加载城社区字典
    getCommunities().then(res=>{
      this.communities=res.data
    })
    this.makeChart();
  },
  methods: {
    makeChart() {
      this.drawLine("chartOrder", this.orderSeries, '成交单数', '每月累计成交单数')
      this.drawLine("chartFee", this.feeSeries, '中介费金额(元)', '每月累计中介费金额')
    },
    drawLine(id, series, yName, title) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['图例']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          name: "月份",
          boundaryGap: false,
          data: this.xAxisDate

        },
        yAxis: {
          name: yName,
          type: 'value'
        },
        series: [{
          name: yName,
          type: 'line',
          stack: yName,
          data: series
        }]
      })
    },
    handleDate(e) {
      this.$nextTick(() => {
        this.$set(this.form, "startTime", e[0])
        this.$set(this.form, "endTime", e[1])
        console.log("change date", this.form)
      })
    },
    getStatistics() {
      let that = this;
      getChartData(
        {
          startTime: moment(this.startTime).format('yyyy-MM'),
          endTime: moment(this.endTime).format('yyyy-MM'),
          city: this.form.city,
          community: this.form.community
        }
      ).then(
        res => {
          console.log("res :", res);
          let data = res.data
          if (data == null) {
            that.$message({
              message: "查询无结果",
              type: 'warning',
              duration: 2 * 1000
            })
            return 0;
          } else {
            that.$message({
              message: "查询成功",
              type: 'success',
              duration: 2 * 1000
            });
          }
          this.orderSeries = []
          this.feeSeries = []
          this.xAxisDate = []
          for (let i = 0; i < data['monthList'].length; i++) {
            this.orderSeries[i] = data['orderList'][i]
            this.feeSeries[i] = data['feeList'][i]
            this.xAxisDate[i] = data['monthList'][i]
          }
          this.makeChart()
        },
        err => {
          console.log("err :", err);
        }
      );
    }
  }
}
</script>

<style>

.search {
  width: 100%;
}

.search-by-time {
  margin-top: 20px;
}

.my-chart {
  margin: 40px 0 40px 0;
  list-style: none;
}
</style>
