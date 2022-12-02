import React from 'react'
import { Layout } from 'antd';
import NavBar from './NavBar';
import AppFooter from './AppFooter';
import styles from "../styles/AppLayout.module.css";
import Head from 'next/head';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children = undefined as any }) => {
    return (
        <Layout className={styles.root}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap" rel="stylesheet"></link>
            </Head>
            <Header className={styles.content} style={{ flexGrow: 0, zIndex: 2}}>
                <NavBar></NavBar>
            </Header>
            <Content className={styles.content} style={{ flexGrow: 1, overflowX: 'hidden', alignItems: 'center', flexDirection: 'column', height: '92vh' }}>
                {children}
            </Content>
            <Footer className={styles.content} style={{ flexGrow: 0, zIndex: 2 }}>
                <AppFooter></AppFooter>
            </Footer>
        </Layout>
    )
};

export default AppLayout