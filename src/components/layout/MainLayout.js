import React from 'react';
import {Button} from 'react-bootstrap';

export const MainLayout = props => {
  const onLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.pathname = '/login';
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <p className="navbar-brand">MARVEL</p>
        {isAuthenticated && (
          <Button variant="danger" onClick={onLogout}>
            Se déconnecter
          </Button>
        )}
      </nav>
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{height: '90vh'}}
      >
        {props.children}
      </div>
    </>
  );
};
