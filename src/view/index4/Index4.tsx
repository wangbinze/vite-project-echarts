import './index4.css';
import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

const Index4 = () => {
    const echartsRef = React.createRef<HTMLDivElement | null>();
    const echartsInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!echartsRef.current) return;
        const chart = echarts.init(echartsRef.current);
        echartsInstance.current = chart;

        const initChart = () => {
            let option = {}
            var data = [];
            for (let i = 0; i < 5; ++i) {
                data.push(Math.round(Math.random() * 200));
            }
            option = {
                xAxis: {
                    max: 'dataMax'
                },
                yAxis: {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D', 'E'],
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                    max: 2 // only the largest 3 bars will be displayed
                },
                series: [
                    {
                        realtimeSort: true,
                        name: 'X',
                        type: 'bar',
                        data: data,
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    }
                ],
                legend: {
                    show: true
                },
                animationDuration: 3000,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };
            chart.setOption(option);

            function update() {
                var data = option.series[0].data;
                for (var i = 0; i < data.length; ++i) {
                    if (Math.random() > 0.9) {
                        data[i] += Math.round(Math.random() * 2000);
                    } else {
                        data[i] += Math.round(Math.random() * 200);
                    }
                }
                chart.setOption(option);
            }

            setInterval(function () {
                update();
            }, 3000);
            chart.on('click', (params) => {
                console.log(params);
            })
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

export default Index4;
