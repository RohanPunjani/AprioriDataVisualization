import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PresentBar from "../PresentBar";

const PredictionPage = () => {
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [optionData, setOptionData] = useState([]);
  const [itemsPurchasedTogether, setItemsPurchasedTogether] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items`).then((res) => {
      let items = [];
      Object.entries(res.data.items).map(([key, value]) => {
        items.push(key);
        return null;
      });
      setOptionData(items);
    });
  }, []);

  const handleSubmit = (e) => {
    setShowGraph(false);
    const data = {
      a1: a1,
      a2: a2,
    };
    if(a1==='')
      return false;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/predict`, data)
      .then((res) => {
        console.log(res.data.data);
        let items = [];
        let tempObj = {};
        Object.entries(res.data.data["consequents"]).map(([key, value]) => {
          tempObj = {
            antecedents: res.data.data.antecedents[key],
            consequents: res.data.data.consequents[key],
            confidence: res.data.data.confidence[key],
            support: res.data.data.support[key],
            lift: res.data.data.lift[key],
            conviction: res.data.data.conviction[key],
          };
          items.push(tempObj);
          return null;
        });
        setItemsPurchasedTogether(items);
        setShowGraph(true);
      });
  };
  return (
    <div className="prediction-container py-4">
      <Container fluid>
        <h1>Please Select An Item</h1>
        <form>
          <Row>
            <Col>
              <div className="form-group">
                <label>What would you like to order?</label>
                <select
                  className="form-control"
                  onClick={(e) => setA1(e.target.value)}
                >
                  <option value=""></option>
                  {optionData.map((i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>Anything Else?</label>
                <select
                  className="form-control"
                  onClick={(e) => setA2(e.target.value)}
                >
                  <option value=""></option>
                  {optionData.map((i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Col>
            <Col xs lg={2}>
              <label className="text-muted">Click here</label>
              <Button onClick={handleSubmit} className="w-100">
                Done
              </Button>
            </Col>
          </Row>
        </form>
        {showGraph && (
          <>
            <Row>
              <Col xs={6}>
                <PresentBar data={itemsPurchasedTogether} attr="confidence" />
              </Col>
              <Col xs={6}>
                <PresentBar data={itemsPurchasedTogether} attr="support" />
              </Col>
            </Row>
            <Row>
              <Col>
                <PresentBar data={itemsPurchasedTogether} attr="lift" />
              </Col>
              <Col>
                <PresentBar data={itemsPurchasedTogether} attr="conviction" />
              </Col>
            </Row>
          </>
        )
        }
      </Container>
    </div>
  );
};

export default PredictionPage;
