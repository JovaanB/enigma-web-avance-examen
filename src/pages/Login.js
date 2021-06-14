import React from 'react';
import {Card} from 'react-bootstrap';

import {LoginForm} from '../components/login/LoginForm';

export const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <Card className="p-4 m-4 w-25">
        <Card.Body>
          <Card.Title>Connexion</Card.Title>
          <Card.Text>
            <LoginForm />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
