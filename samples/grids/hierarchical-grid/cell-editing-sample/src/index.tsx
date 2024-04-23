import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { IgrHierarchicalGridModule } from 'igniteui-react-grids';
import { IgrSelectModule } from 'igniteui-react';
import { IgrHierarchicalGrid, IgrColumn, IgrRowIsland } from 'igniteui-react-grids';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule, WebSelectDescriptionModule } from 'igniteui-react-core';
import HGridDndData from './HGridDndData.json';
import { IgrCellTemplateContext } from 'igniteui-react-grids';
import { IgrSelect, IgrSelectItem } from 'igniteui-react';

import 'igniteui-react-grids/grids/combined';
import 'igniteui-react-grids/grids/themes/light/bootstrap.css';

const mods: any[] = [
    IgrHierarchicalGridModule,
    IgrSelectModule
];
mods.forEach((m) => m.register());

export default class Sample extends React.Component<any, any> {
    private hierarchicalGrid1: IgrHierarchicalGrid
    private hierarchicalGrid1Ref(r: IgrHierarchicalGrid) {
        this.hierarchicalGrid1 = r;
        this.setState({});
    }
    private column1: IgrColumn
    private column2: IgrColumn
    private column3: IgrColumn

    constructor(props: any) {
        super(props);

        this.hierarchicalGrid1Ref = this.hierarchicalGrid1Ref.bind(this);
    }

    public render(): JSX.Element {
        return (
        <div className="container sample ig-typography">

            <div className="container fill">
                <IgrHierarchicalGrid
                    autoGenerate="false"
                    data={this.hGridDndData}
                    primaryKey="Name"
                    ref={this.hierarchicalGrid1Ref}>
                    <IgrColumn
                        field="Name"
                        header="Character Name"
                        dataType="String">
                    </IgrColumn>
                    <IgrColumn
                        field="Race"
                        header="Race"
                        dataType="String"
                        inlineEditorTemplate={this.hGridCellEditCellTemplate}
                        editable="true"
                        name="column1">
                    </IgrColumn>
                    <IgrColumn
                        field="Class"
                        header="Class"
                        inlineEditorTemplate={this.hGridCellEditCellTemplate}
                        editable="true"
                        dataType="String"
                        name="column2">
                    </IgrColumn>
                    <IgrColumn
                        field="Age"
                        header="Age"
                        dataType="String"
                        editable="true">
                    </IgrColumn>
                    <IgrColumn
                        field="Alignment"
                        header="Alignment"
                        inlineEditorTemplate={this.hGridCellEditCellTemplate}
                        editable="true"
                        dataType="String"
                        name="column3">
                    </IgrColumn>
                    <IgrRowIsland
                        childDataKey="Skills"
                        autoGenerate="false">
                        <IgrColumn
                            field="Skill"
                            header="Skill"
                            dataType="String"
                            editable="true"
                            resizable="true">
                        </IgrColumn>
                        <IgrColumn
                            field="Level"
                            header="Level"
                            dataType="String"
                            editable="true"
                            resizable="true">
                        </IgrColumn>
                    </IgrRowIsland>
                </IgrHierarchicalGrid>
            </div>
        </div>
        );
    }

    private _hGridDndData: any[] = HGridDndData;
    public get hGridDndData(): any[] {
        return this._hGridDndData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebHierarchicalGridDescriptionModule.register(context);
            WebSelectDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public hGridCellEditCellTemplate = (e: {dataContext: IgrCellTemplateContext}) => {
        let cellValues: any = [];
        let uniqueValues: any = [];
        const cell = e.dataContext.cell;
        const colIndex = cell.id.columnID;
        const field: string = this.hierarchicalGrid1.getColumnByVisibleIndex(colIndex).field;
        const key = field + "_" + cell.id.rowID;
        let index = 0;
        for(const i of (this.hGridDndData as any)){
            if(uniqueValues.indexOf(i[field]) === -1 )
            {
                cellValues.push(<><IgrSelectItem selected={e.dataContext.cell.value == i[field]}
                 value={i[field]} key={key + "_" + index}>
                    <div key={key + "_" + index}>{i[field]}</div>
            </IgrSelectItem></>);
                uniqueValues.push(i[field]);

            }
            index++;
        }
        return <><IgrSelect key={key} change={(x: any) => {
                setTimeout(() => {
                    cell.editValue = x.value;
                });
            }}>
           {cellValues}
        </IgrSelect>
        </>;
    }

}

// rendering above component in the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sample/>);