import * as React from 'react';
import { DataGridSharedData } from './DataGridSharedData';
import { IgrDataGrid } from 'igniteui-react-grids';
import { IgrDataGridModule } from 'igniteui-react-grids';
import { IgrTemplateColumn } from 'igniteui-react-grids';
import { IgrTextColumn } from 'igniteui-react-grids';
import { IgrNumericColumn } from 'igniteui-react-grids';
import { IgrDateTimeColumn } from 'igniteui-react-grids';
import { IgrImageColumn } from 'igniteui-react-grids';
import { IgrGridColumnOptionsModule } from 'igniteui-react-grids';
import { IgrTemplateCellUpdatingEventArgs } from 'igniteui-react-grids';
import { IEditableDataSource } from 'igniteui-react-core';
import { IgrGridCellValueChangingEventArgs } from 'igniteui-react-grids';

IgrDataGridModule.register();
IgrGridColumnOptionsModule.register();

export default class DataGridCellEditing extends React.Component<any, any> {

    public data: any[];
    public grid: IgrDataGrid;

    constructor(props: any) {
        super(props);

        this.onGridRef = this.onGridRef.bind(this);

        this.state = { selectionMode: "MultipleRow" }
        this.data = DataGridSharedData.getEmployees();
    }

	public render(): JSX.Element {
        return (
            <div className="igContainer">
                <div className="igOptions">
                <button onClick={this.onCommitClick}>Commit</button>
                    <button disabled={!this.canUndo} onClick={this.onUndoClick}>Undo</button>
                    <button disabled={!this.canRedo} onClick={this.onRedoClick}>Redo</button>
                    <label>
                        Edit Mode:
                        <select value={this.editMode} onChange={this.onEditModeChange}>
                            <option value="0">None</option>
                            <option value="1">Cell</option>
                            <option value="2">Cell Batch</option>
                        </select>
                    </label>
                </div>
                <IgrDataGrid
                    ref={this.onGridRef}
                    height="calc(100% - 40px)"
                    width="100%"
                    defaultColumnMinWidth={120}
                    autoGenerateColumns={false}
                    dataSource={this.data}
                    activationMode="Cell"
                    selectionMode="SingleRow"
                    selectionBehavior="ModifierBased"
                    isColumnOptionsEnabled="true"
                    cellValueChanging={this.onCellValueChanging}>
                    <IgrTextColumn field="Name" width="*>150"/>
                    <IgrTextColumn field="Street" headerText="Street" width="*>160" />
                    <IgrTextColumn field="City" headerText="City" width="*>120" />
                    <IgrNumericColumn field="Salary" headerText="Salary" width="*>120" positivePrefix="$" showGroupingSeparator="true" />
                    <IgrImageColumn field="Photo" headerText="Photo" contentOpacity="1"
                    horizontalAlignment="center"  width="*>110"/>
                    <IgrDateTimeColumn field="Birthday" headerText="Date of Birth" width="*>170"/>
                    <IgrTemplateColumn isColumnOptionsEnabled="false" field="DeleteColumn" headerText="Delete Row" width="80" cellUpdating={this.onDeleteCellUpdating}/>
                </IgrDataGrid>
            </div>
        );
    }

    get canUndo(): boolean {
        return this.grid && this.grid.canUndo;
    }

    get canRedo(): boolean {
        return this.grid && this.grid.canRedo;
    }

    get editMode(): number {
        if (this.grid) {
            return this.grid.editMode;
        }
        return 1;
    }

    public onGridRef(grid: IgrDataGrid) {
        if (!grid) { return; }

        this.grid = grid;
    }

    onCellValueChanging = (s: IgrDataGrid, e: IgrGridCellValueChangingEventArgs) => {

        if(e.newValue === "") {
            s.setEditError(e.editID, "Error, cell is empty");
        }

        // request a new render so the undo/redo buttons update.
        setTimeout(() => this.setState({ }));

    }

    onDeleteCellUpdating = (s: IgrTemplateColumn, e: IgrTemplateCellUpdatingEventArgs) => {
        const content = e.content as HTMLDivElement;
        if (content.childElementCount === 0) {
            const button = document.createElement("button") as HTMLButtonElement;
            button.innerText = "Delete";
            button.addEventListener("click", this.onDeleteRowClick);
            content.appendChild(button);
        }

        const button = content.children[0] as HTMLButtonElement;
        button.disabled = e.cellInfo.isDeleted;
        button.id = e.cellInfo.dataRow.toString();
    }

    //#region Input Control Handlers

    onCommitClick = () => {
        this.grid.commitEdits();

        // request a new render so the undo/redo buttons update.
        this.setState({ });
    }

    onUndoClick = () => {
        this.grid.undo();

        // request a new render so the undo/redo buttons update.
        this.setState({ });
    }

    onRedoClick = () => {
        this.grid.redo();

        // request a new render so the undo/redo buttons update.
        this.setState({ });
    }

    onDeleteRowClick = (e: MouseEvent) => {
        const button = e.srcElement as HTMLButtonElement;
        const viewIndex = parseInt(button.id);
        const rowItem = this.grid.actualDataSource.getItemAtIndex(viewIndex);
        let t = (this.grid.actualDataSource as any) as IEditableDataSource;
        t.removeItemByKey([rowItem]);
        this.grid.commitEdits();
        this.setState({ });
    }

    onEditModeChange = (event: any) => {
        this.grid.editMode = parseInt(event.target.value);

        this.setState({ });
    }
}
