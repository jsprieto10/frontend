import React, { Component } from 'react';
import { Container, Form, Button,Modal } from 'react-bootstrap';

class Register extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            apellido: "",
            procesado: false,
            show:false
        }
    }

    handleClose()
    {
        window.location.reload();
    }
    handleShow()
    {
        this.setState({show:true})
    }

    handleSubmit(event) {

        event.preventDefault(); 
        const data = this.state;

        fetch('https://validtest.herokuapp.com/usuarios', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                this.handleShow();
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    returnModal(){
        return (
            <>
              <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>Respuesta del servidor</Modal.Title>
                </Modal.Header>
                <Modal.Body>El usuario se ha registtrado correctamente</Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }

    render() {
        return (
            <Container>
                <br />
                {this.returnModal()}
                <center>
                    <h3>Registrate</h3>
                </center>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control maxLength="30" name="nombre" type="text" required placeholder="Sebastian" onChange={this.handleChange.bind(this)} value={this.state.nombre} />
                        <Form.Text className="text-muted">
                            Nombre que aparece en el documento de identidad.</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasiLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control name="apellido" maxLength="30" type="text" required placeholder="prieto" onChange={this.handleChange.bind(this)} value={this.state.name}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default Register;