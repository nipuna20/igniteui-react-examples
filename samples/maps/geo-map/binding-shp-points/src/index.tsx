import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WorldUtils from "./WorldUtils"
import { IgrGeographicMapModule } from "@infragistics/igniteui-react-maps";
import { IgrGeographicMap } from "@infragistics/igniteui-react-maps";
import { IgrGeographicSymbolSeries } from "@infragistics/igniteui-react-maps";
import { IgrDataChartInteractivityModule } from "@infragistics/igniteui-react-charts";
import { IgrDataContext } from "@infragistics/igniteui-react-core";
import { IgrShapeDataSource } from "@infragistics/igniteui-react-core";
import { MarkerType } from "@infragistics/igniteui-react-charts";

IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();

export default class MapBindingShapefilePoints extends React.Component {

    public geoMap: IgrGeographicMap;

    constructor(props: any) {
        super(props);

        this.onMapRef = this.onMapRef.bind(this);
        this.onDataLoaded = this.onDataLoaded.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">
                <div className="container" >
                    <IgrGeographicMap
                        ref={this.onMapRef}
                        width="100%"
                        height="100%"
                        zoomable="true"/>
                </div>
                <div className="overlay-bottom-right overlay-border">Imagery Tiles: @OpenStreetMap</div>
            </div>
        );
    }

    public onMapRef(geoMap: IgrGeographicMap) {
        if (!geoMap) { return; }

        this.geoMap = geoMap;
        this.geoMap.updateZoomWindow({ left: 0.2, top: 0.1, width: 0.6, height: 0.6 });

        // loading a shapefile with geographic points
        const sds = new IgrShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = "https://static.infragistics.com/xplatform/shapes/WorldCities.shp";
        sds.databaseSource  = "https://static.infragistics.com/xplatform/shapes/WorldCities.dbf";
        sds.dataBind();
    }

    public onDataLoaded(sds: IgrShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log("loaded WorldCities.shp " + shapeRecords.length);

        const geoLocations: any[] = [];
        // parsing shapefile data and creating geo-locations
        for (const record of shapeRecords) {
            const pop = record.fieldValues.POPULATION;
            if (pop > 0) {
                // each shapefile record has just one point
                const location = {
                    latitude: record.points[0][0].y,
                    longitude: record.points[0][0].x,
                    city: record.fieldValues.NAME,
                    population: pop
                };
                geoLocations.push(location);
            }
        }

        const geoSeries = new IgrGeographicSymbolSeries( { name: "series" });
        geoSeries.dataSource = geoLocations;
        geoSeries.markerType = MarkerType.Circle;
        geoSeries.latitudeMemberPath  = "latitude";
        geoSeries.longitudeMemberPath = "longitude";
        geoSeries.markerBrush = "LightGray";
        geoSeries.markerOutline = "Black";
        geoSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(geoSeries);
    }

    public createTooltip(context: any) {
        const dataContext = context.dataContext as IgrDataContext;
        if (!dataContext) return null;

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const pop = WorldUtils.toStringAbbr(dataItem.population);
        const lat = WorldUtils.toStringLat(dataItem.latitude);
        const lon = WorldUtils.toStringLon(dataItem.longitude);

        return <div>
            <div className="tooltipTitle">{dataItem.city}</div>
            <div className="tooltipBox">
                <div className="tooltipRow">
                    <div className="tooltipLbl">Latitude:</div>
                    <div className="tooltipVal">{lat}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Longitude:</div>
                    <div className="tooltipVal">{lon}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Population:</div>
                    <div className="tooltipVal">{pop}</div>
                </div>
            </div>
        </div>
    }

}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MapBindingShapefilePoints/>);
