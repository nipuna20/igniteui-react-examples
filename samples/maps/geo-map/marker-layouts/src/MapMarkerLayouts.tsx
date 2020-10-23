import * as React from 'react';
import WorldUtils from "./WorldUtils"
import { IgrGeographicMapModule } from 'igniteui-react-maps';
import { IgrGeographicMap } from 'igniteui-react-maps';
import { IgrGeographicShapeSeries } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';
import { MarkerType } from 'igniteui-react-charts';
import { CollisionAvoidanceType } from 'igniteui-react-charts';
import { IgrDataContext } from 'igniteui-react-core';
import { IgrShapeDataSource } from 'igniteui-react-core';
import { DataTemplateMeasureInfo, DataTemplateRenderInfo } from 'igniteui-react-core';

IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();


export default class MapMarkerLayouts extends React.Component<any, any> {

    public geoMap: IgrGeographicMap;

    public geoSeries: IgrGeographicShapeSeries;
    

    constructor(props: any) {
        super(props);

        this.onSelectionModeChange = this.onSelectionModeChange.bind(this);

        this.state = { selectionCollisionType: "Omit" };

        this.onMapRef = this.onMapRef.bind(this);
        this.onDataLoaded = this.onDataLoaded.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="igContainer">                

                <div className="igOptions">
                <span> Marker Collision Avoidance </span>
                    <select  onChange={this.onSelectionModeChange} value={this.state.selectionCollisionType}>
                        <option>Fade</option>
                        <option>FadeAndShift</option>
                        <option>Omit</option>
                        <option>OmitAndShift</option>
                        <option>None</option>

                    </select>
                </div>

                <div className="igComponent" >
                    <IgrGeographicMap
                        ref={this.onMapRef}
                        width="100%"
                        height="100%"
                        zoomable="true" />
                </div>


                <div className="igOverlay-bottom-right">Imagery Tiles: @OpenStreetMap</div>
            </div>
        );
    }

    public onSelectionModeChange = (e: any) => {
        this.setState({ selectionCollisionType: e.target.value });
        this.geoSeries.markerCollisionAvoidance = e.target.value;
    }

    public onMapRef(geoMap: IgrGeographicMap) {
        if (!geoMap) { return; }

        this.geoMap = geoMap;
        // hiding OpenStreetMap
        this.geoMap.backgroundContent = undefined;
        // zooming map to region of North America
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        // loading a shapefile with geographic shapes
        const sds = new IgrShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = "https://static.infragistics.com/xplatform/shapes/world_countries_all.shp";
        sds.databaseSource  = "https://static.infragistics.com/xplatform/shapes/world_countries_all.dbf";
        sds.dataBind();
    }

    public onDataLoaded(sds: IgrShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log("loaded WorldCountries.shp " + shapeRecords.length);

        const countries: any[] = [];


        for (const record of shapeRecords) {
            // using field/column names from .DBF file
            const country = {
                points: record.points,
                name: record.fieldValues.Name,
                org: record.fieldValues.Alliance,
                pop: record.fieldValues.Population
            };

            countries.push(country);

        }

        this.createSeries(countries, "rgba(203, 205, 204, 1)");

    }

    public createSeries(shapeData: any[], shapeBrush: string) {
        const seriesName = "series";
        this.geoSeries = new IgrGeographicShapeSeries({ name: seriesName });
        this.geoSeries.dataSource = shapeData;
        this.geoSeries.shapeMemberPath = "points";
        this.geoSeries.brush = "lightgrey";
        this.geoSeries.outline = "Black";
        this.geoSeries.tooltipTemplate = this.createTooltip;
        this.geoSeries.thickness = 1;
        this.geoSeries.markerType = MarkerType.Hexagon;
        this.geoSeries.markerCollisionAvoidance = CollisionAvoidanceType.Omit;

        this.geoSeries.markerBrush = "DodgerBlue";
        this.geoSeries.markerOutline = "DodgerBlue";
        this.geoSeries.markerTemplate = this.getMarker();

        this.geoMap.series.add(this.geoSeries);
    }

    public getMarker(): any{ 

        let style = { outline: "#7D73E6", fill: "white", text: "black" };
        
        const size = 12;
        const radius = size / 2;
        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                 const data = measureInfo.data;
                const context = measureInfo.context;
                let value = "0.00";
                let item = data.item as any;
                if (item != null) {
                    value = item.name.toString().toUpperCase(); 
                }
                const height = context.measureText("M").width;
                const width = context.measureText(value).width;
                measureInfo.width = width;
                measureInfo.height = height + size;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                const item = renderInfo.data.item as any;    
                const value = item.name.toString().toUpperCase(); 

                const ctx = renderInfo.context as CanvasRenderingContext2D;
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;
               
                let halfHeight = renderInfo.availableHeight / 2.0;

                if (renderInfo.isHitTestRender) {
                    ctx.fillStyle = renderInfo.data.actualItemBrush.fill;
                    ctx.fillRect(x, y, renderInfo.availableWidth, renderInfo.availableHeight);
                    return;
                } else {
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = style.fill;
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = style.outline;
                    ctx.stroke();
                    ctx.closePath();
                } 

                x = renderInfo.xPosition + 5;
                y = renderInfo.yPosition + 7.5;
                if (y < 0) {
                    y -= renderInfo.availableHeight + 7.5;
                } 

                let bottomEdge = renderInfo.passInfo.viewportTop + renderInfo.passInfo.viewportHeight;
                if (y + renderInfo.availableHeight > bottomEdge) {
                    y -= renderInfo.availableHeight + 5;
                } 

                let rightEdge = renderInfo.passInfo.viewportLeft + renderInfo.passInfo.viewportWidth;
                if (x + renderInfo.availableWidth > rightEdge) {
                    x -= renderInfo.availableWidth + 12;
                } 

                ctx.beginPath();
                ctx.fillStyle = style.outline ;
                ctx.fillRect(x - 2, y - 2, renderInfo.availableWidth + 8, halfHeight + 6);
                ctx.closePath(); 

                ctx.font = '8pt Verdana';
                ctx.textBaseline = "top";
                ctx.fillStyle = style.fill;
                ctx.fillText(value, x + 2, y + 1);
 
            }
        }
    }

    public createTooltip(context: any) {
        const dataContext = context.dataContext as IgrDataContext;
        if (!dataContext) return null;

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const pop = WorldUtils.toStringAbbr(dataItem.pop);
        const titleColor = series.brush;
        const titleStyle = { color: titleColor } as React.CSSProperties;

        return <div>
            <div className="tooltipTitle" style={titleStyle}>{dataItem.org}</div>
            <div className="tooltipBox">
                <div className="tooltipRow">
                    <div className="tooltipLbl">{dataItem.name}</div>
                    <div className="tooltipVal">{pop}</div>
                </div>
            </div>
        </div>
    }



}