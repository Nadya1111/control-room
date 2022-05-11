import {Button, Form, Input, InputNumber, Select, Upload, message, notification} from "antd";
import React, {Ref, useEffect, useState} from "react";
import { InboxOutlined } from '@ant-design/icons';
import {YMaps, Map, Placemark, YMapsApi, SearchControl} from "react-yandex-maps";
import {Api} from "../../../api/api";
import {Callbacks} from "rc-field-form/lib/interface";
import {ApplicationForm} from "../../../model"
import styles from "./application.module.scss"
const {Option} = Select;
const {Dragger} = Upload;

export const Application: React.FC = () => {
    const [coordinatesState, setCoordinatesState] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form] = Form.useForm();
    const importances = [
        {value: "1", title: "Очень низкий"},
        {value: "2", title: "Низкий"},
        {value: "3", title: "Средний"},
        {value: "4", title: "Высокий"},
        {value: "5", title: "Очень высокий"}
    ]
    const categoryes = [
        {value: "Газ", title: "Ваше обращение связано с газом"},
        {value: "Вода", title: "Ваше обращение связано с Вода"},
        {value: "Электричество", title: "Ваше обращение связано с электричеством"},
        {value: "Отопление", title: "Ваше обращение связано с отоплением"},
        {value: "Двор", title: "Ваше обращение связано с придомовой территорией"}
    ]
    const propsPhotoDragger = {
        name: 'file',
        multiple: true,
        action: "",
        onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
            console.log(info)
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.success(`${info.file.name} file uploaded successfully.`);
            }
        },
    }
    const [maps, setMaps] = useState(null);
    const [address, setAddress] = useState("");

    const getGeoLocation = (e: any) => {
        let coord = e.get("target").getCenter();
        if(maps) {
            //@ts-ignore
            let resp = maps.geocode(coord);
            resp.then((res: any) => {
                setAddress(res.geoObjects.get(0).getAddressLine());
            });
        }
    };


    const onLoad = (map: any) => {
        setMaps(map);
    };

    const submitForm = (event: Callbacks & ApplicationForm) => {
        setIsLoading(true)
        Api.sendApplication(new ApplicationForm(event.address,  event.importance, event.category, event.description)).then(
            data => {
                setIsLoading(false)
                message.success("SuccessFull!")
            },
            error => {
                setIsLoading(false)
                message.success("SuccessFull!")
            },

    )

    }
    const onImportanceChange = (value: string) => {
        form.setFieldsValue({ importance: value })
    }
    const onСategoreChange = (value: string) => {
        form.setFieldsValue({ categore: value })
    }
    return (
        <div className={styles.divShadow}>
            <Form
                form={form}
                layout="vertical"
                name="nest-messages"
                onFinish={submitForm}>
                <Form.Item name={"address"} label="Адрес" rules={[{required: true, message: "Укажите адрес"}]}>
                    <Input/>
                </Form.Item>
                <div>
                    <YMaps

                    >

                        <Map
                            onLoad={(ymaps) => onLoad(ymaps)}
                            width={"75%"}
                            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                            onBoundsChange={(ymaps: any) => getGeoLocation(ymaps)}
                            modules={["geolocation", "geocode"]}
                        >
                            <SearchControl>

                            </SearchControl>
                            <Placemark  defaultGeometry={[55.751574, 37.573856]} />
                        </Map>

                    </YMaps>
                </div>
                <Form.Item rules={[{required: true, message: "Выбирете категорию"}]} name={"categore"} label="Выберете категорию обращения">
                    <Select
                        labelInValue
                        onChange={onСategoreChange}
                        placeholder="Категория"
                        value={form.getFieldInstance("categore")}
                    >
                        {categoryes.map(category =>
                            <Option
                                value={category.value}
                                title={category.title}
                                key={category.value}
                            >
                                {category.value}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item rules={[{required: true, message: "Выбирете  приоритет"}]} name={"importance"} label="Приоритет">
                    <Select
                        labelInValue
                        onChange={onImportanceChange}
                        placeholder="Приоритет">
                        {importances.map(importance =>
                            <Option
                                value={importance.value}
                                title={importance.title}
                                key={importance.value}
                            >
                                {importance.value}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item name={"photoDragger"} label="Приложите фото происшествия">
                    <Dragger {...propsPhotoDragger}>
                        <p>
                            <InboxOutlined/>
                        </p>
                        <p >
                            Щелкните или перетащите файл в эту область, чтобы загрузить</p>
                    </Dragger>
                </Form.Item>
                <Form.Item rules={[{required: true, message: "Опишите вашу проблему", min: 10}]}  name={"discription"} label="Описание">
                    <Input.TextArea placeholder={"Пожалуйста, опишите вашу проблему или предложение"}/>
                </Form.Item>
                <Form.Item name={"submit"}>
                    <Button
                        loading={isLoading}

                        disabled={isLoading}
                        type="primary"
                        htmlType="submit">
                        Отправить заявку
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}