import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getServerUrl } from './api/common.js';
import ErrorView from '@components/ErrorView/index.jsx';
import PageLoading from '@components/PageLoading/index.jsx';
import router from './routers';

function App() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const init = () => {
    setLoading(true);
    getServerUrl().then(url => {
      setLoading(false);
      setErr(!url);
    });
  };
  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : err ? (
    <ErrorView onRetry={init} />
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
