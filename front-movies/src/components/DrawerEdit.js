import React, { useEffect } from 'react';
import {Form, Button, Drawer, Input, message} from 'antd';
import { moviesService } from '../services/movies.service';

const DrawerEdit = ({visible, onClose, movie}) => {

    const [form] = Form.useForm();

    const {TextArea} = Input;

    const success = () => {
        message.success('Se guardó correctamente');
    };
    const error = () => {
        message.error('This is an error message');
    };


    let portada = movie.portada;
    let idpelicula = movie.idpelicula;
    let titulo = movie.titulo;
    let descripcion = movie.descripcion;
    let promedio = movie.promedio;
    let genero1 = movie.genero1;
    let genero2 = movie.genero2;
    let genero3 = movie.genero3;

    useEffect(() => {
        form.setFieldsValue({
            titulo,
            descripcion,
            genero1,
            genero2,
            genero3
        });
    }, []);

    const updateMovie = async (values) => {
        // Pending: clear fields after saving
        // Pending: validate if the user is admin
        let data = {
            idpelicula,
            titulo: values.titulo,
            descripcion: values.descripcion,
            genero1: values.genero1,
            genero2: values.genero2 == '' ? genero2 : values.genero2,
            genero3: values.genero3 == '' ? genero3 : values.genero3
        };

        const responseSaving = await moviesService.updateMovie(data);
        if(responseSaving.data.success) {
            console.log('Se guardó correctamente');
            success();
            onClose();
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
            <Form onFinish={updateMovie} form={form}> 
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
                }]}
                >
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
                    <Input placeholder='Género (opcional)' label={genero2}/>
                </Form.Item>
                <Form.Item
                name='genero3'
                >
                    <Input placeholder='Género (opcional)'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Guardar</Button>
                </Form.Item>
            </Form>

            
        </Drawer>   
    </>);

}

export default DrawerEdit;