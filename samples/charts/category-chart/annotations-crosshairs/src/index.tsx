import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { IgrPropertyEditorPanelModule } from 'igniteui-react-layouts';
import { IgrCategoryChartModule } from 'igniteui-react-charts';
import { IgrPropertyEditorPanel, IgrPropertyEditorPropertyDescription } from 'igniteui-react-layouts';
import { IgrCategoryChart } from 'igniteui-react-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-react-core';
import { TemperatureAnnotatedDataItem, TemperatureAnnotatedData } from './TemperatureAnnotatedData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';

defineAllComponents();

const mods: any[] = [
    IgrPropertyEditorPanelModule,
    IgrCategoryChartModule
];
mods.forEach((m) => m.register());

export default class Sample extends React.Component<any, any> {
    private propertyEditor: IgrPropertyEditorPanel
    private propertyEditorRef(r: IgrPropertyEditorPanel) {
        this.propertyEditor = r;
        this.setState({});
    }
    private crosshairsDisplayModeEditor: IgrPropertyEditorPropertyDescription
    private crosshairsSnapToDataEditor: IgrPropertyEditorPropertyDescription
    private chart: IgrCategoryChart
    private chartRef(r: IgrCategoryChart) {
        this.chart = r;
        this.setState({});
    }

    constructor(props: any) {
        super(props);

        this.propertyEditorRef = this.propertyEditorRef.bind(this);
        this.chartRef = this.chartRef.bind(this);
    }

    public render(): JSX.Element {
        return (
        <div className="container sample">
            <div className="options vertical">
                <IgrPropertyEditorPanel
                    componentRenderer={this.renderer}
                    target={this.chart}
                    descriptionType="CategoryChart"
                    isHorizontal="true"
                    isWrappingEnabled="true"
                    ref={this.propertyEditorRef}>
                    <IgrPropertyEditorPropertyDescription
                        propertyPath="CrosshairsDisplayMode"
                        label="Crosshairs Display Mode: "
                        primitiveValue="Both"
                        name="CrosshairsDisplayModeEditor">
                    </IgrPropertyEditorPropertyDescription>
                    <IgrPropertyEditorPropertyDescription
                        propertyPath="CrosshairsSnapToData"
                        label="Crosshairs Snap to Data"
                        primitiveValue="True"
                        shouldOverrideDefaultEditor="true"
                        name="CrosshairsSnapToDataEditor">
                    </IgrPropertyEditorPropertyDescription>
                </IgrPropertyEditorPanel>
            </div>

            <div className="legend-title">
                Average Temperature in Sedney
            </div>

            <div className="container fill">
                <IgrCategoryChart
                    chartType="Column"
                    yAxisMaximumValue="35"
                    yAxisLabelLocation="OutsideRight"
                    dataSource={this.temperatureAnnotatedData}
                    includedProperties={["month", "temperature"]}
                    isHorizontalZoomEnabled="false"
                    isVerticalZoomEnabled="false"
                    computedPlotAreaMarginMode="Series"
                    crosshairsDisplayMode="Both"
                    crosshairsSnapToData="true"
                    crosshairsLineVerticalStroke="black"
                    crosshairsLineThickness="2"
                    crosshairsLineHorizontalStroke="dodgerblue"
                    crosshairsAnnotationXAxisBackground="black"
                    crosshairsAnnotationYAxisBackground="dodgerblue"
                    crosshairsAnnotationYAxisPrecision="0"
                    ref={this.chartRef}>
                </IgrCategoryChart>
            </div>
        </div>
        );
    }

    private _temperatureAnnotatedData: TemperatureAnnotatedData = null;
    public get temperatureAnnotatedData(): TemperatureAnnotatedData {
        if (this._temperatureAnnotatedData == null)
        {
            this._temperatureAnnotatedData = new TemperatureAnnotatedData();
        }
        return this._temperatureAnnotatedData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

// rendering above component in the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sample/>);