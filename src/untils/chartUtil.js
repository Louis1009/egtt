// 切割分时数据的方法
function sliceLineData(data) {
  let categoryData = [];
  let values = [];
  for (let i = 0; i < data.length; i++) {
    categoryData.push(data[i].slice(0, 1)[0]);
    values.push(data[i].slice(1, 2)[0]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
// 切割MA数据的方法
function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}
// 切割日线数据的方法
function splitData(rawData) {
  var categoryData = [];
  var values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
// 分时配置
let lineSeries = [
  {
    type: "line",
    smooth: true,
    data: [],
    itemStyle: {
      color: "#354162",
      opacity: 0.5
    },
    lineStyle: {
      width: 1,
      color: "rgb(24,195,56)"
    }
  }
];
// 日线配置
let candleSeries = [
  // 日K
  {
    name: "日K",
    type: "candlestick",
    data: [],
    itemStyle: {
      normal: {
        color: "none",
        color0: "rgb(189,22,44)",
        borderColor: "#008F28",
        borderColor0: "rgb(189,22,44)"
      }
    }
  }
  ,
  // MA5
  {
    name: "MA5",
    type: "line",
    symbol: "none",
    color: "rgb(2,102,246)",
    data: [],
    lineStyle: {
      normal: {
        width: 2
      }
    }
  },
  // MA15
  {
    name: "MA15",
    type: "line",
    symbol: "none",
    color: "rgb(114,93,213)",
    data: [],
    lineStyle: {
      normal: {
        width: 2
      }
    }
  },
  // MA30
  {
    name: "MA30",
    type: "line",
    symbol: "none",
    color: "yellow",
    data: [],
    lineStyle: {
      normal: {
        width: 2
      }
    }
  }
];
// 图标公共配置项
let echartsOption = {
  backgroundColor: "#21202D",
  // 提示信息
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross"
    }
  },
  // 坐标轴位置
  grid: {
    bottom: 50,
    left: "10%",
    right: 10,
    top: 40
  },
  // X轴配置
  xAxis: {
    type: "category",
    data: [],
    scale: true,
    axisLabel: {
      textStyle: {
        color: "rgb(189,22,44)"
      }
    }
  },
  // Y轴配置
  yAxis: {
    scale: true,
    splitLine: { show: false },
    axisLabel: {
      textStyle: {
        color: "rgb(189,22,44)"
      }
    }
  },
  // 区域缩放
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100
    }
  ],
  animationThreshold: 200,
  // 数据
  series: undefined
};

export default class chartUtil {
  static lineOption = datas => {
    let lineData = sliceLineData(datas);
    echartsOption.xAxis.show = false;
    echartsOption.yAxis.show = false;
    echartsOption.xAxis.data = lineData.categoryData;
    lineSeries[0].data = lineData.values;
    echartsOption.series = lineSeries;
    return echartsOption;
  };
  static candleOption = datasd => {
    let candleData = splitData(datasd);
    echartsOption.xAxis.show = true;
    echartsOption.yAxis.show = true;
    echartsOption.xAxis.data = candleData.categoryData;
    candleSeries[0].data = candleData.values;
    candleSeries[1].data = calculateMA(5, candleData.values);
    candleSeries[2].data = calculateMA(10, candleData.values);
    candleSeries[3].data = calculateMA(20, candleData.values);
    echartsOption.series = candleSeries;
    return echartsOption;
  };
}
