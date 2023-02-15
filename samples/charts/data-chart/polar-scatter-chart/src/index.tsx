import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { IgrDataChartCoreModule, IgrDataChartPolarModule, IgrDataChartPolarCoreModule, IgrDataChartInteractivityModule, IgrDataChartAnnotationModule } from 'igniteui-react-charts';
import { IgrDataChart, IgrNumericAngleAxis, IgrNumericRadiusAxis, IgrPolarScatterSeries, IgrDataToolTipLayer } from 'igniteui-react-charts';
import { BoatSailingDataItem, BoatSailingData } from './BoatSailingData';



const mods: any[] = [
    IgrDataChartCoreModule,
    IgrDataChartPolarModule,
    IgrDataChartPolarCoreModule,
    IgrDataChartInteractivityModule,
    IgrDataChartAnnotationModule
];
mods.forEach((m) => m.register());

export default class Sample extends React.Component<any, any> {
    private chart: IgrDataChart
    private chartRef(r: IgrDataChart) {
        this.chart = r;
        this.setState({});
    }
    private angleAxis: IgrNumericAngleAxis
    private radiusAxis: IgrNumericRadiusAxis
    private polarScatterSeries1: IgrPolarScatterSeries
    private polarScatterSeries2: IgrPolarScatterSeries
    private dataToolTipLayer: IgrDataToolTipLayer

    constructor(props: any) {
        super(props);

        this.chartRef = this.chartRef.bind(this);
    }

    public render(): JSX.Element {
        return (
        <div className="container sample">

            <div className="legend-title">
                Wind Speed vs Boat Speed
            </div>


            <div className="container fill">
                <IgrDataChart
                    isHorizontalZoomEnabled="false"
                    isVerticalZoomEnabled="false"
                    ref={this.chartRef}>
                    <IgrNumericAngleAxis
                        startAngleOffset="-90"
                        minimumValue="0"
                        maximumValue="360"
                        interval="30"
                        name="angleAxis">
                    </IgrNumericAngleAxis>
                    <IgrNumericRadiusAxis
                        radiusExtentScale="0.9"
                        innerRadiusExtentScale="0.1"
                        minimumValue="0"
                        maximumValue="100"
                        interval="25"
                        name="radiusAxis">
                    </IgrNumericRadiusAxis>
                    <IgrPolarScatterSeries
                        angleMemberPath="direction"
                        radiusMemberPath="windSpeed"
                        angleAxisName="angleAxis"
                        radiusAxisName="radiusAxis"
                        markerType="Circle"
                        dataSource={this.boatSailingData}
                        showDefaultTooltip="false"
                        title="Wind Speed"
                        name="PolarScatterSeries1">
                    </IgrPolarScatterSeries>
                    <IgrPolarScatterSeries
                        dataSource={this.boatSailingData}
                        angleAxisName="angleAxis"
                        radiusAxisName="radiusAxis"
                        angleMemberPath="direction"
                        radiusMemberPath="boatSpeed"
                        showDefaultTooltip="false"
                        title="Boat Speed"
                        markerType="Circle"
                        name="PolarScatterSeries2">
                    </IgrPolarScatterSeries>
                    <IgrDataToolTipLayer
                        name="DataToolTipLayer">
                    </IgrDataToolTipLayer>
                </IgrDataChart>
            </div>
        </div>
        );
    }

    private _boatSailingData: BoatSailingData = null;
    public get boatSailingData(): BoatSailingData {
        if (this._boatSailingData == null)
        {
            this._boatSailingData = new BoatSailingData();
        }
        return this._boatSailingData;
    }
    


}


// rendering above component in the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sample/>);