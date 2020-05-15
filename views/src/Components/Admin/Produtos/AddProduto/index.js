import React, { useState } from 'react';
import api from '../../../../Services/api';
import { Form, Col, Button } from 'react-bootstrap';
import SuccesModal, { ErrorModal } from '../../../Utils/Modals';

function AddProduto({ novo }) {
  const [modal, setModal] = useState({
    succes: false,
    error: false,
  });
  const [produto, setProduto] = useState({
    tipo: '',
    nome: '',
    preco: 0,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      tipo: produto.tipo,
      nome: produto.nome,
      preco: produto.preco,
    };

    if (data.tipo && data.nome && data.tipo) {
      try {
        await api.post('produtos', data).then(() => {
          setModal({ ...modal, succes: true });
        });
      } catch (error) {
        console.log(error);
        setModal({ ...modal, error: true });
      }
    } else setModal({ ...modal, error: true });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
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
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Nome do produto"
              value={produto.nome}
              onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              size="lg"
              type="number"
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
        text="Produto adicionado"
        open={modal.succes}
        close={() => setModal({ ...modal, succes: false })}
        fadein={modal.succes}
      />
      <ErrorModal
        text="Produto não adicionado"
        open={modal.error}
        close={() => setModal({ ...modal, error: false })}
        fadein={modal.error}
      />
    </>
  );
}

export default AddProduto;
