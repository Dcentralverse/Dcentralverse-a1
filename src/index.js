import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/App.scss';
import App from './App';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import Web3ReactManager from './components/wallet-connection/Web3ReactManager';
import Web3 from 'web3';
const Web3ProviderNetwork = createWeb3ReactRoot("Network");


function getLibrary(provider) {
  return new Web3(provider);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Web3ReactManager>
                <App />
              </Web3ReactManager>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
  </React.StrictMode>
);

