import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import SuccesModal, { ErrorModal } from '../Utils/Modals';
import styled from 'styled-components';
import api from '../../Services/api';
import { Ativo } from '../../Store';

const NenhumPedido = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 80px;
  font-size: 24px;
  font-weight: bold;
`;

const Itens = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 16px;
  & > p {
    font-weight: normal;
    margin-left: 5px;
  }
`;

const Sections = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

function Cozinha() {
  const [pedidos, setPedidos] = useState([]);
  const [ativo, setAtivo] = useContext(Ativo);
  useEffect(() => {
    setAtivo(2);
    async function getPedidos() {
      try {
        api.get('cozinha').then((response) => setPedidos(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getPedidos();
  }, [pedidos, setAtivo]);

  const [modal, setModal] = useState({
    succes: false,
    error: false,
  });

  async function entregar(item) {
    const data = {
      id: item.iditem,
      pedidoId: item.idPedido,
      produtoId: item.idProduto,
      pendente: false,
    };
    console.log(data);

    try {
      await api
        .put('item-pedido', data)
        .then(() => setModal({ ...modal, succes: true }));
    } catch (error) {
      console.log(error);
      setModal({ ...modal, error: true });
    }
  }

  return (
    <>
      <div style={{ padding: '50px' }}>
        {pedidos.length === 0 && (
          <NenhumPedido> Nenhum pedido pendente</NenhumPedido>
        )}
        {pedidos.map((item) => (
          <Card key={pedidos.indexOf(item)} style={{ marginBottom: '30px' }}>
            <Card.Header
              as="h5"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div> Mesa {item.mesa}</div> {item.data}
            </Card.Header>
            <Card.Body>
              <Sections style={{ marginBottom: '30px' }}>
                <Itens>
                  Solicitante:
                  <p>{item.nomeSolicitante}</p>
                </Itens>
                <Itens>
                  Garçom:
                  <p>{item.nomeGarcom}</p>
                </Itens>
              </Sections>
              <Sections>
                <Itens style={{ fontSize: '20px' }}>
                  Produto:
                  <p>{item.nomeProduto}</p>
                </Itens>
                <Itens>
                  <Button
                    style={{
                      background: '#252f3f',
                      height: '33px',
                    }}
                    variant="dark"
                    onClick={() => entregar(item)}
                  >
                    Entregar
                  </Button>
                </Itens>
              </Sections>
            </Card.Body>
          </Card>
        ))}
        <SuccesModal
          text="Pedido entregue"
          open={modal.succes}
          close={() => setModal({ ...modal, succes: false })}
          fadein={modal.succes}
        />
        <ErrorModal
          text="Pedido não entregue"
          open={modal.error}
          close={() => setModal({ ...modal, error: false })}
          fadein={modal.error}
        />
      </div>
    </>
  );
}

export default Cozinha;
