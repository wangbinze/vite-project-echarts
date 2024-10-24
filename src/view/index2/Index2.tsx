import React, {useEffect, useRef} from "react";
import './index2.css';
import * as echarts from "echarts";

const Index2 = () => {
    const echartsRef = React.createRef<HTMLDivElement | null>();
    const echartsInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!echartsRef.current) return;
        const chart = echarts.init(echartsRef.current);
        echartsInstance.current = chart;

        const initChart = () => {
            let option = {}
            /*option = {
                xAxis: {
                    type: 'category',
                    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        name: '2015',
                        data: [89.3, 92.1, 94.4, 85.4]
                    },
                    {
                        type: 'bar',
                        name: '2016',
                        data: [95.8, 89.4, 91.2, 76.9]
                    },
                    {
                        type: 'bar',
                        name: '2017',
                        data: [97.7, 83.1, 92.5, 78.1]
                    }
                ]
            }*/
            /*option = {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '2015', '2016', '2017'],
                        ['Matcha Latte', 43.3, 85.8, 93.7],
                        ['Milk Tea', 83.1, 73.4, 55.1],
                        ['Cheese Cocoa', 86.4, 65.2, 82.5],
                        ['Walnut Brownie', 72.4, 53.9, 39.1]
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
            }*/
            option = {
                legend: {},
                tooltip: {},
                dataset: {
                    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
                    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
                    // 如果不指定 dimensions，也可以通过指定 series.encode
                    // 完成映射，参见后文。
                    dimensions: ['product', '2015', '2016', '2017'],
                    source: [
                        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
            };
            chart.setOption(option);
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
        <div className="index2-container">
            <div
                ref={echartsRef}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    )
}

export default Index2;
