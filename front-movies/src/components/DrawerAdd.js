import React, {useState} from 'react';
import {Form, Button, Drawer, Input, message, Upload} from 'antd';
import { moviesService } from '../services/movies.service';

const DrawerAdd = ({visible, onClose}) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState([]);
    const {TextArea} = Input;

    const success = () => {
        message.success('Se guardó correctamente');
    };
    const error = () => {
        message.error('Ocurrió un error. No se pudo guardar');
    };

    const clear = () => {
        form.setFieldsValue({
            titulo: '',
            descripcion: '',
            genero1: '',
            genero2: '',
            genero3: '',
            portada: ''
        });
    }

    const uploadFile = ({fileList}) => {
        setFile(fileList);
    } 

    const saveMovie = async (values) => {

        let formData = new FormData();
        formData.append('titulo', values.titulo);
        formData.append('descripcion', values.descripcion);
        formData.append('genero1', values.genero1);
        formData.append('genero2', values.genero2);
        formData.append('genero3', values.genero3);
        formData.append('imagen', file[0].originFileObj);
        formData.append('portada', file[0].originFileObj.name);
        const responseSaving = await moviesService.addMovie(formData);
        if(responseSaving.data.success) {
            success();
            onClose();
            clear();
        } else error();
    };

    return (<>
        <Drawer
            title="Nueva película"
            width={440}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
        >
            <p style={{color: 'black'}}>Añadir pelicula</p>
            <Form onFinish={saveMovie} encType='multipart/form-data' form={form}>
                <Form.Item
                name='titulo'
                rules={[{
                    required: true,
                    message: 'Escriba un título'
                }]}
                >
                    <Input placeholder='Título'/>
                </Form.Item>
                <Form.Item
                name='descripcion'
                rules={[{
                    required: true,
                    message: 'Escriba una descripción'
                }]}>
                    <TextArea placeholder='Descripción' rows={3}/>
                </Form.Item>
                <Form.Item
                name='genero1'
                rules={[{
                    required: true,
                    message: 'Escriba por lo menos un género'
                }]}
                >
                    <Input placeholder='Género'/>
                </Form.Item>
                <Form.Item
                name='genero2'
                >
                    <Input placeholder='Género (opcional)'/>
                </Form.Item>
                <Form.Item
                name='genero3'
                >
                    <Input placeholder='Género (opcional)'/>
                </Form.Item>
                <Form.Item
                rules={[{
                    required: true,
                    message: 'Seleccione una imagen'
                }]}
                name='portada'
                >
                    <Upload
                        listType="picture"
                        fileList={file}
                        onChange={uploadFile}
                        maxCount={1}
                        beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                        >
                         <Button>Cargar imagen</Button>
                    </Upload>
                    
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Guardar</Button>
                </Form.Item>
            </Form>

            
        </Drawer>   
    </>);

}

export default DrawerAdd;