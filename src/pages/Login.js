import React from 'react';
import {Card} from 'react-bootstrap';
import {MainLayout} from '../components/layout/MainLayout';
import {LoginForm} from '../components/login/LoginForm';

export const Login = () => {
  return (
    <MainLayout>
      <Card className="p-4 m-4 w-25">
        <Card.Body>
          <Card.Title>Connexion</Card.Title>
          <Card.Text>
            <LoginForm />
          </Card.Text>
        </Card.Body>
      </Card>
    </MainLayout>
  );
};
