<!-- WARNING Do not change this file because it wil be auto re-generated from template file: -->
<!-- https://github.com/IgniteUI/igniteui-react-examples/tree/master/sample-template-files/ReadMe.md -->

<!-- ## Table of Contents -->
<!-- - [Sample Preview](#Sample-Preview) -->
- [Source Code](#Source-Code)
- [Instructions](#Instructions)

This folder contains implementation of React application with example of the Category Chart component. Use the following buttons to open or edit this sample on CodeSandbox website:

<!-- [Category Chart](https://infragistics.com/Reactsite/components/category-chart.html) -->

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <body>
        <a target="_blank" href="https://codesandbox.io/s/github/IgniteUI/igniteui-react-examples/tree/master/samples/charts/category-chart/stack-columns?fontsize=14&hidenavigation=1&theme=dark&view=preview&file=/src/CategoryChartStackColumns.tsx" rel="noopener noreferrer">
            <img height="40px" style="border-radius: 0.3rem" alt="Edit on CodeSandbox" src="https://static.infragistics.com/xplatform/images/sandbox/edit.png"/>
        </a>
        <!-- <a target="_blank"
href="https://codesandbox.io/s/github/IgniteUI/igniteui-react-examples/tree/master/samples/maps/geo-map/binding-csv-points?fontsize=14&hidenavigation=1&theme=dark&view=preview">
            <img alt="Edit Sample" src="https://codesandbox.io/static/img/play-codesandbox.svg"/>
        </a> -->
        <a target="_blank" style="margin-left: 0.5rem"
href="https://codesandbox.io/embed/github/IgniteUI/igniteui-react-examples/tree/master/samples/charts/category-chart/stack-columns?fontsize=14&hidenavigation=1&theme=dark&view=preview&file=/src/CategoryChartStackColumns.tsx">
            <img height="40px" style="border-radius: 0.3rem" alt="View on CodeSandbox" src="https://static.infragistics.com/xplatform/images/sandbox/view.png"/>
        </a>
        <!-- <a target="_blank"
href="https://codesandbox.io/embed/github/IgniteUI/igniteui-react-examples/tree/master/samples/maps/geo-map/binding-csv-points?fontsize=14&hidenavigation=1&theme=dark&view=preview">
            <img alt="View on CodeSandbox" src="https://static.infragistics.com/xplatform/images/sandbox/view.png"/>
        </a>
https://codesandbox.io/embed/react-treemap-overview-rtb45
https://codesandbox.io/static/img/play-codesandbox.svg
https://codesandbox.io/embed/react-treemap-overview-rtb45?view=browser -->
    </body>
</html>

<!-- ## Sample Preview -->

<!-- <iframe
  src="https://codesandbox.io/embed/github/IgniteUI/igniteui-react-examples/tree/master/samples/charts/category-chart/stack-columns?fontsize=14&hidenavigation=1&theme=dark&view=preview&file=/src/CategoryChartStackColumns.tsx"
  style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe> -->

## Source Code

The following section provides source code from:
`./src/CategoryChartStackColumns.tsx` file:

```tsx
import { IgrCategoryChart } from 'igniteui-react-charts';
import { IgrCategoryChartModule } from 'igniteui-react-charts';
import { IgrLegend } from 'igniteui-react-charts';
import { IgrLegendModule } from 'igniteui-react-charts';
import * as React from 'react';




IgrCategoryChartModule.register();
IgrLegendModule.register();

export default class CategoryChartStackColumns extends React.Component<any, any> {
    public data: any[];
    public chart: IgrCategoryChart;
    public legend: IgrLegend;

    constructor(props: any) {
        super(props);

        this.onChartRef = this.onChartRef.bind(this);
        this.onLegendRef = this.onLegendRef.bind(this);

        this.state = { chartType: "Auto" }

        this.initData();
    }

    public render() {
        return (
            <div className="igContainer">

                <IgrCategoryChart
                    ref={this.onChartRef}
                    width="100%"
                    height="calc(100% - 35px)"
                    dataSource={this.data}
                    titleTopMargin={5}
                    chartTitle="Time Spent Online By Activity"
                    chartType="Column"

                    xAxisLabelTextStyle="9pt Verdana"
                    xAxisLabelTopMargin={5}
                    xAxisLabelTextColor="gray"
                    xAxisLabelAngle={90}
                    yAxisLabelTextStyle="9pt Verdana"
                    yAxisLabelRightMargin={5}
                    yAxisLabelTextColor="gray"
                    yAxisLabelAngle={0}

                    xAxisTickLength={0}
                    xAxisTickStrokeThickness={0.5}
                    xAxisTickStroke="gray"
                    yAxisTickLength={0}

                    xAxisInterval={1}
                    xAxisStroke="gray"
                    xAxisStrokeThickness={2}

                    yAxisInterval={1}
                    yAxisMinimumValue={0}
                    yAxisMaximumValue={10}
                    yAxisMajorStroke="gray"
                    yAxisMajorStrokeThickness={0.5}
                    yAxisMinorInterval={0.5}
                    yAxisMinorStroke="gray"
                    yAxisMinorStrokeThickness={0}
                    yAxisFormatLabel={this.onFormatYAxisLabel}
                    xAxisGap={0.45}
                    xAxisOverlap={1}/>

                <div className="igLegend">
                    <IgrLegend ref={this.onLegendRef} orientation="Horizontal" />
                </div>
            </div>
        );
    }

    public onChartRef(chart: IgrCategoryChart) {
        this.chart = chart;
        this.chart.includedProperties = [
            "Blogging", "Social", "News", "TV", "Music", "Country"
        ];
        if (this.legend) {
            this.chart.legend = this.legend;
        }
    }

    public onLegendRef(legend: IgrLegend) {
        this.legend = legend;
        if (this.chart) {
            this.chart.legend = this.legend;
        }
    }

    public onFormatYAxisLabel(item: any): string {
        return item + "h";
    }

    public initData() {
        const stats: any = [
            { M: 0.1, N: 0.2, T: 1.1, S: 0.9, B: 0.3, Country: "Japan" },
            { M: 0.2, N: 0.2, T: 1.3, S: 1.2, B: 0.5, Country: "Germany" },
            { M: 0.2, N: 0.2, T: 1.5, S: 1.1, B: 0.4, Country: "France" },
            { M: 0.3, N: 0.2, T: 1.5, S: 1.4, B: 0.5, Country: "Ireland" },
            { M: 0.4, N: 0.3, T: 1.5, S: 1.3, B: 0.6, Country: "Australia" },
            { M: 0.3, N: 0.3, T: 1.4, S: 1.5, B: 1.3, Country: "Sweden" },
            { M: 0.4, N: 0.2, T: 1.4, S: 1.4, B: 1.4, Country: "Poland" },
            { M: 0.5, N: 0.3, T: 1.4, S: 1.4, B: 1.5, Country: "UK" },
            { M: 0.4, N: 0.3, T: 1.5, S: 1.4, B: 1.3, Country: "Canada" },
            { M: 0.4, N: 0.4, T: 1.5, S: 1.6, B: 1.5, Country: "Spain" },
            { M: 0.5, N: 0.3, T: 1.7, S: 1.3, B: 1.5, Country: "Germany" },
            { M: 0.4, N: 0.4, T: 2.2, S: 1.4, B: 1.6, Country: "Taiwan" },
            { M: 0.5, N: 0.3, T: 2.3, S: 1.4, B: 1.5, Country: "Russia" },
            { M: 0.5, N: 0.3, T: 2.4, S: 1.6, B: 1.3, Country: "China" },
            { M: 0.6, N: 0.4, T: 2.5, S: 1.8, B: 1.4, Country: "USA" },
            { M: 0.5, N: 0.5, T: 2.4, S: 2.2, B: 1.5, Country: "Italy" },
            { M: 0.5, N: 0.6, T: 2.5, S: 2.3, B: 1.4, Country: "India" },
            { M: 0.6, N: 0.5, T: 2.5, S: 2.4, B: 1.3, Country: "Argentina" },
            { M: 0.6, N: 0.6, T: 2.6, S: 2.5, B: 1.4, Country: "Mexico" },
            { M: 0.7, N: 0.5, T: 2.6, S: 2.6, B: 1.4, Country: "Turkey" },
            { M: 0.8, N: 0.7, T: 2.7, S: 2.7, B: 1.5, Country: "Indonesia" },
            { M: 0.9, N: 0.7, T: 2.7, S: 2.8, B: 1.6, Country: "Thailand" },
            { M: 0.8, N: 0.8, T: 2.8, S: 2.9, B: 1.7, Country: "Brazil" }
        ];

        // category chart does not have stacked series yet but you can render the stacked chart
        // using multiple columns that are overlapping with each other and showing stacked values
        for (const item of stats) {
            // stacking up values of data items
            item.Blogging = item.T + item.M + item.N + item.S + item.B;
            item.Social = item.T + item.M + item.N + item.S;
            item.News = item.T + item.M + item.N;
            item.Music = item.T + item.M;
            item.TV = item.T;
            // rounding up stacked values
            item.Blogging = Math.round(item.Blogging * 10) / 10;
            item.Social = Math.round(item.Social * 10) / 10;
            item.News = Math.round(item.News * 10) / 10;
            item.TV = Math.round(item.TV * 10) / 10;
            item.Music = Math.round(item.Music * 10) / 10;
        }
        this.data = stats;
    }
}

```

## Instructions
To run this sample locally, execute these commands:

```
git clone https://github.com/IgniteUI/igniteui-react-examples.git
cd igniteui-react-examples
cd ./samples/charts/category-chart/stack-columns
npm install
npm start

# Open http://localhost:3000/ in your browser
```
