import React from 'react';
import './MoviesView';

import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const MoviesView = () => {
    return (
        <Layout
        style={{display: 'flex', flexDirection: 'column' }}
        >
            <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }} 
            style={{backgroundColor: 'cadetblue', minHeight: 500, maxHeight: 700, height: 700}}
            >
                a
            </Sider>
            <Layout style={{backgroundColor: 'pink', flex: '1 1 auto'}}>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default MoviesView;

