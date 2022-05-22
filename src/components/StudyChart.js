import React, { Component } from "react";
import Chart from "react-apexcharts";

class StudyChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1, 5, 10, 15, 20, 25, 30]
        }
        
      },
      stroke: {
            curve: 'straight',
      },
      series: [
        {
            name: "푼 문제 수",
            data: [30, 40, 45, 50, 49, 30, 70]
        }
      ],
      markers: {
          size: 1
      },
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="600"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StudyChart;