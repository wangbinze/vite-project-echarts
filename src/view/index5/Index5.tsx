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
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        lineStyle: {
                            color: "#888888"
                        }
                    }
                },
            }

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

export default Index5;
