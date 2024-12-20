import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './service/redux/store.ts';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './utils/ErrorBoundary.tsx';
import { SocketProvider } from './Context/SocketContext.tsx';
import {  WebRTCProvider } from './Context/WebRtcContext.tsx';
import GlobalIncomingCallHandler from './GlobalIncomingCall.tsx';
import { GlobalVideoCallHandler } from './GlobalVideoCallHandler.tsx';

const GOOGLE_CLIENT = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <SocketProvider>
        <WebRTCProvider>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
              <App />
            </PersistGate>
          </GoogleOAuthProvider>
          <ToastContainer />
          <GlobalVideoCallHandler />
          <GlobalIncomingCallHandler />
        </WebRTCProvider>
      </SocketProvider>
    </Provider>
  </ErrorBoundary>
);


