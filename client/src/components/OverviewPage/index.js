import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TopSellingProducts from "../TopSellingProducts";
import "./overview.css";
import BasicStats from "../BasicStats";
import ReceivedDataGraph from "../ReceivedDataGraph";

const OverviewPage = () => {
  return (
    <div className="overview-container">
      <Container fluid className="py-4">
        <h3>Overview</h3>
        <Row>
          <Col xs={8}>
            <BasicStats />
            <ReceivedDataGraph />
          </Col>
          <Col xs={4}>
            <TopSellingProducts limit="6" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OverviewPage;
