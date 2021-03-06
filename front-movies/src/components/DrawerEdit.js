import React, { useEffect, useState } from 'react';
import {Form, Button, Drawer, Input, message, Upload} from 'antd';
import { moviesService } from '../services/movies.service';

const DrawerEdit = ({visible, onClose, movie}) => {
    
    const [form] = Form.useForm();
    const {TextArea} = Input;
   
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    let image = movie.length > 0 ? `data:image/jpeg;base64,${arrayBufferToBase64(movie.image.data)}` : '';
    const [file, setFile] = useState([image]);

    useEffect(() => {
        form.setFieldsValue({
            titulo : movie.titulo,
            descripcion : movie.descripcion,
            genero1 : movie.genero1,
            genero2 : movie.genero2,
            genero3 : movie.genero3,
            portada: file
        });
    }, [movie]);

    const success = () => {
        message.success('Se guardó correctamente');
    };
    const error = (text) => {
        message.error(text);
    };

    const uploadFile = ({fileList}) => {
        setFile(fileList);
    } 

    const updateMovie = async (values) => {
        let formData = new FormData();
        formData.append('titulo', values.titulo);
        formData.append('idpelicula', movie.idpelicula);
        formData.append('descripcion', values.descripcion);
        formData.append('genero1', values.genero1);
        formData.append('genero2', values.genero2);
        formData.append('genero3', values.genero3);
        formData.append('imagen', file.length > 0 ? file[0].originFileObj : '');
        formData.append('portada', file[0].originFileObj ? file[0].originFileObj.name : '');

        const responseSaving = await moviesService.updateMovie(formData, movie.idpelicula);
        if(responseSaving.data.results.success) {
            success();
            setTimeout(() => window.location = `/movies/${movie.idpelicula}/comments`, 200);
        } else error('No fue posible actualizar la información');
        
    };

    return (<>
        <Drawer
            title="Actualizar"
            width={440}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
        >
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

export default DrawerEdit;