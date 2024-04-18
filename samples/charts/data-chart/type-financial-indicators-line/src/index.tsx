import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SampleFinancialData } from './SampleFinancialData';
// axis' modules:
import { IgrNumericYAxis } from "@infragistics/igniteui-react-charts";
import { IgrCategoryXAxis } from "@infragistics/igniteui-react-charts";
// series' modules:
import { IgrFinancialPriceSeries } from "@infragistics/igniteui-react-charts";
// data chart's modules:
import { IgrDataChart } from "@infragistics/igniteui-react-charts";
import { IgrDataChartCoreModule } from "@infragistics/igniteui-react-charts";
import { IgrDataChartCategoryTrendLineModule } from "@infragistics/igniteui-react-charts";
import { IgrDataChartInteractivityModule } from "@infragistics/igniteui-react-charts";
// indicator's modules:
import { IgrAbsoluteVolumeOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrAccumulationDistributionIndicator } from "@infragistics/igniteui-react-charts";
import { IgrAverageDirectionalIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrAverageTrueRangeIndicator } from "@infragistics/igniteui-react-charts";
import { IgrBollingerBandWidthIndicator } from "@infragistics/igniteui-react-charts";
import { IgrChaikinVolatilityIndicator } from "@infragistics/igniteui-react-charts";
import { IgrChaikinOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrCommodityChannelIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrDetrendedPriceOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrEaseOfMovementIndicator } from "@infragistics/igniteui-react-charts";
import { IgrFastStochasticOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrForceIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrFullStochasticOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrMarketFacilitationIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrMassIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrMedianPriceIndicator } from "@infragistics/igniteui-react-charts";
import { IgrMoneyFlowIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrMovingAverageConvergenceDivergenceIndicator } from "@infragistics/igniteui-react-charts";
import { IgrNegativeVolumeIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrOnBalanceVolumeIndicator } from "@infragistics/igniteui-react-charts";
import { IgrPercentagePriceOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrPercentageVolumeOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrPositiveVolumeIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrPriceVolumeTrendIndicator } from "@infragistics/igniteui-react-charts";
import { IgrRateOfChangeAndMomentumIndicator } from "@infragistics/igniteui-react-charts";
import { IgrRelativeStrengthIndexIndicator } from "@infragistics/igniteui-react-charts";
import { IgrSlowStochasticOscillatorIndicator } from "@infragistics/igniteui-react-charts";
import { IgrStandardDeviationIndicator } from "@infragistics/igniteui-react-charts";
import { IgrStochRSIIndicator } from "@infragistics/igniteui-react-charts";
import { IgrTRIXIndicator } from "@infragistics/igniteui-react-charts";
import { IgrStrategyBasedIndicator } from "@infragistics/igniteui-react-charts";
import { IndicatorDisplayType } from "@infragistics/igniteui-react-charts";
import { IgrNumberAbbreviatorModule } from "@infragistics/igniteui-react-charts";

IgrNumberAbbreviatorModule.register();
IgrDataChartCoreModule.register();
IgrDataChartCategoryTrendLineModule.register();
IgrDataChartInteractivityModule.register();

export default class DataChartTypeFinancialIndicatorLine extends React.Component<any, any> {
    public data: any[];
    public chart: IgrDataChart;

    private displayType: IndicatorDisplayType = IndicatorDisplayType.Line;

    constructor(props: any) {
        super(props);
        this.data = SampleFinancialData.create();

        this.onChartRef = this.onChartRef.bind(this);

        this.state = { indicatorType: "AbsoluteVolumeOscillator" };
    }

    public onIndicatorChanged = (e: any) => {
        const seriesType = e.target.value.toString();
        this.chart.series.clear();
        this.switchSeries(seriesType);
        this.setState({indicatorType: seriesType});
    }

    public switchSeries(seriesType: any) {
        let indicator: IgrStrategyBasedIndicator;

        switch (seriesType) {
            case "AbsoluteVolumeOscillator": {
                indicator = new IgrAbsoluteVolumeOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "AccumulationDistribution": {
                indicator = new IgrAccumulationDistributionIndicator({ name: "indicator" });
                break;
            }
            case "AverageDirectionalIndex": {
                indicator = new IgrAverageDirectionalIndexIndicator({ name: "indicator" });
                break;
            }
            case "AverageTrueRange": {
                indicator = new IgrAverageTrueRangeIndicator({ name: "indicator" });
                break;
            }
            case "BollingerBandWidth": {
                indicator = new IgrBollingerBandWidthIndicator({ name: "indicator" });
                break;
            }
            case "ChaikinVolatility": {
                indicator = new IgrChaikinVolatilityIndicator({ name: "indicator" });
                break;
            }
            case "ChaikinOscillator": {
                indicator = new IgrChaikinOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "CommodityChannelIndex": {
                indicator = new IgrCommodityChannelIndexIndicator({ name: "indicator" });
                break;
            }
            case "DetrendedPriceOscillator": {
                indicator = new IgrDetrendedPriceOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "EaseOfMovement": {
                indicator = new IgrEaseOfMovementIndicator({ name: "indicator" });
                break;
            }
            case "FastStochasticOscillator": {
                indicator = new IgrFastStochasticOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "ForceIndex": {
                indicator = new IgrForceIndexIndicator({ name: "indicator" });
                break;
            }
            case "FullStochasticOscillator": {
                indicator = new IgrFullStochasticOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "MarketFacilitationIndex": {
                indicator = new IgrMarketFacilitationIndexIndicator({ name: "indicator" });
                break;
            }
            case "MassIndex": {
                indicator = new IgrMassIndexIndicator({ name: "indicator" });
                break;
            }
            case "MedianPrice": {
                indicator = new IgrMedianPriceIndicator({ name: "indicator" });
                break;
            }
            case "MoneyFlowIndex": {
                indicator = new IgrMoneyFlowIndexIndicator({ name: "indicator" });
                break;
            }
            case "MovingAverageConvergenceDivergence": {
                indicator = new IgrMovingAverageConvergenceDivergenceIndicator({ name: "indicator" });
                break;
            }
            case "NegativeVolumeIndex": {
                indicator = new IgrNegativeVolumeIndexIndicator({ name: "indicator" });
                break;
            }
            case "OnBalanceVolume": {
                indicator = new IgrOnBalanceVolumeIndicator({ name: "indicator" });
                break;
            }
            case "PercentagePriceOscillator": {
                indicator = new IgrPercentagePriceOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "PercentageVolumeOscillator": {
                indicator = new IgrPercentageVolumeOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "PositiveVolumeIndex": {
                indicator = new IgrPositiveVolumeIndexIndicator({ name: "indicator" });
                break;
            }
            case "PriceVolumeTrend": {
                indicator = new IgrPriceVolumeTrendIndicator({ name: "indicator" });
                break;
            }
            case "RateOfChangeAndMomentum": {
                indicator = new IgrRateOfChangeAndMomentumIndicator({ name: "indicator" });
                break;
            }
            case "RelativeStrengthIndex": {
                indicator = new IgrRelativeStrengthIndexIndicator({ name: "indicator" });
                break;
            }
            case "SlowStochasticOscillator": {
                indicator = new IgrSlowStochasticOscillatorIndicator({ name: "indicator" });
                break;
            }
            case "StandardDeviation": {
                indicator = new IgrStandardDeviationIndicator({ name: "indicator" });
                break;
            }
            case "StochRSI": {
                indicator = new IgrStochRSIIndicator({ name: "indicator" });
                break;
            }
            case "TRIX": {
                indicator = new IgrTRIXIndicator({ name: "indicator" });
                break;
            }
        }

        if (indicator !== undefined) {
            indicator.xAxisName = "xAxis2";
            indicator.yAxisName = "yAxis2";
            indicator.title = "Indicator";
            indicator.displayType = this.displayType;
            indicator.highMemberPath = "High";
            indicator.lowMemberPath = "Low";
            indicator.closeMemberPath = "Close";
            indicator.openMemberPath = "Open";
            indicator.volumeMemberPath = "Volume";
            indicator.showDefaultTooltip = true;
            this.chart.series.add(indicator);
        }
    }

    public onChartRef(chart: IgrDataChart) {
        if (!chart) { return; }

        this.chart = chart;
        if (chart !== undefined){
            this.switchSeries(this.state.indicatorType);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">
                <div className="container" style={{ height: "calc(50% - 20px)" }} >
                    <IgrDataChart
                        width="100%"
                        height="100%"
                        dataSource={this.data}
                        isHorizontalZoomEnabled={true}
                        isVerticalZoomEnabled={true}>

                        <IgrCategoryXAxis name="xAxis1" label="Label" labelAngle={45} />
                        <IgrNumericYAxis  name="yAxis1" labelLocation="OutsideLeft" title="Financial Prices" />

                        <IgrFinancialPriceSeries
                            name="series1"
                            xAxisName="xAxis1"
                            yAxisName="yAxis1"
                            title="Stock Prices"
                            displayType="Candlestick"
                            highMemberPath="High"
                            lowMemberPath="Low"
                            closeMemberPath="Close"
                            openMemberPath="Open"
                            volumeMemberPath="Volume"
                            showDefaultTooltip="true" />
                    </IgrDataChart>
                </div>
                <div className="options horizontal">
                    <label className="options-label"> Indicator Type: </label>
                    <select value={this.state.indicatorType}
                        onChange={this.onIndicatorChanged}>
                        <option>AbsoluteVolumeOscillator</option>
                        <option>AccumulationDistribution</option>
                        <option>AverageDirectionalIndex</option>
                        <option>AverageTrueRange</option>
                        <option>BollingerBandWidth</option>
                        <option>ChaikinVolatility</option>
                        <option>ChaikinOscillator</option>
                        <option>CommodityChannelIndex</option>
                        <option>DetrendedPriceOscillator</option>
                        <option>EaseOfMovement</option>
                        <option>FastStochasticOscillator</option>
                        <option>ForceIndex</option>
                        <option>FullStochasticOscillator</option>
                        <option>MarketFacilitationIndex</option>
                        <option>MassIndex</option>
                        <option>MedianPrice</option>
                        <option>MoneyFlowIndex</option>
                        <option>MovingAverageConvergenceDivergence</option>
                        <option>NegativeVolumeIndex</option>
                        <option>OnBalanceVolume</option>
                        <option>PercentagePriceOscillator</option>
                        <option>PercentageVolumeOscillator</option>
                        <option>PositiveVolumeIndex</option>
                        <option>PriceVolumeTrend</option>
                        <option>RateOfChangeAndMomentum</option>
                        <option>RelativeStrengthIndex</option>
                        <option>SlowStochasticOscillator</option>
                        <option>StandardDeviation</option>
                        <option>StochRSI</option>
                        <option>TRIX</option>
                    </select>
                </div>

                <div className="container" style={{ height: "calc(50% - 20px)" }}>
                    <IgrDataChart
                        width="100%"
                        height="100%"
                        ref={this.onChartRef}
                        dataSource={this.data}
                        isHorizontalZoomEnabled="true"
                        isVerticalZoomEnabled="true">

                        <IgrCategoryXAxis name="xAxis2" label="Label" labelAngle={45} />
                        <IgrNumericYAxis  name="yAxis2" labelLocation="OutsideLeft" title="Indicators"
                        abbreviateLargeNumbers="true"/>
                    </IgrDataChart>

                </div>
            </div>
        );
    }
}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DataChartTypeFinancialIndicatorLine/>);
