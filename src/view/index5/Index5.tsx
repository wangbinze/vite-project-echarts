import './index5.css';
import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

const Index5 = () => {
    const echartsRef = React.createRef<HTMLDivElement | null>();
    const echartsInstance = useRef<echarts.ECharts | null>(null);


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
            let option: any = {
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


            const getVlineOpt = (x1: number, x2: number) => {
                if (x1 == null) {
                    x1 = getMarkAxis()['L1'];
                }
                if (x2 == null) {
                    x2 = getMarkAxis()['L2'];
                }
                const color1 = '#FFBE00';
                const color2 = '#FFBE00';
                let option = {
                    series: [{
                        id: 'vline',
                        markLine: {
                            symbol: 'none',
                            silent: true,
                            label: {
                                show: true,
                            },
                            data: [{
                                xAxis: x1,
                                name: 'L1',
                                lineStyle: {
                                    normal: {
                                        type: "dashed",
                                        width: 1,
                                        color: color1
                                    }
                                }
                            }, {
                                xAxis: x2,
                                name: 'L2',
                                lineStyle: {
                                    normal: {
                                        type: "dashed",
                                        width: 1,
                                        color: color2
                                    }
                                }
                            }]
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
                let result = {};
                let option = chart.getOption();

                // 使用原生 forEach 来遍历 series
                option.series.forEach(function (series) {
                    if (series.id === 'vline') {
                        var markLine = series.markLine;
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
            const myWidth = chart.getWidth() - 50;
            console.log(myHeight, myWidth, 'myHeight, myWidth');
            // 添加graphic
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
                ref={echartsRef}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    )
}

export default Index5;
