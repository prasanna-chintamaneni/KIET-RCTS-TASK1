import React, { useState, useEffect } from 'react';
import './slides.css';
import Chart from 'chart.js/auto';
import Data from './db.png';

function getRandomLightColor(index) {
  const r = Math.floor(Math.random() * 156 + 100);
  const g = Math.floor(Math.random() * 156 + 100);
  const b = Math.floor(Math.random() * 156 + 100);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

const Home = () => {
  const [Mean, setMean] = useState({});
  const [Maximum, setMaximum] = useState({});
  const [Variance, setVariance] = useState({});
  const [StandardDeviation, setStdDeviation] = useState({});
  const [Minimum, setDataMinimum] = useState({});
  const [Median, setMedian] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMean = await fetch('http://localhost:5000/Mean');
        const dataMean = await responseMean.json();
        setMean(dataMean);

        const responseMaximum = await fetch('http://localhost:5000/Maximum');
        const dataMaximum = await responseMaximum.json();
        setMaximum(dataMaximum);

        const responseVariance = await fetch('http://localhost:5000/Variance');
        const dataVariance = await responseVariance.json();
        setVariance(dataVariance);

        const responseStdDeviation = await fetch('http://localhost:5000/StandardDeviation');
        const dataStdDeviation = await responseStdDeviation.json();
        setStdDeviation(dataStdDeviation);

        const responseDataRange = await fetch('http://localhost:5000/Minimum');
        const dataMinimum = await responseDataRange.json();
        setDataMinimum(dataMinimum);

        const responseMedian = await fetch('http://localhost:5000/Median');
        const dataMedian = await responseMedian.json();
        setMedian(dataMedian);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const createHistogram = (id, label, data, type, index) => {
    const backgroundColor = getRandomLightColor(index);
    const borderColor = getRandomLightColor(index);

    return new Chart(document.getElementById(id), {
      type: type,
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label,
            data: Object.values(data),
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Categories',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    const meanHistogram = createHistogram('meanHistogram', 'Mean Histogram', Mean, 'bubble', 0);
    const maximumHistogram = createHistogram('maximumHistogram', 'Maximum Histogram', Maximum, 'bar', 1);
    const varianceHistogram = createHistogram('varianceHistogram', 'Variance Histogram', Variance, 'line', 2);
    const stdDeviationHistogram = createHistogram('stdDeviationHistogram', 'Standard Deviation Histogram', StandardDeviation, 'radar', 3);
    const dataMinimumHistogram = createHistogram('dataMinimumHistogram', 'Data Minimum Histogram', Minimum, 'scatter', 4);
    const medianHistogram = createHistogram('medianHistogram', 'Median Histogram', Median, 'doughnut', 5);

    return () => {
      meanHistogram.destroy();
      maximumHistogram.destroy();
      varianceHistogram.destroy();
      stdDeviationHistogram.destroy();
      dataMinimumHistogram.destroy();
      medianHistogram.destroy();
    };
  }, [Mean, Maximum, Variance, StandardDeviation, Minimum, Median]);

  return (
    <div>
       <div>
      <div>
        <div className="box">
          <div className="inner_box">
            <h3>Mean</h3>
            <div className="histogram-container">
              <canvas id="meanHistogram"></canvas>
            </div>
          </div>
        </div>
        <div className="box1">
          <div className="inner_box">
            <h3>Maximum</h3>
            <div className="histogram-container">
              <canvas id="maximumHistogram"></canvas>
            </div>
          </div>
        </div>
        <div className="box2">
          <div className="inner_box">
            <h3>Variance</h3>
            <div className="histogram-container">
              <canvas id="varianceHistogram"></canvas>
            </div>
          </div>
        </div>
        <div className="box3">
          <div className="inner_box">
            <h3>Standard Deviation</h3>
            <div className="histogram-container">
              <canvas id="stdDeviationHistogram"></canvas>
            </div>
          </div>
        </div>
        <div className="box4">
          <div className="inner_box">
            <h3>Minimum</h3>
            <div className="histogram-container">
              <canvas id="dataMinimumHistogram"></canvas>
            </div>
          </div>
        </div>
        <div className="box5">
          <div className="inner_box">
            <h3>Median</h3>
            <div className="histogram-container">
              <canvas id="medianHistogram"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="dbox">
        <div>
          <img src={Data} alt='Logo' />
          <div className="about-data-text">About the Data</div>
          <div className='text_container'>
            <p>The dataset provided captures the academic performance of five individuals across two subjects: Science and Mathematics. Each row represents a unique student, identified by their ID. These students have exhibited a diverse range of achievements in these subjects.</p>
            <p>In Science, the scores vary from a minimum of 75 to a maximum of 92, showcasing a range of aptitude and effort. The average score in Science stands at a commendable 86. A student with an ID of 3 secured the highest Science score of 90, while the lowest score of 75 is associated with ID 1.</p>
            <p>Mathematics, on the other hand, reflects a similar diversity. Scores fluctuate between 78 and 95, demonstrating a wide spectrum of mathematical proficiency. The average Mathematics score stands at an impressive 86.5. ID 5 achieved the highest score in Mathematics, with a remarkable 95, whereas ID 3 secured the lowest score of 78.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
