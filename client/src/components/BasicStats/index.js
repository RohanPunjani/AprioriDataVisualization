import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import {BarChart2, Activity, CreditCard} from 'react-feather';

const BasicStats = () => {
    
  const [value, setValue] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/basic-stats`)
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    return (
        <Row>
              <Col>
                <Card className="overview-card">
                  <Card.Body>
                    <Card.Text className="mb-0">Total Items</Card.Text>
                    <Card.Title className="d-flex justify-content-between">
                      <h1 style={{color:'#6610f2'}}>{value.total_items}</h1> <BarChart2 size={50} color="#6610f2"/>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="overview-card">
                  <Card.Body>
                    <Card.Text className="mb-0">Unique Items</Card.Text>
                    <Card.Title className="d-flex justify-content-between" style={{color:"teal"}}>
                      <h1>{value.unique_items}</h1> <Activity size={50}/>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="overview-card">
                  <Card.Body>
                    <Card.Text className="mb-0">Average Items Sold Per Day</Card.Text>
                    <Card.Title className="d-flex justify-content-between text-primary">
                      <h1>
                        {value.average_items &&
                          value.average_items.toPrecision(2)}
                      </h1>
                      <CreditCard size="50"/>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
    );
}

export default BasicStats;
