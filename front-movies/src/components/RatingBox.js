import React from 'react';
import {InputNumber, Form, Input, Button, message} from 'antd';
import '../styles/ratingbox.css';
import { moviesService } from '../services/movies.service';

const RatingBox = ({movie, setUpdateList}) => {

    const success = (text) => {
        message.success(text);
    };
    const error = (text) => {
        message.error(text);
    };

    const submitRate = async(values) => {
        console.log(window.localStorage.getItem('token'));
        let data = {
            idusuario: window.localStorage.getItem('idusuario') != null ? window.localStorage.getItem('idusuario') : '', 
            idpelicula: movie ? movie : '',
            calificacion: values.rate ? values.rate : '',
            comentario: values.comentario ? values.comentario : ''
        };
        const responseSaving = await moviesService.addRateAndComment(data);
        if(responseSaving.data.success) {
            const responseUpdating = await moviesService.calculateAverage(movie);
            console.log(responseUpdating.data);
            if(responseUpdating.data.success) {
                setUpdateList(true);
                success('Se guardó correctamente');
                // Change here, replace for a message
            } else error('No se pudo actualizar la calificación');
        } else error('Inicie sesión para calificar este título o para hacer un comentario');
    }

  

    const {TextArea} = Input;
    return (<div className='form-rating'>
        <div>Califica la pelicula: </div>
        <Form onFinish={submitRate}>
            <div className='form-button-section'>
                {/* Pending: Validate rating numbers*/}
                <Form.Item
                name='rate'
                rules={[
                    {
                    required: true,
                    message: 'Por favor escribe un número del 1 al 5',
                    },
                ]}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Guardar
                    </Button>
                </Form.Item>
            </div>
            <Form.Item
            name='comentario'
            >
                <TextArea rows={3} placeholder="Escribe un comentario"/>
            </Form.Item>
            
        </Form>

    </div>);
};

export default RatingBox;