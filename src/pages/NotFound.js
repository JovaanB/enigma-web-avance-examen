import React from 'react';
import {Button, Container} from 'react-bootstrap';

export const NotFound = () => {
  return (
    <div class="page-wrap d-flex flex-row align-items-center justify-content-center vh-100 vw-100">
      <Container>
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <span class="display-1 d-block">404</span>
            <div class="mb-4 lead">
              La page que vous recherchez n'a pas été trouvée.
            </div>
            <Button
              variant="light"
              onClick={() => (window.location.pathname = '/')}
            >
              Retour
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
