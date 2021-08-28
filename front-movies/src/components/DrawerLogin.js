import React, {useState} from 'react';
import {Drawer, Button} from 'antd';

const LoginDrawer = ({visible, onClose}) => {

    const [visibleChild, setVisibleChild] = useState(false);

    const showChildDrawer = () => {
        setVisibleChild(true);
    }

    const onCloseChild = () => {
        setVisibleChild(false);
    }

    return (<>
        <Drawer
            title="Inicia sesión"
            width={440}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
        >
            <Drawer
                title="Registrate"
                width={320}
                closable={true}
                onClose={onCloseChild}
                visible={visibleChild}
            >
                This is two-level drawer
            </Drawer>
            <p style={{color: 'black'}}>¿No tienes una cuenta?</p>
            <Button type="primary" onClick={showChildDrawer}>
                Registrate
            </Button>
        </Drawer>   
    </>);

}

export default LoginDrawer;