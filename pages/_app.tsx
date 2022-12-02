import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { AppProps } from 'next/app';
import { FC, useMemo } from 'react';
import AppLayout from '../components/AppLayout';
import { EthereumProviderProvider } from '../contexts/EthereumProviderContext';
import { MerstabProvider } from '../contexts/merstab';

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

export const civicEnv = {
    prod: {
        gatekeeperNetwork: new PublicKey('ni1jXzPTq1yTqo67tUmVgnp22b1qGAAZCtPmHtskqYG'),
        clusterUrl: '',
        stage: '',
    },
    test: {
        gatekeeperNetwork: new PublicKey('tniC2HX5yg2yDjMQEcUo1bHa44x9YdZVSqyKox21SDz'),
        clusterUrl: 'https://api.devnet.solana.com',
        stage: 'preprod',
    }
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <MerstabProvider env={network}>
                        <AppLayout>
                            <Component>
                                {pageProps}
                            </Component>
                        </AppLayout>
                    </MerstabProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
