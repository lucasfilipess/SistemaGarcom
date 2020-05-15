import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Store from './Store';
import Layout from './Components/Layout';
import Loadable from 'react-loadable';

export function Loader() {
  return (
    <div
      style={{
        fontSize: '20px',
        fontWeight: 'bold',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      Carregando...
    </div>
  );
}

const LoadablePedidos = Loadable({
  loader: () => import('./Components/Pedidos'),
  loading: Loader,
});

const LoadableProdutos = Loadable({
  loader: () => import('./Components/Admin/Produtos'),
  loading: Loader,
});

const LoadableHistorico = Loadable({
  loader: () => import('./Components/Admin/Historico'),
  loading: Loader,
});

const LoadableCozinha = Loadable({
  loader: () => import('./Components/Cozinha'),
  loading: Loader,
});
const LoadableCopa = Loadable({
  loader: () => import('./Components/Copa'),
  loading: Loader,
});

function App() {
  return (
    <>
      <Store>
        <Layout>
          <Switch>
            <Route exact path="/" component={LoadablePedidos} />
            <Route path="/cozinha" component={LoadableCozinha} />
            <Route path="/copa" component={LoadableCopa} />
            <Route path="/admin-produtos" component={LoadableProdutos} />
            <Route path="/admin-historico" component={LoadableHistorico} />
          </Switch>
        </Layout>
      </Store>
    </>
  );
}
export default App;
