import React, { useState, useEffect } from 'react';
import SuccesModal, { ErrorModal } from '../../../Utils/Modals';
import { Form, Col, Button } from 'react-bootstrap';
import api from '../../../../Services/api';

function EditProduto() {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({
    tipo: '',
    nome: '',
    preco: 0,
  });
  const [modal, setModal] = useState({
    succes: false,
    error: false,
  });
  useEffect(() => {
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
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: produto.id,
      tipo: produto.tipo,
      nome: produto.nome,
      preco: produto.preco,
    };
    try {
      await api.put(`produtos`, data).then(() => {
        setModal({ ...modal, succes: true });
      });
    } catch (error) {
      console.log(error);
      setModal({ ...modal, error: true });
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Selecionar Produto</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              onChange={(e) => setProduto(JSON.parse(e.target.value))}
            >
              <option>Selecione um produto</option>
              {produtos.map((item) => (
                <option key={item.id} value={JSON.stringify(item)}>
                  {item.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              placeholder="Nome do produto"
              value={produto.nome}
              onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              custom
              value={produto.tipo}
              onChange={(e) => setProduto({ ...produto, tipo: e.target.value })}
            >
              <option>Selecione um tipo</option>
              <option value="Bebida">Bebida</option>
              <option value="Prato">Prato</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              size="lg"
              placeholder="Preço"
              onChange={(e) =>
                setProduto({ ...produto, preco: e.target.value })
              }
              value={produto.preco}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="dark" type="submit" style={{ background: '#252f3f' }}>
          Salvar
        </Button>
      </Form>

      <SuccesModal
        text="Produto editado"
        open={modal.succes}
        close={() => setModal({ ...modal, succes: false })}
        fadein={modal.succes}
      />
      <ErrorModal
        text="Produto não editado"
        open={modal.error}
        close={() => setModal({ ...modal, error: false })}
        fadein={modal.error}
      />
    </>
  );
}

export default EditProduto;
