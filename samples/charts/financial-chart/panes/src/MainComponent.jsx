import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import FinancialChart from './FinancialChart';
import HistoricalDataTable from './HistoricalDataTable';

const MainComponent = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/historical-data-table">View Historical Data Table</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/historical-data-table">
                        <HistoricalDataTable />
                    </Route>
                    <Route path="/">
                        <FinancialChart />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default MainComponent;

