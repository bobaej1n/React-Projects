/* eslint-disable */

import React, {useState} from 'react'
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Data from './data.js'
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Swtich } from 'react-router-dom'
import Switch from 'react-bootstrap/esm/Switch';

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home </Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className='background'>
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.<br />
              This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.<br />
              This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.<br />
            </p>
            <p>
              <Button variant="dark">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">
            <div className='row'>
              {
                shoes.map(
                  (a, i)=>{
                    return (
                      // shoes[i] 나 a 같은거
                      <Card shoes={shoes[i]} i={i} key={i}/>
                    )
                  }
                )
              }
            </div>
            <button className='btn btn-primary' onClick={()=>{

              //axios.post('서버URL', {id: 'leehyejin', pw: '1234'}).then() // POST 방법

              // 로딩 중이라는 UI 띄움
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                // 로딩 중이라는 UI 안 보이게 처리
                shoes변경( [...shoes, ...result.data] );
              })
              .catch(()=>{
                // 로딩 중이라는 UI 안 보이게 처리
                console.log('실패했어요')
              })
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} ></Detail>
        </Route>
      
      </Switch>
    </div>
  );
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg' } width="100%" />
      <h4> { props.shoes.title } </h4>
      <p> { props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}

export default App;
