import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';


const ReceivedDataGraph = () => {
    const [value, setValue] = useState({})
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/').then(res => {
            setValue(res.data.grouped_data.count);
        })
    }, [])

    
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
                tension: 0.5,
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
                    suggestedMin: 0,
                    suggestedMax: 4
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

export default ReceivedDataGraph;
