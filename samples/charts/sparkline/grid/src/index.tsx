import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Products } from './Products';
// sparkline modules:
import { IgrSparkline } from "@infragistics/igniteui-react-charts";
import { IgrSparklineModule } from "@infragistics/igniteui-react-charts";
// grid modules:
import { IgrDataGridModule } from "@infragistics/igniteui-react-grids";
import { IgrDataGrid } from "@infragistics/igniteui-react-grids";
import { IgrTextColumn } from "@infragistics/igniteui-react-grids";
import { IgrNumericColumn } from "@infragistics/igniteui-react-grids";
import { IgrImageColumn } from "@infragistics/igniteui-react-grids";
import { IgrTemplateColumn, IIgrCellTemplateProps } from "@infragistics/igniteui-react-grids";
import { IgrTemplateCellInfo } from "@infragistics/igniteui-react-grids";

IgrDataGridModule.register();
IgrSparklineModule.register();

export default class SparklineGrid extends React.Component<any, any> {

    public data: any[];

    constructor(props: any) {
        super(props);

        this.data = Products.getData();
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">
                <IgrDataGrid
                    width="100%"
                    height="100%"
                    rowHeight="90"
                    autoGenerateColumns="false"
                    dataSource={this.data}>
                    <IgrTextColumn
                        field="ProductID"
                        headerText="ID"
                        width="*>110"
                        horizontalAlignment="Center" />
                    <IgrTextColumn
                        field="ProductName"
                        headerText="Product"
                        width="*>140" />
                    <IgrNumericColumn
                        field="ProductPrice"
                        headerText="Price"
                        width="*>110"
                        positivePrefix="$"
                        showGroupingSeparator={true}
                        minFractionDigits={2} />
                    <IgrTemplateColumn
                        field="OrderHistory"
                        headerText="Order History"
                        width="*>180"
                        paddingTop={10}
                        paddingBottom={10}
                        horizontalAlignment="Center"
                        template={this.getOrderHistoryTemplate} />
                    <IgrNumericColumn
                        field="OrderCount"
                        headerText="Orders"
                        width="*>110"
                        horizontalAlignment="Center" />
                    <IgrNumericColumn
                        field="Profit"
                        width="*>120"
                        positivePrefix="$"
                        showGroupingSeparator={true} />
                    <IgrImageColumn
                        field="CountryFlag"
                        headerText="Country"
                        width="*>120"
                        isEditable={false}
                        contentOpacity={1}
                        horizontalAlignment="Center"
                        paddingTop={10}
                        paddingBottom={10} />
                    <IgrTextColumn
                        field="Status"
                        width="*>120"
                        horizontalAlignment="Center" />
               </IgrDataGrid>
            </div>
        );
    }

    public getOrderHistoryTemplate(props: IIgrCellTemplateProps) {
        const info = props.dataContext as IgrTemplateCellInfo;
        return (
            <div style={{ width: "100%", height: "70px", background: "transparent" }}>
                <IgrSparkline
                    width="100%"
                    height="100%" 
                    displayType="Line"
                    dataSource={info.rowItem.OrderHistory}
                    valueMemberPath="Sold"
                    labelMemberPath="Week"
                    brush="rgb(21, 190, 6)" />
            </div>
        );
    }
}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SparklineGrid/>);
