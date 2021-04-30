import React from 'react';
import {Bar} from 'react-chartjs-2'

const PresentBar = (props) => {
    const data = canvas => {
        canvas.height = 70;
        return {
        labels: props.data.map(d=>d['consequents']),
        datasets: [{
            label: props.attr,
            data: props.data.map(d=>d[props.attr]),
            backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(255, 205, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(201, 203, 207, 0.9)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    }
    }
    const options = {
        scales: {
            y: {
            beginAtZero: true
            }
        },
        animation: {
            duration: 1000,
        },
    }
    return (
        <div>
            <h2>{props.attr.toUpperCase()} Graph</h2>
          <Bar
                data={data}
                width={100}
                height={50}
                options={options}
            />  
        </div>
    );
}

export default PresentBar;
