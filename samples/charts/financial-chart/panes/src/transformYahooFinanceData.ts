import React from 'react';

export interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface YahooFinanceResponse {
    chart: {
        result: {
            timestamp: number[];
            indicators: {
                quote: {
                    open: number[];
                    high: number[];
                    low: number[];
                    close: number[];
                    volume: number[];
                }[];
            };
        }[];
    };
}

export interface State {
    data: StockData[];
    loading: boolean;
    error: string | null;
}

export default class FinancialChartPanes extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: null,
        };
    }

    // Other methods...
}
