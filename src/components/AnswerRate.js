import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class AnswerRate extends Component {

  constructor(props) {
    super(props);

    this.state = {
        options: {labels: ['정답률', '오답률']},
        series: [50, 50],
        
    }
  }

  render() {
    return (
      <div className="pie">
        <Chart options={this.state.options} series={this.state.series} type="pie" width="380" />
      </div>
    );
  }
}

export default AnswerRate;