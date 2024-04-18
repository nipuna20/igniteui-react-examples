import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { IgrAvatarModule, IgrAvatar } from "@infragistics/igniteui-react";
import 'igniteui-webcomponents/themes/light/bootstrap.css';

IgrAvatarModule.register();

export default class AvatarInitials extends React.Component<any, any> {

    constructor(props: any) {
        super(props);                   
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">
                <IgrAvatar initials="AZ"/>
            </div>
        );
    }
}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AvatarInitials/>);
