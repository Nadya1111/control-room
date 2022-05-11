import {List, Tabs} from "antd";
import React from "react";

const {TabPane} = Tabs;

export const PersonalArea: React.FC = () => {

    return (
        <>
            <Tabs defaultActiveKey="2">
                <TabPane tab="Личный кабинет" key="1">

                </TabPane>
                <TabPane tab="Заявки" key="2">
                    <List
                        style={
                            {
                                "backgroundColor": "white",
                                "padding": "5px",
                                "border": "1px solid #e8e8e8",
                                "borderRadius": "4px"
                            }
                        }
                        itemLayout="horizontal"

                    >
                        <List.Item>
                            <List.Item.Meta
                                title={"20-летия октября,54"}
                                description={"Прорвало трубу"}
                            />
                        </List.Item>
                    </List>
                </TabPane>
            </Tabs>
        </>)
}