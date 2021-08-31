import React, {useState, useContext, useEffect} from 'react';
import {Drawer, Button} from 'antd';
import { Form, Input, message, Modal } from 'antd';
import '../styles/drawer.css';
import { userService } from '../services/user.service';
import AuthContext from '../auth.context';
import { LogInOut } from '../LogInOut';

const DrawerLogin = ({visible, onClose}) => {

    const [visibleChild, setVisibleChild] = useState(false);
    const [incorrectData, setIncorrectData] = useState(false);
    const [form] = Form.useForm();
    const [formChild] = Form.useForm();
    const auth = useContext(AuthContext);


    const success = (text) => {
        message.success(text);
    };

    const error = (text) => {
        message.error(text);
      };

    const showChildDrawer = () => {
        setVisibleChild(true);
    }

    const onCloseClearing = () => {
        clear();
        onClose();
        setIncorrectData(false);
        
    }

    const onCloseChild = () => {
        setVisibleChild(false);
    }
    const clear = () => {
        form.setFieldsValue({
            nombre: '',
            password: ''
        });
    }

    const clearChild = () => {
        formChild.setFieldsValue({
            nombre: '',
            password: ''
        });
    }

    const signIn = async (values) => {
        let data = {
            nombre: values.nombre,
            password: values.password
        };
        // const response = LogInOut.SignIn(data);
        // if(response) {
        //     setIncorrectData(false);
        //     console.log(window.localStorage.getItem('auth'))
        //     // window.location = '/';
        // } else setIncorrectData(true);
        const response = await userService.login(data);
        if(response.data.success) {
            auth.setUser(response.data.usuario);
            auth.setAdmin(response.data.admin);
            setIncorrectData(false);
            window.localStorage.setItem('usuario', response.data.usuario);
            window.localStorage.setItem('admin', response.data.admin);
            window.localStorage.setItem('idusuario', response.data.idusuario);
            window.localStorage.setItem('token', response.data.token);
            window.location = '/';
        } else setIncorrectData(true);
    }

    const signUp = async (values) => {
        let data = {
            nombre: values.nombre,
            password: values.password
        };
        // const response = LogInOut.SignUp(data);
        // if(response) success();
        // else error();
        const userExists = await userService.validateUser({nombre: values.nombre});
        if(userExists.data.results == false) {
            const response = await userService.addUser(data);
            if(response.data.success) {
                success('Registro exitoso. Inicia sesión con los mismos datos');
                onCloseChild();
                clearChild();
            } else error('Ocurrió un error. No se ha podido registrar correctamente');
        } else error('Ya existe un usuario con este nombre');

        
    }

    return (<>
        <Drawer
            title="Inicia sesión"
            width={420}
            placement="right"
            closable={true}
            onClose={onCloseClearing}
            visible={visible}
        >
            <Form onFinish={signIn} form={form}>
                <Form.Item
                name="nombre"
                rules={[{
                    required: true,
                    message: 'Por favor completa tu nombre de usuario',
                }]}
                >
                    <Input 
                    placeholder="Usuario"
                    size='large'
                    />
                </Form.Item>

                <Form.Item
                name="password"
                rules={[{
                    required: true,
                    message: 'Por favor completa tu contraseña',
                }]}
                className="label"
                >
                    <Input.Password 
                        placeholder="Constraseña"
                        size='large'
                    />
                </Form.Item>
                {incorrectData ? <p style={{color: 'red'}}>Usuario o contraseña incorrecta</p> : <></>}

                <div className='buttons'>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Iniciar sesión
                        </Button>
                    </Form.Item>
                    <Button onClick={showChildDrawer} type='link' className='button-signup'>¿No tienes una cuenta? Regístrate</Button>
                </div>
                
            </Form>
            
            <Drawer
                title="Registro"
                width={320}
                closable={true}
                onClose={onCloseChild}
                visible={visibleChild}
            >
                    
                <Form onFinish={signUp} form={formChild}>
                    <Form.Item
                    name="nombre"
                    rules={[{
                        required: true,
                        message: 'Por favor completa tu nombre de usuario',
                    }]}
                    >
                        <Input 
                        placeholder="Usuario"
                        size='large'
                        />
                    </Form.Item>

                    <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Por favor completa tu contraseña',
                    }]}
                    className="label"
                    >
                        <Input.Password 
                            placeholder="Constraseña"
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Registrar
                        </Button>
                    </Form.Item>
                    
                </Form>
            </Drawer>
           
        </Drawer>   
    </>);

}

export default DrawerLogin;