import React, {useState} from 'react';
import {Form, Button, Drawer, Input, message} from 'antd';
import { moviesService } from '../services/movies.service';

const DrawerAdd = ({visible, onClose}) => {

    const [file, setFile] = useState(null);
    const {TextArea} = Input;

    const success = () => {
        message.success('Se guardó correctamente');
    };
    const error = () => {
        message.error('Ocurrió un error. No se pudo guardar');
    };

    const clear = () => {

    }

    const uploadFile = (file) => {
        setFile(file);
    }

    const saveMovie = async (values) => {
        // Pending: clear fields after saving
        // Pending: validate if the user is admin
        let data = {
            titulo: values.titulo,
            descripcion: values.descripcion,
            genero1: values.genero1,
            genero2: values.genero2 != null ? values.genero2 : '',
            genero3: values.genero3 != null ? values.genero3 : '',
            portada: values.portada.split('\\')[2]
        };
        uploadFile(values.portada);
        console.log(values.portada.split('\\')[2]);

        const responseSaving = await moviesService.addMovie(data);
        if(responseSaving.data.success) {
            console.log('Se guardó correctamente');
            
            success();
            onClose();
                // Change here, replace for a message
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
            <Form onFinish={saveMovie} encType='multipart/form-data'>
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
                    <Input type="file" accept='.png,.jpg,.jpeg,'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Guardar</Button>
                </Form.Item>
            </Form>

            
        </Drawer>   
    </>);

}

export default DrawerAdd;