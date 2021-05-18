import * as React from "react";
import {Button, Layout, PageHeader} from "antd";
import {ReactComponent as Logo} from '../assets/icon/logo.svg';
import {Router, Route, Link} from 'react-router-dom'
import {history} from "../common/history";
import {Application} from "./pages/application/application";
import { PersonalArea } from "./pages/personal-area/personal-area";

const {Content} = Layout;

export const Main: React.FC = () => {
    return (
        <Layout style={{"height": "100%"}}>
            <Router history={history}>
                <PageHeader
                    title={ <Link to={"/"}>Диспетчерская</Link>}
                    extra={[
                        <Button size={"large"} shape="round" type="primary" key="addApplication">
                            <Link to={"/"}>Заполнить заявку</Link>
                        </Button>,
                        <Button size={"large"} shape="round" type="primary" key="personalArea">
                            <Link to={"/personal-area"}>Личный кабинет</Link>
                        </Button>,
                    ]}
                    avatar={{icon: <Logo/>}}
                />

                <Content style={{padding: '0 50px'}}>

                    <Route exact={true} path={"/"}>
                        <Application/>
                    </Route>
                    <Route path={"/personal-area"}>
                        <PersonalArea/>
                    </Route>
                </Content>
            </Router>
        </Layout>
    )
}