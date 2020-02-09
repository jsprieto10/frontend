import React from 'react';
import './App.css';
import { Container, Image, Tabs, Tab } from 'react-bootstrap';
import Register from './Components/Register';
import ListUser from './Components/ListUser';

function App() {
  return (

    <Container>
      <Image src="https://valid.com/wp-content/uploads/2017/12/logo_horizontal_210.svg" alt="logo"/>
      <Container id="tabs">
        <Tabs defaultActiveKey="register" id="uncontrolled-tab-example">
          <Tab eventKey="register" title="Registro">
            <Register/>
          </Tab>
          <Tab eventKey="list" title="Listado">
            <ListUser/>
          </Tab>
        </Tabs>
      </Container>
      </Container>
  )
}

export default App;
