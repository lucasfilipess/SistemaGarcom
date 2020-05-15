import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import api from '../../../Services/api';
import styled from 'styled-components';
import { Ativo } from '../../../Store';

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

function Historico() {
  const [ativo, setAtivo] = useContext(Ativo);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    setAtivo(4);
    async function getHistorico() {
      try {
        api.get('historico').then((response) => setHistorico(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getHistorico();
  }, [setAtivo]);

  return (
    <>
      <div style={{ padding: '50px' }}>
        {historico.length === 0 && (
          <NenhumPedido> Nenhum pedido no hitórico</NenhumPedido>
        )}
        {historico.map((item) => (
          <Card key={historico.indexOf(item)} style={{ marginBottom: '30px' }}>
            <Card.Header
              as="h5"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>ID Pedido: {item.idPedido}</div> {item.data}
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
                <Itens style={{ fontSize: '20px' }}>
                  Valor:
                  <p>{item.preco}</p>
                </Itens>
              </Sections>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Historico;
