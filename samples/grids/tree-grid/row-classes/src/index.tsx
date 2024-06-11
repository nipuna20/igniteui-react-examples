import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { IgrTreeGridModule } from 'igniteui-react-grids';
import { IgrTreeGrid, IgrColumn } from 'igniteui-react-grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import { IgrRowType } from 'igniteui-react-grids';

import 'igniteui-react-grids/grids/combined';
import 'igniteui-react-grids/grids/themes/light/bootstrap.css';

const mods: any[] = [
    IgrTreeGridModule
];
mods.forEach((m) => m.register());

export default class Sample extends React.Component<any, any> {
    private treeGrid1: IgrTreeGrid
    private treeGrid1Ref(r: IgrTreeGrid) {
        this.treeGrid1 = r;
        this.setState({});
    }

    constructor(props: any) {
        super(props);

        this.treeGrid1Ref = this.treeGrid1Ref.bind(this);
    }

    public render(): JSX.Element {
        return (
        <div className="container sample ig-typography">

            <div className="container fill">
                <IgrTreeGrid
                    autoGenerate="false"
                    data={this.employeesFlatData}
                    primaryKey="ID"
                    foreignKey="ParentID"
                    moving="true"
                    rowEditable="true"
                    rowClasses={this.webGridRowClassesHandler}
                    ref={this.treeGrid1Ref}>
                    <IgrColumn
                        field="Name"
                        header="Full Name"
                        dataType="String">
                    </IgrColumn>
                    <IgrColumn
                        field="Age"
                        header="Age"
                        dataType="Number">
                    </IgrColumn>
                    <IgrColumn
                        field="Title"
                        header="Title"
                        dataType="String">
                    </IgrColumn>
                    <IgrColumn
                        field="HireDate"
                        header="Hire Date"
                        dataType="Date">
                    </IgrColumn>
                </IgrTreeGrid>
            </div>
        </div>
        );
    }

    private _employeesFlatData: EmployeesFlatData = null;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
    }


    public webGridRowClassesHandler = {
      activeRow: (row: IgrRowType) => row.index % 2 === 0
    };

}

// rendering above component in the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sample/>);