import React, { Component } from 'react';
import { Container, Form,Button, Spinner, Table } from 'react-bootstrap';

class ListUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            load: false
        
        };
    }

    update(){
        fetch('https://validtest.herokuapp.com/usuarios', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let users = data.map(u => {
                    u.original = u.procesado;
                    return u
                })
                let load = true

                this.setState({ users, load })

                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    componentDidMount() {
        this.update()
    }
        


    handleCheck(id){
        

        let users = this.state.users.map( (u) => {
            if (u.id==id)
                u.procesado = !u.procesado;
            return u;
        })
        this.setState({users});

    }


    loadTable() {

        return (<Table id="tabla">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Procesado</th>
                </tr>
            </thead>
            <tbody>
                {this.state.users.map((u) => {
                    return (<tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nombre}</td>
                        <td>{u.apellido}</td>
                        <td>
                            
                            <Form>
                                <div className="mb-3">
                            <Form.Check
                                custom
                                id={"ch"+u.id}
                                type="checkbox"                        
                                checked={u.procesado}
                                disabled={u.procesado && u.original}
                                label={ u.original ? "procesado": ""}
                                onChange = { () => this.handleCheck(u.id)}
                                />
                                </div>
                            </Form>
                        </td>
                    </tr>);
                })
                }
            </tbody>
        </Table>);

    }

    process(){

        this.setState({ load: 'false' })
        fetch('https://validtest.herokuapp.com/usuarios', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.users.filter( u => u.procesado && !u.original )),
        })
            .then((response) => this.update())
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    render() {
        return (
            <Container>
                <center>
                    <br />
                    <h3>Listado de usuarios</h3>
                    {(this.state.load) ? "" : <Spinner animation="grow" variant="light" size="lg" />}
                </center>
                {(this.state.load) ?
                    this.loadTable()
                    : ""}
                <Button variant="success" onClick={this.process.bind(this)}>
                    Enviar
                  </Button>
            </Container>
        );
    }
}


export default ListUser;