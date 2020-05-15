import React, { useState, createContext } from 'react';

export const Ativo = createContext(null);

function Store({ children }) {
  const [ativo, setAtivo] = useState(0);

  return <Ativo.Provider value={[ativo, setAtivo]}>{children}</Ativo.Provider>;
}

export default Store;
