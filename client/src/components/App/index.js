import { Col, Container, Row } from 'react-bootstrap';
import { Code, Bell, Settings, Home, BarChart } from 'react-feather';
import { Link } from 'react-router-dom';
import Main from '../Main';

const App = () => {
  return (
    <div className="App">
      <Container fluid>
        <Row style={{minHeight: "100vh"}}>
          <Col xs={4} md={2} className="bg-dark text-white d-flex flex-column justify-content-start align-items-center py-4 px-2">
            <div className="d-flex align-items-center"><h1><Code size={43} className="mr-3" />DashBoard</h1></div>
            <br/>
            <Link to="/" className="d-flex justify-content-start align-items-center w-100 text-white px-4 py-2"><Home size={20} className="mr-3" />Home</Link>
            <Link to="/predict" className="d-flex justify-content-start align-items-center w-100 text-white px-4 py-2"><BarChart size={20} className="mr-3" />Apriori</Link>
          </Col>
          <Col xs={8} md={10} className="px-0">
            <ul className="nav" style={{borderBottom: '2px solid rgba(0,0,0,0.1)'}}>
              <li className="ml-auto nav-item">
                <Link className="nav-link text-dark" to="#"><Bell /></Link>
              </li>
              <li className="nav-item">
                <p className="nav-link text-dark"><Settings /></p>
              </li>
              <li className="nav-item">
                <p className="nav-link disabled">Welcome</p>
              </li>
            </ul>
            <Main />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
