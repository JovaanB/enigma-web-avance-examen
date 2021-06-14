import React, {useState} from 'react';
import {Card, Button, Form} from 'react-bootstrap';

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = e => {
    e.preventDefault();

    //if username or password field is empty, return error message
    if (userData.email === '' || userData.password === '') {
      setErrorMessage('Email/mot de passe obligatoire');
    } else if (
      userData.email.toLowerCase() === 'contact@web.fr' &&
      userData.password === 'azerty'
    ) {
      //Signin Success
      localStorage.setItem('isAuthenticated', 'true');
      window.location.pathname = '/home';
    } else {
      //If credentials entered is invalid
      setErrorMessage('Email/mot de passe incorrect');
      return;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <Card className="p-4 m-4 w-25">
        <Card.Body>
          <Card.Title>Connexion</Card.Title>
          <Card.Text>
            <Form>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="my-3"
                  value={userData.email}
                  onChange={e =>
                    setUserData(prevState => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  value={userData.password}
                  onChange={e =>
                    setUserData(prevState => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Card.Text>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Button variant="primary" onClick={e => handleSubmit(e)}>
            Se connecter
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
