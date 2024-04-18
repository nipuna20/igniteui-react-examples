import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { IgrList, IgrListItem, IgrListHeader, IgrRadioGroup, IgrRadio, IgrAvatar, IgrButton,
         IgrListModule, IgrRadioGroupModule, IgrRadioModule, IgrAvatarModule, IgrButtonModule } from "@infragistics/igniteui-react";
import 'igniteui-webcomponents/themes/light/bootstrap.css';

IgrAvatarModule.register();
IgrButtonModule.register();
IgrListModule.register();
IgrRadioGroupModule.register();
IgrRadioModule.register();

export default class ListOverview extends React.Component<any, any> {

    constructor(props: any) {
        super(props);        
        this.state = { listSize: "large" };
        this.onRadioChange = this.onRadioChange.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">
                <IgrRadioGroup alignment="horizontal" style={{marginBottom: '10px'}}>
                    <IgrRadio name="size" value="small" labelPosition="after" change={this.onRadioChange}>
                        <span>Small</span>
                    </IgrRadio>
                    <IgrRadio name="size" value="medium" labelPosition="after" change={this.onRadioChange}>
                        <span>Medium</span>
                    </IgrRadio>
                    <IgrRadio name="size" value="large" labelPosition="after" checked={true} change={this.onRadioChange}>
                        <span>Large</span>
                    </IgrRadio>
                </IgrRadioGroup>

                <IgrList size={this.state.listSize}>
                    <IgrListHeader>
                        <span>Contacts</span>
                    </IgrListHeader>
                    <IgrListItem>
                        <div slot="start">
                            <IgrAvatar src="https://static.infragistics.com/xplatform/images/avatars/8.jpg" shape="circle" />
                        </div>                        
                        <h2 slot="title">Terrance Orta</h2>
                        <span slot="subtitle">770-504-2217</span>
                        <div slot="end">
                            <IgrButton variant="outlined">
                                <span>Text</span>
                            </IgrButton>
                        </div>
                        <div slot="end">
                            <IgrButton variant="outlined">
                                <span>Call</span>
                            </IgrButton>
                        </div>
                    </IgrListItem>
                    <IgrListItem>
                        <div slot="start">
                            <IgrAvatar src="https://static.infragistics.com/xplatform/images/avatars/17.jpg" shape="circle" />
                        </div>
                        <h2 slot="title">Richard Mahoney</h2>
                        <span slot="subtitle">423-676-2869</span>
                        <div slot="end">
                            <IgrButton variant="outlined">
                                <span>Text</span>
                            </IgrButton>
                        </div>
                        <div slot="end">
                            <IgrButton variant="outlined">
                                <span>Call</span>
                            </IgrButton>
                        </div>
                    </IgrListItem>
                    <IgrListItem>
                        <div slot="start">
                            <IgrAvatar src="https://static.infragistics.com/xplatform/images/avatars/9.jpg" shape="circle" />
                        </div>
                        <h2 slot="title">Donna Price</h2>
                        <span slot="subtitle">859-496-2817</span>
                        <div slot="end">
                            <IgrButton variant="outlined">
                                <span>Text</span>
                            </IgrButton>
                        </div>
                        <div slot="end">
                            <IgrButton variant="outlined">
                                <span>Call</span>
                            </IgrButton>
                        </div>
                    </IgrListItem>
                </IgrList>
            </div>
        );
    }

    public onRadioChange(e: any) {
        if (e.checked == true) {
            this.setState({ listSize: e.value });
        }
    }
}

// rendering above class to the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ListOverview/>);
