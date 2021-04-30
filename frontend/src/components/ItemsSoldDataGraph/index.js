import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

  
const ItemsSoldDataGraph = (props) => {
    const [value, setValue] = useState({})
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/filter-items-sold').then(res => {
            if(props.type==="by_date")
                setValue(res.data.by_date);
            else
                setValue(res.data.by_month)
        })
    }, [props.type])
    
    const data = canvas => {
        let xValues = [];
        let yValues = [];
        for (const key in value) 
        {
            xValues.push(key);
            yValues.push(value[key]);
        }
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, 80);
        gradient.addColorStop(0, '#fa7f7241')
        gradient.addColorStop(1, '#FFFFFF')
        return {
            labels: xValues,
            datasets: [
                {
                    data: yValues,
                    fill: true,
                    backgroundColor: 'transparent',
                    borderColor: '#3f51b5',
                    pointBackgroundColor: '#3f51b5',
                    borderWidth: 1
                },
            ],
        }
    }
    
    const options = {
        responsive: true,
        legend: {
            display: false,
        },
        elements:{
            point:{
               radius: 0 
            },
            line: {
                tension: .5,
            }
        },
        scales:{
            xAxes:[{
                ticks: {
                    display: true,
                    fontColor: "black",
                },
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: "black",
                    display: true,
                    beginAtZero: false
                },
                gridLines: {
                    display: true,
                }
            }]
        }
    }
    return (
        <div>
            <Line id="canvas" data={data} options={options} />
        </div>
    );
}

export default ItemsSoldDataGraph;
