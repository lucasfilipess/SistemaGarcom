import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import SuccesModal, { ErrorModal } from '../Utils/Modals';
import styled from 'styled-components';
import api from '../../Services/api';
import { Ativo } from '../../Store';

function Pedidos() {
  const [produtos, setProdutos] = useState([]);
  const [ativo, setAtivo] = useContext(Ativo);

  useEffect(() => {
    setAtivo(1);
    async function getItens() {
      try {
        await api
          .get('produtos')
          .then((response) => setProdutos(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getItens();
  }, [produtos, setAtivo]);

  const [modal, setModal] = useState({
    succes: false,
    error: false,
  });

  const [pedido, setPedido] = useState({
    nomeGarcom: '',
    nomeSolicitante: '',
    mesa: 0,
  });
  const [itens, setItens] = useState({
    bebida: [{}],
    prato: [{}],
  });

  function limpar() {
    setProdutos([]);
    setPedido({
      ...pedido,
      nomeGarcom: '',
      nomeSolicitante: '',
      mesa: 0,
    });
    setItens({ ...itens, bebida: [{}], prato: [{}] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let itensPedidos = [];
    itens.bebida.forEach((element) => {
      if (element.ProdutoId) itensPedidos.push(element);
    });
    itens.prato.forEach((element) => {
      if (element.ProdutoId) itensPedidos.push(element);
    });
    const data = {
      NomeGarcom: pedido.nomeGarcom,
      NomeSolicitante: pedido.nomeSolicitante,
      Mesa: pedido.mesa,
      ListaItensPedido: itensPedidos,
    };
    if (
      data.NomeGarcom &&
      data.NomeSolicitante &&
      data.Mesa &&
      data.ListaItensPedido.length !== 0
    ) {
      try {
        api
          .post('pedidos', data)
          .then(() => setModal({ ...modal, succes: true }));
      } catch (error) {
        console.log(error);
        setModal({ ...modal, error: true });
      }
    } else setModal({ ...modal, error: true });
  }

  return (
    <>
      <Form style={{ margin: '50px' }} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome Solicitante</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Nome do Solicitante"
              value={pedido.nomeSolicitante}
              onChange={(e) =>
                setPedido({ ...pedido, nomeSolicitante: e.target.value })
              }
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formGridState"
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Form.Label>Mesa</Form.Label>

            <Form.Control
              as="select"
              size="lg"
              custom
              value={pedido.mesa}
              onChange={(e) => setPedido({ ...pedido, mesa: e.target.value })}
            >
              <option>Selecione uma mesa</option>
              <option value={1}>Mesa 1</option>
              <option value={2}>Mesa 2</option>
              <option value={3}>Mesa 3</option>
              <option value={4}>Mesa 4</option>
              <option value={5}>Mesa 5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Garçom</Form.Label>
            <Form.Control
              size="lg"
              custom
              as="select"
              value={pedido.nomeGarcom}
              onChange={(e) =>
                setPedido({ ...pedido, nomeGarcom: e.target.value })
              }
            >
              <option>Selecione um garçom</option>
              <option value="João Carlos Silva">João Carlos Silva</option>
              <option value="Pedro Augusto Souto">Pedro Augusto Souto</option>
              <option value="Emerson Lopes Santos">Emerson Lopes Santos</option>
              <option value="Thiago Felipe de Souza">
                Thiago Felipe de Souza
              </option>
              <option value="Miguel Lucas Brandão">Miguel Lucas Brandão</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Prato</Form.Label>
            {itens.prato.map((value, i) => (
              <Form.Control
                size="lg"
                custom
                as="select"
                key={i}
                style={{ marginBottom: '15px' }}
                onChange={(e) => {
                  let prato = { ProdutoId: e.target.value };
                  setItens({
                    ...itens,
                    prato: itens.prato.map((value, j) => {
                      if (i === j) value = prato;
                      return value;
                    }),
                  });
                }}
              >
                <option>Selecione um prato</option>
                {produtos.map(
                  (item) =>
                    item.tipo === 'Prato' && (
                      <option key={item.id} value={item.id}>
                        {item.nome}
                      </option>
                    )
                )}
              </Form.Control>
            ))}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="dark"
                type="button"
                style={{
                  background: '#252f3f',
                  marginTop: '15px',
                  padding: '8px',
                }}
                onClick={() => {
                  setItens((prev) => ({
                    ...prev,
                    prato: [...prev.prato, ''],
                  }));
                }}
              >
                Adicionar Prato
              </Button>
            </div>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Bebida</Form.Label>
            {itens.bebida.map((value, i) => (
              <Form.Control
                size="lg"
                custom
                as="select"
                key={i}
                style={{ marginBottom: '15px' }}
                onChange={(e) => {
                  let bebida = { ProdutoId: e.target.value };
                  setItens({
                    ...itens,
                    bebida: itens.bebida.map((value, j) => {
                      if (i === j) value = bebida;
                      return value;
                    }),
                  });
                }}
              >
                <option>Selecione uma bebida</option>
                {produtos.map(
                  (item) =>
                    item.tipo === 'Bebida' && (
                      <option key={item.id} value={item.id}>
                        {item.nome}
                      </option>
                    )
                )}
              </Form.Control>
            ))}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="dark"
                type="button"
                style={{
                  background: '#252f3f',
                  padding: '8px',
                  marginTop: '15px',
                }}
                onClick={() => {
                  setItens((prev) => ({
                    ...prev,
                    bebida: [...prev.bebida, ''],
                  }));
                }}
              >
                Adicionar Bebida
              </Button>
            </div>
          </Form.Group>
        </Form.Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '80px',
            width: '100%',
          }}
        >
          <Button
            variant="dark"
            type="button"
            style={{
              background: '#d32f2f',
              border: '1px solid #d32f2f',
              width: '80px',
              padding: '8px',
            }}
            onClick={limpar}
          >
            Cancelar
          </Button>
          <Button
            variant="dark"
            type="submit"
            style={{
              background: '#252f3f',
              width: '80px',
              marginLeft: '15px',
              padding: '8px',
            }}
          >
            Salvar
          </Button>
        </div>
      </Form>

      <SuccesModal
        text="Pedido adicionado"
        open={modal.succes}
        close={() => setModal({ ...modal, succes: false })}
        fadein={modal.succes}
      />
      <ErrorModal
        text="Pedido não adicionado"
        open={modal.error}
        close={() => setModal({ ...modal, error: false })}
        fadein={modal.error}
      />
    </>
  );
}
export default Pedidos;
