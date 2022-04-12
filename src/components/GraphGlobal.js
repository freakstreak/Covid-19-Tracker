import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { padding } from '@mui/system';




function GraphGlobal( props ) {

    ChartJS.register(ArcElement, Tooltip, Legend);
      

        const data = {
        labels: ["Total confirmed", "Total Recovered", "Total Deaths"],
        datasets: [
          {
            label: '# of Cases',
            data: props.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      
    //   const data = {
    //     labels,
    //     datasets: [
    //       {
    //         label: 'Covid cases',
    //         data: props.values,
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //       },
    //     ],
    //   };
      


  return (
    <div
        style={{
            width:'300px',
            height:'300px',
            margin:'25px auto',
            padding: '0px 0px 50px 0px'
            }}>
    <p>Toll</p>
    <Pie  data={data} />
    </div>
  )
}

export default GraphGlobal
