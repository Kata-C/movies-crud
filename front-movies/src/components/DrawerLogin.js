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
    const auth = useContext(AuthContext);

    useEffect(() => {
        const activeSession = window.localStorage.getItem('auth');
        if (activeSession) {
            // auth.setUser(window.localStorage.getItem('auth').user);
            // auth.setAdmin(window.localStorage.getItem('auth').admin);
            console.log(window.localStorage.getItem('auth'))
        }
    }, [window.localStorage.getItem('auth')])

    const success = () => {
        message.success('Registro exitoso. Inicia sesión con los mismos datos');
    };

    const error = () => {
        message.error('Ocurrió un error. No se ha podido registrar con éxito');
      };

    const showChildDrawer = () => {
        setVisibleChild(true);
    }

    const onCloseChild = () => {
        setVisibleChild(false);
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
            setTimeout(() => console.log(auth.usuario), 300);
            auth.setUser(response.data.usuario);
            auth.setAdmin(response.data.admin);
            setIncorrectData(false);
            //window.localStorage.setItem('auth', response.data);
            console.log("id usuario front" + response.data.idusuario);
            window.localStorage.setItem('usuario', response.data.usuario);
            window.localStorage.setItem('admin', response.data.admin);
            window.localStorage.setItem('idusuario', response.data.idusuario);
            window.localStorage.setItem('token', response.data.token);
            // console.log((window.localStorage.getItem('auth') ? window.localStorage.getItem('auth').usuario : 'no hay usuario'))window.localStorage.setItem('admin', response.data.admin);
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
        const response = await userService.addUser(data);
        console.log(response);
        if(response.data.success) {
            success();
        } else error();
        
    }

    return (<>
        <Drawer
            title="Inicia sesión"
            width={420}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
        >
            <Form onFinish={signIn}>
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
                    
                <Form onFinish={signUp}>
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