import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const ReceivedDataGraph = () => {
    const [year1, setYear1] = useState([])
    const [year2, setYear2] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/filter-items-sold`).then(res => {
            let y1 = [],y2 = [];
            Object.entries(res.data.by_month).map(([key,value], index)=>{
                if(index >= 12 )
                    y2.push(value);
                else
                    y1.push(value);
                return null;
            })
            setYear1(y1);
            setYear2(y2);
        })
    }, [])
    const data = canvas => {
        const ctx = canvas.getContext('2d');
        const g = ctx.createLinearGradient(0,0,0,80);
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                backgroundColor: g,
                label: '2014 Monthly Sales',
                data: year1,
                fill: false,
                borderColor: '#007bff',
                tension: 0.4
            },{
                backgroundColor: g,
                label: '2015 Monthly Sales',
                data: year2,
                fill: false,
                borderColor: '#6610f2',
                tension: 0.4
            },],
        };
    }
    console.log(data)
      const options={
        scales: {
            y: {
              title: {
                color: 'red',
                display: false,
                text: 'No. of Items Sold'
              }
            }
        }
      }
      console.log({year1, year2})
    return (
        <div className="py-4">
            <h3>Yearly Analysis</h3>
            <Jumbotron className="overview-card py-4" style={{background: "white"}}>
                <Line data={data} options={options} />
            </Jumbotron>
        </div>
    );
}

export default ReceivedDataGraph;
