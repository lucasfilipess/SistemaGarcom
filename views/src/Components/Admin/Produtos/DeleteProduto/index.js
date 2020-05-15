import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import SuccesModal, { ErrorModal } from '../../../Utils/Modals';
import api from '../../../../Services/api';
function DeleteProduto() {
  const [produtos, setProdutos] = useState([]);
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
  const [produto, setProduto] = useState({});

  const [modal, setModal] = useState({
    succes: false,
    error: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: produto.id,
    };
    try {
      await api.delete(`produtos/${data.id}`).then((response) => {
        setModal({ ...modal, succes: true });
      });
    } catch (error) {
      console.log(error);
      setModal({ ...modal, error: true });
    }
  }

  return (
    <>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Selecionar Produto</Form.Label>
          <Form.Control
            as="select"
            size="lg"
            custom
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
      <Button
        variant="dark"
        type="button"
        style={{ background: '#252f3f' }}
        onClick={handleSubmit}
      >
        Excluir
      </Button>
      <SuccesModal
        text="Produto deletado"
        open={modal.succes}
        close={() => setModal({ ...modal, succes: false })}
        fadein={modal.succes}
      />
      <ErrorModal
        text="Produto não deletado"
        open={modal.error}
        close={() => setModal({ ...modal, error: false })}
        fadein={modal.error}
      />
    </>
  );
}

export default DeleteProduto;
