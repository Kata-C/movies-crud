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
        getRateByUser();;
    }, [rate])

    const success = (text) => {
        message.success(text);
    };
    const error = (text) => {
        message.error(text);
    };

    const getRateByUser = async () => {
        const response = await moviesService.getRateByUser(movie, window.localStorage.getItem('idusuario'));
        if(response.data.results.success) {
            if(response.data.results.results) {
                if(response.data.results.results.length > 0) setUserRated(true);
                else setUserRated(false);
            }
        } 
    };


    const submitRate = async(values) => {
        if(window.localStorage.getItem('token')) {
            //getRateByUser();
            if(rate > 0) {
                let data = {
                    idusuario: window.localStorage.getItem('idusuario') != null ? window.localStorage.getItem('idusuario') : '', 
                    idpelicula: movie ? movie : '',
                    calificacion: rate > 0 ? rate : 0,
                    comentario: values.comentario ? values.comentario : '',
                    newrate: userRated === false ? true : false
                };
                const responseSaving = await moviesService.addRateAndComment(data);
                if(responseSaving.data.results.success) {
                    const responseUpdating = await moviesService.calculateAverage(movie, {calificacion: data.calificacion});
                    if(responseUpdating.data.results.success) {    
                        setUpdateList(true);
                        form.setFieldsValue(
                            {comentario : ''}
                        );
                        setClear(true);
                        setUserRated(true);
                        success('Se guardó correctamente');
                    } else error('No se pudo actualizar la calificación');
                } else error('Algo salió mal al guardar tu calificación');
                    
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