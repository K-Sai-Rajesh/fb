import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
    return (
        <LineChart
            xAxis={[
                {
                    data: [1, 2, 3, 5, 8, 10],
                    min: 1,
                    label: 'Date',
                    scaleType: 'linear',
                    valueFormatter: (month) => `${Math.round(month)}`,
                    disableTicks: true,
                    disableLine: false,
                    tickInterval: 1,
                    labelStyle: {
                        fontFamily: "Raleway",
                        fontWeight: 'bold',
                        fontSize: 12
                    }
                },
            ]
            }
            yAxis={
                [
                    {
                        min: 0,
                        data: [1, 2, 3, 4, 5, 6],
                        label: 'Views',
                        scaleType: 'linear',
                        disableLine: false,
                        disableTicks: true,
                        labelStyle: {
                            fontFamily: "Raleway",
                            fontWeight: 'bold',
                            fontSize: 12
                        }
                    },
                ]}
            series={
                [
                    {
                        data: [2, 5, 2, 8, 1, 5],
                    }
                ]}
            width={window.innerWidth <= 899 ? window.innerWidth : window.innerWidth - 80}
            height={300}
        />
    );
}
