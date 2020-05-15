import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import cozinha from '../../assets/img/cozinha.svg';
import admin from '../../assets/img/admin.svg';
import produtos from '../../assets/img/produtos.svg';
import pedidos from '../../assets/img/pedidos.svg';
import historico from '../../assets/img/historico.svg';
import copa from '../../assets/img/copa.svg';
import pessoas from '../../assets/img/pessoas.svg';
import config from '../../assets/img/config.svg';
import Toggle from '../Utils/Accordion';

import { Ativo } from '../../Store';

function Layout({ children }) {
  const [colapse, setColapse] = useState(false);
  const [ativo, setAtivo] = useContext(Ativo);
  function toggleCollapse() {
    setColapse(!colapse);
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div
        className="hidden md:flex md:flex-shrink-0"
        style={{ width: colapse ? 80 : 'auto' }}
      >
        <div className="flex flex-col w-64">
          <div
            className="flex items-center h-16 flex-shrink-0 bg-gray-900"
            style={{ padding: ' 0 7px' }}
            onClick={toggleCollapse}
          >
            <img src={logo} alt="logo" style={{ width: '45px' }} />
            <ColapseHide
              classNameName="text-white ml-3 text-xl"
              colapse={colapse}
            >
              <p
                style={{
                  color: '#fff',
                  fontSize: '18px',
                  margin: '2px 0 0 10px',
                }}
              >
                Sistema Garçom
              </p>
            </ColapseHide>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <StyledLink
                active={ativo === 1}
                // onClick={() => setAtivo(1)}
                to="/"
                className="group flex items-center mb-3 px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <img
                  src={pedidos}
                  alt="pedidos logo"
                  style={{ width: '20px', marginRight: '15px' }}
                />
                <ColapseHide colapse={colapse}>Pedidos</ColapseHide>
              </StyledLink>
              <StyledLink
                active={ativo === 2}
                // onClick={() => setAtivo(2)}
                to="/cozinha"
                className="mb-3 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <img
                  src={cozinha}
                  alt="Cozinha"
                  style={{ width: '20px', marginRight: '15px' }}
                />
                <ColapseHide colapse={colapse}>Cozinha</ColapseHide>
              </StyledLink>
              <StyledLink
                active={ativo === 3}
                // onClick={() => setAtivo(3)}
                to="/copa"
                className="mb-3 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <img
                  src={copa}
                  alt="Copa"
                  style={{ width: '20px', marginRight: '15px' }}
                />
                <ColapseHide colapse={colapse}>Copa</ColapseHide>
              </StyledLink>
              <Toggle
                name={
                  <>
                    <StyledText
                      className="mb-3 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                      active={ativo === 4}
                    >
                      <img
                        src={admin}
                        alt="Copa"
                        style={{ width: '20px', marginRight: '15px' }}
                      />
                      <ColapseHide colapse={colapse}>Admin</ColapseHide>
                    </StyledText>
                  </>
                }
                content={
                  <>
                    <StyledLink
                      to="/admin-produtos"
                      className="mb-3 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                    >
                      <img
                        src={produtos}
                        alt="produtos icon"
                        style={{ width: '20px', marginRight: '15px' }}
                      />
                      <ColapseHide colapse={colapse}>Produtos</ColapseHide>
                    </StyledLink>
                    <StyledLink
                      to="/admin-historico"
                      className="mb-3 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                    >
                      <img
                        src={historico}
                        alt="Historico icon"
                        style={{ width: '20px', marginRight: '15px' }}
                      />
                      <ColapseHide colapse={colapse}>Histórico</ColapseHide>
                    </StyledLink>
                  </>
                }
              />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="flex justify-end items-center relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <img
            src={pessoas}
            alt="Historico icon"
            style={{ width: '25px', marginRight: '10px' }}
          />
          <img
            src={config}
            alt="Historico icon"
            style={{ width: '25px', marginRight: '25px' }}
          />
        </div>
        <div style={{ overflowY: 'scroll' }}>{children}</div>
      </div>
    </div>
  );
}
export default Layout;

const ColapseHide = styled.div`
  display: ${(props) => (props.colapse ? 'none' : 'block')};
`;

const StyledText = styled.div`
  color: #fff;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
  background: ${(props) => (props.active ? '#161e2e' : 'transparent')};
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  font-size: 14px;
  margin-bottom: 20px;
  background: ${(props) => (props.active ? '#161e2e' : 'transparent')};
  border-radius: 0px;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  transition: background 0.2s, color 0.2s;
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
  }
  & > img {
    margin-right: 24px;
  }
`;
