import React, {useState, useEffect} from 'react';
import { Form, Input, Button, message} from 'antd';
import '../styles/ratingbox.css';
import { moviesService } from '../services/movies.service';
import Rate from './Rate';

const RatingBox = ({movie, setUpdateList}) => {

    const [rate, setRate] = useState(0);
    const [clear, setClear] = useState(false);
    const [userRated, setUserRated] = useState();

    const [form] = Form.useForm();

    useEffect(() => {
        getRateByUser();
    }, [userRated])

    const success = (text) => {
        message.success(text);
    };
    const error = (text) => {
        message.error(text);
    };

    const getRateByUser = async () => {
        const response = await moviesService.getRateByUser(movie, window.localStorage.getItem('idusuario'));
        if(response.data.success) {
            if(response.data.results) {
                if(response.data.results.length > 0) setUserRated(true);
                else setUserRated(false);
            }
        } 
    };


    const submitRate = async(values) => {
        let data = {
            idusuario: window.localStorage.getItem('idusuario') != null ? window.localStorage.getItem('idusuario') : '', 
            idpelicula: movie ? movie : '',
            calificacion: rate > 0 ? rate : 0,
            comentario: values.comentario ? values.comentario : ''
        };
        
        if(window.localStorage.getItem('token')) {
            if(rate > 0) {
                if(userRated === false){
                const responseSaving = await moviesService.addRateAndComment(data);
                if(responseSaving.data.success) {
                    const responseUpdating = await moviesService.calculateAverage(movie);
                    console.log(responseUpdating.data);
                    if(responseUpdating.data.success) {
                        setUpdateList(true);
                        form.setFieldsValue(
                            {comentario : ''}
                        );
                        setClear(true);
                        setUserRated(true);
                        success('Se guardó correctamente');
                        // setTimeout(() => window.location = `/movies/${movie}/comments`,200);
                    } else error('No se pudo actualizar la calificación');
                } else error(responseSaving.data.success);
                    
                    
                } else error('Ya ha calificado este título, intente calificar otro');
            } else error('Ingrese una calificación válida'); 
        } else error('Inicie sesión para calificar este título o para hacer un comentario');
    }


    const {TextArea} = Input;
    return (<div className='form-rating'>
        <p className='title-rating'>Danos tu opinión:</p>
        <Form onFinish={submitRate} form={form}>
            <div className='form-rate-section'>
                <Form.Item
                name='rate'>
                    <Rate setRate={setRate} clear={clear} setClear={setClear}/>
                </Form.Item>
            </div>
            <Form.Item
            name='comentario'
            >
                <TextArea rows={3} placeholder="Escribe un comentario"/>
            </Form.Item>
            <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Guardar
                    </Button>
                </Form.Item>
            
        </Form>

    </div>);
};

export default RatingBox;