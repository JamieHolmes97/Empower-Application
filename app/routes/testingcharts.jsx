import React, { Suspense, lazy } from 'react';

const PieChartLazy = lazy(() => import('@mui/x-charts/PieChart').then(module => ({ default: module.PieChart })));

export default function TestingPie() {
    return (
        <div>
            <Suspense fallback={<div>Loading Chart...</div>}>
                <PieChartLazy
                    series={[
                        {
                            startAngle: -90,
                            endAngle: 90,
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </Suspense>
            <h1>Jamie Is testing Pie charts</h1>
        </div>
    );
}
