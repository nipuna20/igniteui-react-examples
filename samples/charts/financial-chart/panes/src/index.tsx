import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import { YahooFinanceResponse, StockData, State } from './transformYahooFinanceData';



import axios from 'axios';

IgrFinancialChartModule.register();

export default class FinancialChartPanes extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await axios.get<YahooFinanceResponse>('https://query1.finance.yahoo.com/v8/finance/chart/TSLA');
            const chartData = this.transformYahooFinanceData(response.data);
            this.setState({ data: chartData, loading: false });
        } catch (error: any) {
            this.setState({ error: error.message, loading: false });
        }
    }

    transformYahooFinanceData(data: YahooFinanceResponse): StockData[] {
        const result: StockData[] = [];
        const timestamps = data.chart.result[0].timestamp;
        const quotes = data.chart.result[0].indicators.quote[0];

        for (let i = 0; i < timestamps.length; i++) {
            result.push({
                date: new Date(timestamps[i] * 1000),
                open: quotes.open[i],
                high: quotes.high[i],
                low: quotes.low[i],
                close: quotes.close[i],
                volume: quotes.volume[i],
            });
        }

        return result;
    }

    public render(): JSX.Element {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (this.state.error) {
            return <div>Error: {this.state.error}</div>;
        }

        return (
            <div className="container sample" >
                <div className="container">
                    <IgrFinancialChart
                        width="100%"
                        height="100%"
                        chartType="Candle"
                        zoomSliderType="Candle"
                        volumeType="Area"
                        overlayBrushes="rgba(5, 138, 0, 0.17)"
                        overlayOutlines="rgba(5, 138, 0, 0.4)"
                        overlayThickness={1}
                        dataSource={this.state.data} />
                </div>
            </div>
        );
    }
}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FinancialChartPanes />);
