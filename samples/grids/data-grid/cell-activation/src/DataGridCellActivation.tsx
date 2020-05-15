import * as React from 'react';

import { DataGridSharedData } from './DataGridSharedData';

import { IgrLiveGrid } from 'igniteui-react-grids';
import { IgrLiveGridModule } from 'igniteui-react-grids';
import { IgrTextColumn } from 'igniteui-react-grids';
import { IgrNumericColumn } from 'igniteui-react-grids';
import { IgrDateTimeColumn } from 'igniteui-react-grids';

IgrLiveGridModule.register();

export default class DataGridCellActivation extends React.Component<any, any> {

    public data: any[];

    constructor(props: any) {
        super(props);
        this.data = DataGridSharedData.getEmployees();
    }

    public render() {
        return (
            <div className="igContainer">
                <IgrLiveGrid
                    height="100%"
                    width="100%"
                    defaultColumnMinWidth={100}
                    autoGenerateColumns={false}
                    dataSource={this.data}
                    selectionMode="SingleCell"
                    activationMode="Cell">

                    <IgrTextColumn propertyPath="Name" width="*>150"/>
                    <IgrTextColumn propertyPath="Street" headerText="Address" />
                    <IgrTextColumn propertyPath="City" />
                    <IgrNumericColumn propertyPath="Salary" positivePrefix="$" showGroupingSeparator="true" />
                    <IgrDateTimeColumn propertyPath="Birthday"   />

                </IgrLiveGrid>
            </div>
        );
    }
}