import { Col, Row } from 'antd';
import React from 'react';
import VaultCard from '../components/VaultCard';
import styles from '../styles/overview.module.css';
import dynamic from 'next/dynamic';
import { DevnetPerp } from '../vaults/DEVNET-PERP';
import { useMerstab } from '../contexts/merstab';

const Overview = () => {
    const DynamicBackgroundNoSSR = dynamic(
        () => import('../components/OverviewBackground'),
        { ssr: false }
    )
    const {client} = useMerstab();
    return <>
        <div className={styles.overviewWrapper}>
            <DynamicBackgroundNoSSR></DynamicBackgroundNoSSR>
            <Col className={styles.main}>
                <h1 className={styles.overviewHeader}>Vault Strategies</h1>
                <div className={styles.text}>Vault Strategies are pools of funds with an associated strategy for maximizing returns on the asset in the vault. </div>
                <Row className={styles.totalValueLocked}>$100,000 TVL</Row>
                <Row className={styles.vaults}>
                    <VaultCard client={client} depositMint={DevnetPerp.depositMint} mTokenMint={DevnetPerp.mTokenMint} vault={DevnetPerp.vault}></VaultCard>
                </Row>
            </Col>
        </div>
    </>
};

export default Overview;
