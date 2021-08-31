import React, {useState} from 'react';
import {Form, Button, Drawer, Input, message, Upload} from 'antd';
import { moviesService } from '../services/movies.service';

const DrawerAdd = ({visible, onClose, updateList}) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState([]);
    const {TextArea} = Input;

    const success = () => {
        message.success('Se guardó correctamente');
    };
    const error = (text) => {
        message.error(text);
    };


    const uploadFile = ({fileList}) => {
        setFile(fileList);
    } 

    const saveMovie = async (values) => {

        const movieExists = await moviesService.validateMovie({titulo: values.titulo});
        if(movieExists.data.results == false) {
            let formData = new FormData();
            formData.append('titulo', values.titulo);
            formData.append('descripcion', values.descripcion);
            formData.append('genero1', values.genero1 == null ? '': values.genero1);
            formData.append('genero2', values.genero2 == null ? '': values.genero2);
            formData.append('genero3', values.genero3 == null ? '': values.genero3);
            formData.append('imagen', file[0].originFileObj);
            formData.append('portada', file[0].originFileObj.name);
            const responseSaving = await moviesService.addMovie(formData);
            if(responseSaving.data.results.success) {
                success();
                window.location = '/';
            } else error('Ocurrió un error, no se guardó correctamente');
        } else error('Ya existe una película con este nombre');
        
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