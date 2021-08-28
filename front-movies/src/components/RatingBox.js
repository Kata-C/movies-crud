import React from 'react';
import {InputNumber, Form, Input, Button} from 'antd';
import '../styles/ratingbox.css';
import { moviesService } from '../services/movies.service';

const RatingBox = ({movie, setUpdateList}) => {

    const submitRate = async(values) => {
        let data = {
            idusuario: 6,
            idpelicula: movie,
            calificacion: values.rate,
            comentario: values.comentario
        };
        const responseSaving = await moviesService.addRateAndComment(data);
        if(responseSaving.data.success) {
            const responseUpdating = await moviesService.calculateAverage(movie);
            if(responseUpdating.data.success) {
                console.log('Se guardó correctamente');
                setUpdateList(true);
                // Change here, replace for a message
            } else console.log('No se pudo actualizar la calificación');
        } else console.log('No se pudo guardar la calificación');
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