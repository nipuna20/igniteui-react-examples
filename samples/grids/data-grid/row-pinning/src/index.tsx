import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { DataGridSharedData } from './DataGridSharedData';
// grid modules:
import { IgrDataGridModule } from "@infragistics/igniteui-react-grids";
import { IgrDataGrid } from "@infragistics/igniteui-react-grids";
import { IgrTextColumn } from "@infragistics/igniteui-react-grids";
import { IgrNumericColumn } from "@infragistics/igniteui-react-grids";
import { IgrDateTimeColumn } from "@infragistics/igniteui-react-grids";
import { IgrImageColumn } from "@infragistics/igniteui-react-grids";
import { IgrGridColumnOptionsModule } from "@infragistics/igniteui-react-grids";

IgrDataGridModule.register();
IgrGridColumnOptionsModule.register();

export default class DataGridRowPinning extends React.Component<any, any> {

    public data: any[];
    public grid: IgrDataGrid;

    constructor(props: any) {
        super(props);

        this.state = { componentVisible: true };
        this.data = DataGridSharedData.getEmployees();
    }

    public render(): JSX.Element {
        return (
        <div className="container sample">

            <IgrDataGrid
                height="100%"
                width="100%"
                autoGenerateColumns="false"
                dataSource={this.data}
                ref={this.onGridRef}
                isColumnOptionsEnabled="true">
                {/* <IgrTextColumn field="ID"  width="*>90" /> */}
                <IgrImageColumn field="Photo" width="*>140" contentOpacity="1" horizontalAlignment="center"/>
                <IgrTextColumn field="FirstName" width="*>150" headerText="First Name" />
                <IgrTextColumn field="LastName" width="*>140" headerText="Last Name"/>
                <IgrTextColumn field="City"  width="*>120"/>
                <IgrTextColumn field="Country"  width="*>150"/>
                <IgrNumericColumn field="Sales"  width="*>140" positivePrefix="$" showGroupingSeparator="true"/>
                <IgrNumericColumn field="Age"  width="*>110"/>
                <IgrDateTimeColumn field="Birthday" width="*>170" headerText="Date of Birth" horizontalAlignment="right"/>
            </IgrDataGrid>
        </div>
        );
    }

    public onGridRef = (grid: IgrDataGrid) => {
        if (!grid) { return; }

        this.grid = grid;
        this.grid.pinnedItems.add(this.data[2]);
        this.grid.pinnedItems.add(this.data[4]);
    }

}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DataGridRowPinning/>);
