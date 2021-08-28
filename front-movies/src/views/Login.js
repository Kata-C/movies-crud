import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Form, Input, Button } from 'antd';
import '../styles/login.css';

const Login = () => {
    const [isLogged, setIsLogged] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
    <div>
        <div className="containerForm">
            <Link to="/">Volver</Link>
            <div className="formAlign">
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="form"
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Por favor completa tu nombre de usuario',
                        },
                    ]}
                    className="label"
                    >
                        <Input 
                        placeholder="Usuario"
                        size='large'
                        />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Por favor completa tu contraseña',
                        },
                    ]}
                    className="label"
                    >
                        <Input.Password 
                            placeholder="Constraseña"
                            size='large'
                        />
                    </Form.Item>


                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        <div>
        </div>
    </div>
    );
}

export default Login;