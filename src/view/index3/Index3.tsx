import './index3.css';
import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

const Index3 = () => {
    const echartsRef = React.createRef<HTMLDivElement | null>();
    const echartsInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!echartsRef.current) return;
        const chart = echarts.init(echartsRef.current);
        echartsInstance.current = chart;

        const initChart = () => {
            let option = {}
            option = {
                xAxis: {
                    data: ['A', 'B', 'C', 'D', 'E']
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: [23, 24, 18, 25, 18],
                        barGap: '20%',
                        barCategoryGap: '40%'
                    },
                    {
                        type: 'bar',
                        data: [12, 14, 9, 9, 11]
                    }
                ]
            };
            chart.setOption(option);
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

export default Index3;
