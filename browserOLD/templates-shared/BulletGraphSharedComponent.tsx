import * as React from "react";

export class BulletGraphSharedComponent
    extends React.Component<any, IComponentState> {

    constructor(props: any) {
        super(props);

        this.state = { componentVisible: true }
    }
}

export interface IComponentState
{
    componentVisible?: boolean,

    backgroundColor?: string,
    backgroundVisible?: boolean,
};