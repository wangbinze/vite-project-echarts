import './index5.css';
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const Index5 = () => {
    const echartsRef = React.createRef<HTMLDivElement | null>();
    const echartsInstance = useRef<echarts.ECharts | null>(null);
    const color1 = '#FFBE00';
    const color2 = '#FFBE00';
    const [currentMarkLineList, setCurrentMarkLineList] = useState<any[]>(
        [
            {
                xAxis: 0,
                name: 'L1',
                lineStyle: {
                    normal: {
                        type: "dashed",
                        width: 1,
                        color: color1
                    }
                }
            },
            {
                xAxis: 4,
                name: 'L2',
                lineStyle: {
                    normal: {
                        type: "dashed",
                        width: 1,
                        color: color2
                    }
                }
            }
        ]
    )

    useEffect(() => {
        if (!echartsRef.current) return;
        const chart = echarts.init(echartsRef.current);
        echartsInstance.current = chart;

        //  数据
        const seriesData = [
            [0, 1],
            [1, 5],
            [2, 4],
            [3, 8],
            [4, 6],
            [5, 3],
            [6, 2],
            [7, 7],
        ];
        const initChart = () => {
            const option: unknown = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        lineStyle: {
                            color: "#888888"
                        }
                    }
                },
                legend: {
                    top: "30",
                    x: "center",
                    textStyle: {
                        color: "black",
                        fontSize: 12
                    },
                },
                grid: {
                    top: '20%',
                    bottom: '15%',
                    left: '2%',
                    right: '10%',
                    containLabel: true
                },
                xAxis: [
                    {
                        id: 'x0',
                        type: "category",
                        boundaryGap: true,
                        axisLabel: {
                            textStyle: {
                                color: "black",
                                fontSize: 12
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "black"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                    }, {
                        axisPointer: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        position: "bottom",
                        offset: 20
                    }
                ],
                yAxis: [
                    {
                        id: '2',
                        name: 'y轴',
                        nameTextStyle: {
                            //color: '#FFF',
                            color: "black",
                            fontSize: 12,
                        },
                        type: "value",
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "black"
                            }
                        },
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                //color: "#FFF",
                                color: 'black',
                                fontSize: 12
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        id: 'serie0',
                        type: 'line',
                        z: 1,
                        data: seriesData,
                        symbolSize: 10,
                        symbol: 'circle',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#EE6666'
                            }
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        markPoint: {
                            symbol: 'pin',
                            // 标记的数据，可以是最大值最小值也可以是自定义的坐标
                            data: []
                        },
                    },
                    {
                        id: 'vline',
                        z: 2,
                        data: seriesData,
                        type: 'line',
                        // 隐藏series
                        symbolSize: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 0,
                            color: 'rgba(0, 0, 0, 0)'
                        },
                        markPoint: {
                            symbol: 'pin',
                            // 标记的数据，可以是最大值最小值也可以是自定义的坐标
                            data: []
                        },
                    }
                ]
            }
            option.series.push({
                id: 'AreaChart',
                type: 'line',
                symbolSize: 1,
                itemStyle: {
                    normal: {
                        color: 'rgb(0,153,255,1)'
                    }
                },
                markArea: {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgb(255,255,255,0)'
                        }
                    },
                    data: [[{
                        yAxis: 5
                    }, {
                        yAxis: 2
                    }]]
                },
                markLine: {
                    silent: true,
                    data: []
                },
                markPoint: {
                    symbol: 'pin',
                    symbolSize: 25,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                fontSize: 5
                            }
                        }
                    },
                    // 标记的数据，可以是最大值最小值也可以是自定义的坐标
                    data: []
                },
            })
            chart.setOption(option);


            interface getVlineOptIinterface {
                x1: number;
                x2: number;
                select?: string
            }
            const getVlineOpt = (x1: number | null, x2: number | null, select = '') => {
                if (x1 == null) {
                    x1 = getMarkAxis()['L1'];
                }
                if (x2 == null) {
                    x2 = getMarkAxis()['L2'];
                }
                // let color1 = '#FFBE00';
                // let color2 = '#FFBE00';
                // if (select == 'L1') {
                //   color1 = '#111111';
                // }
                // if (select == 'L2') {
                //   color2 = '#111111';
                // }
                const newCurrentMarkLineList = [
                    {
                        xAxis: x1,
                        name: 'L1',
                        symbol: 'arrow', // 设置箭头样式
                        symbolSize: 10, // 调整箭头大小
                        symbolOffset: [0, '-3100%'], // 向上偏移
                        symbolRotate: 360, // 旋转箭头使其朝上
                        lineStyle: {
                            normal: {
                                type: "dashed",
                                width: 1,
                                color: color1
                            }
                        }
                    },
                    {
                        xAxis: x2,
                        name: 'L2',
                        symbol: 'arrow', // 设置为箭头
                        symbolSize: [10, 10], // 调整箭头大小
                        lineStyle: {
                            normal: {
                                type: "dashed",
                                width: 1,
                                color: color2
                            }
                        }
                    }
                ]
                setCurrentMarkLineList(newCurrentMarkLineList)
                const option = {
                    series: [{
                        id: 'vline',
                        markLine: {
                            symbol: 'none',
                            silent: true,
                            label: {
                                show: true,
                            },
                            data: newCurrentMarkLineList
                        },
                        markPoint: {
                            symbol: 'pin',
                            // 标记的数据，可以是最大值最小值也可以是自定义的坐标
                            data: []
                        },
                    }]
                };
                return option;
            }

            const getMarkAxis = () => {
                const result = {};
                const option = chart.getOption();

                // 使用原生 forEach 来遍历 series
                option.series.forEach(function (series) {
                    if (series.id === 'vline') {
                        const markLine = series.markLine;
                        result['L1'] = markLine.data[0].xAxis;
                        result['L2'] = markLine.data[1].xAxis;
                        return; // 退出循环
                    }
                });

                return result;
            }

            //  绘制垂直的markLine
            chart.setOption(getVlineOpt(0, 4));

            //绘制L值的graphic line
            const myHeight = chart.getHeight() - 50;
            // const myWidth = chart.getWidth() - 50;
            // 添加graphic  根据markLine 添加
            chart.setOption({
                graphic: {
                    elements: (function () {
                        const graphicList = [];
                        if (currentMarkLineList.length > 0) {
                            for (let index = 0; index < currentMarkLineList.length; index++) {
                                graphicList.push({
                                    type: 'rect',
                                    id: 'rect' + (index + 1),
                                    name: 'rect' + (index + 1),
                                    bottom: -myHeight,
                                    z: 10 - index,
                                    invisible: true,
                                    shape: {
                                        width: 0,
                                        height: myHeight * 2
                                    },
                                    style: {
                                        fill: 'rgba(128,128,128,1)',
                                        stroke: 'rgba(128,128,128,1)',
                                        lineWidth: 6
                                    },
                                    // 转换坐标系上的点到像素坐标值
                                    position: [chart.convertToPixel({ xAxisId: 'x0' }, getMarkAxis()['L' + (index + 1)]), 0],
                                    bouding: 'all',
                                    cursor: 'ew-resize', // 改为左右拖动的光标
                                    // cursor: 'move',
                                    // draggable: true,
                                    draggable: 'horizontal', // 限制只能水平拖动
                                    ondragstart: onLineDragStart,
                                    ondragend: onLineDragEnd
                                });
                            }
                            // 添加面积的
                            if (currentMarkLineList.length === 2) {
                                // 判断 item 中的 id  有 没有 'rectArea'
                                const isRectArea = currentMarkLineList.some((item) => {
                                    return item.id === 'rectArea'
                                })
                                // isRectArea 为 false  ==> 添加面积
                                if (!isRectArea) {
                                    graphicList.push({
                                        type: 'rect',
                                        id: 'rectArea',
                                        name: 'rectArea',
                                        bottom: '20%',
                                        z: 8,
                                        invisible: true,
                                        shape: {
                                            width: Math.abs(chart.convertToPixel({ xAxisId: 'x0' }, getMarkAxis()['L2']) - chart.convertToPixel({ xAxisId: 'x0' }, getMarkAxis()['L1'])) - 10,
                                            height: myHeight - 100
                                        },
                                        style: {
                                            fill: 'rgba(183,81,5,0.1)',
                                            stroke: 'rgba(128,128,128,0.2)'
                                        },
                                        //转换坐标系上的点到像素坐标值
                                        position: [
                                            chart.convertToPixel({ xAxisId: 'x0' },
                                                getMarkAxis()['L1'] < getMarkAxis()['L2'] ? getMarkAxis()['L1'] : getMarkAxis()['L2']) + 5,
                                            0
                                        ],
                                        bouding: 'all',
                                        cursor: 'move',
                                        // draggable: true,
                                        draggable: 'horizontal', // 限制只能水平拖动
                                        onmouseover: onAreaMouseOver,
                                        onmouseout: onAreaMouseOut,
                                        ondragend: onAreaDragEnd,
                                    })
                                }
                            }

                        }
                        return graphicList;
                    })() // 注意此处是立即执行函数，返回数组
                }
            });


            function onLineDragStart(graphicId: any) {
                const currentGraphicId = graphicId.target.id;
                if (currentGraphicId == 'rect1') {
                    chart.setOption(getVlineOpt(null, null, 'L1'));
                } else if (currentGraphicId == 'rect2') {
                    chart.setOption(getVlineOpt(null, null, 'L2'));
                }

            }

            function onLineDragEnd(graphicId: any) {

                try {
                    const x = getXAxis(graphicId.target.position[0]);
                    //markLine重新定位
                    let vline_opt = {};
                    const currentGraphicId = graphicId.target.id;
                    if (currentGraphicId == 'rect1') {
                        vline_opt = getVlineOpt(x, null);
                    } else if (currentGraphicId == 'rect2') {
                        vline_opt = getVlineOpt(null, x);
                    }
                    chart.setOption(vline_opt);

                    //graphic重新定位
                    const graph_opt = getGraphicOpt();
                    chart.setOption(graph_opt);
                } catch (e) {
                    console.log('垂直线移动失败。');
                    console.log(e);
                }
            }

            function getXAxis(Xpx) {
                const seriesData = getSeriesData(chart, 'serie0');
                let x = chart.convertFromPixel({ xAxisId: 'x0' }, Xpx);
                if (x <= 0) {
                    x = 0;
                } else if (x >= seriesData.length) {
                    x = seriesData.length - 1;
                }
                return x;
            }

            function getSeriesData(chart, serieId) {
                let data = [];
                try {
                    const series = chart.getOption().series;

                    // 使用原生 forEach 来遍历 series
                    series.forEach(function (serie) {
                        if (serie.id === serieId) {
                            data = serie.data;
                            return; // 找到后退出循环
                        }
                    });

                } catch (e) {
                    console.log("获取数据失败。");
                    console.log(e);
                }

                return data;
            }

            //graphic重新定位
            function getGraphicOpt() {
                // 获取标记轴的数据
                const result = getMarkAxis();

                // 计算 rect1、rect2 和 rectArea 的位置和宽度
                const position1 = chart.convertToPixel({ xAxisId: 'x0' }, result['L1']);
                const position2 = chart.convertToPixel({ xAxisId: 'x0' }, result['L2']);
                const rectWidth = Math.abs(position2 - position1) - 10;

                const option = {
                    graphic: {
                        elements: [
                            {
                                id: 'rect1',
                                $action: 'merge',
                                position: [position1, 0]  // rect1 的位置
                            },
                            {
                                id: 'rect2',
                                $action: 'merge',
                                position: [position2, 0]  // rect2 的位置
                            },
                            {
                                id: 'rectArea',
                                $action: 'merge',
                                shape: {
                                    width: rectWidth  // rectArea 的宽度
                                },
                                position: [
                                    Math.min(position1, position2) + 5,  // rectArea 的位置
                                    0
                                ]
                            }
                        ]
                    }
                };

                return option;
            }

            const area_opt = {
                graphic: {
                    elements: [
                        {
                            id: 'rectArea',
                            $action: 'merge',	//如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建
                            invisible: true		//节点是否可见。
                        }]
                }
            }

            function onAreaMouseOver() {
                area_opt.graphic.elements[0].invisible = false;
                chart.setOption(area_opt);
            }

            function onAreaMouseOut() {
                area_opt.graphic.elements[0].invisible = true;
                chart.setOption(area_opt);
            }

            function onAreaDragEnd(graphicId: any) {
                // const currentGraphicId = graphicId.target.id;

                try {
                    const x_start = getXAxis(graphicId.target.position[0] - 5);
                    const x_end = getXAxis(graphicId.target.position[0] + graphicId.target.shape.width + 5);
                    // markLine 重新定位
                    let vline_opt = {};
                    const result = getMarkAxis();
                    if (result['L1'] < result['L2']) {
                        vline_opt = getVlineOpt(x_start, x_end);
                    } else {
                        vline_opt = getVlineOpt(x_end, x_start);
                    }
                    chart.setOption(vline_opt);

                    // graphic 重新定位
                    const graph_opt = getGraphicOpt();
                    chart.setOption(graph_opt);


                    // 当前页所有 echarts 修改垂直线
                    const opt = Object.assign({}, vline_opt, graph_opt); // 使用浅拷贝合并 vline_opt 和 graph_opt
                    const id = 'main'
                    changeCharts(id, opt);
                } catch (e) {
                    console.log('垂直线移动失败。');
                    console.log(e);
                }
            }

            function changeCharts(id, option) {
                try {
                    // 找到目标元素并获取所有相关的 chart 元素
                    const targetChart = document.getElementById(id);
                    if (!targetChart) return;

                    // 找到最近的 div[role=tabpanel] 父元素
                    const tabPanel = targetChart.closest('div[role=tabpanel]');
                    if (!tabPanel) return;

                    // 找到 .mychart 的所有元素
                    const charts = tabPanel.querySelectorAll('.mychart');

                    // 遍历所有 chart，排除当前 id 的 chart，并设置新 option
                    charts.forEach(function (chart) {
                        if (chart.id === id) return; // 跳过当前 chart
                        const myChart = echarts.getInstanceByDom(chart);
                        if (myChart) {
                            myChart.setOption(option);
                        }
                    });
                } catch (e) {
                    console.log("charts修改失败。");
                    console.log(e);
                }
            }
        }



        const resizeChart = () => {
            if (echartsInstance.current) {
                echartsInstance.current?.resize();
            }
        };

        initChart();

        const resizeObserver = new ResizeObserver(() => {
            resizeChart();
        });

        if (echartsRef.current) {
            resizeObserver.observe(echartsRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            if (echartsInstance.current) {
                echartsInstance.current?.dispose();
            }
        };
    }, [])
    return (
        <div className="index3-container">
            <div
                id='main'
                class="mychart"
                ref={echartsRef}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}

export default Index5;
