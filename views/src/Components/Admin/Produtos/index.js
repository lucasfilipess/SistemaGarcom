import React, { useContext, useEffect } from 'react';
import AddProduto from './AddProduto';
import EditProduto from './EditProduto';
import DeleteProduto from './DeleteProduto';
import ToggleSections from '../../Utils/ToggleSections';
import del from '../../../assets/img/del.svg';
import edit from '../../../assets/img/edit.svg';
import add from '../../../assets/img/add.svg';
import { Ativo } from '../../../Store';

function Produtos() {
  const [ativo, setAtivo] = useContext(Ativo);

  useEffect(() => {
    setAtivo(4);
  }, [setAtivo]);

  return (
    <>
      <ToggleSections
        name="Adicionar Produto"
        content={<AddProduto />}
        img={add}
      />
      <ToggleSections
        name="Editar Produto"
        content={<EditProduto />}
        img={edit}
      />
      <ToggleSections
        name="Deletar Produto"
        content={<DeleteProduto />}
        img={del}
      />
    </>
  );
}

export default Produtos;
