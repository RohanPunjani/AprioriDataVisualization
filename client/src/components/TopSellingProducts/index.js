import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const TopSellingProducts = ({ limit }) => {
  const [topItems, setTopItems] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/items`)
      .then((res) => {
        setTopItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const label = [];
  const values = [];
  Object.entries(topItems).map(([key, value], index) => {
    if (index < limit) {
      label.push(key);
      values.push(value);
    }
    return null;
  });
  console.log(label);
  const data = canvas => {
    
    return {
    labels: label,
    datasets: [
      {
        label: "Top Selling Products",
        data: values,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "orange",
          "rgb(255, 205, 86)",
          "green",
          'lightgreen'
        ],
        hoverOffset: 4,
      },
    ],
  }};
  return (
    <Jumbotron className="overview-card py-4" style={{ background: "white" }}>
      <h3>Top Selling Products:</h3>
      <hr />
      <Doughnut
        data={data}
      />
      <div className="table-responsive table-borderless">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Sold</th>
            </tr>
          </thead>
          <tbody>
            {topItems
              ? Object.entries(topItems).map(([key, value], index) => {
                  return (
                    index < limit && (
                      <tr key={key}>
                        <th scope="row">{index + 1}</th>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    )
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </Jumbotron>
  );
};

export default TopSellingProducts;
