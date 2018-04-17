import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as reportActions from '../../actions/reportActions';
import '../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  RadialChart,
  DiscreteColorLegend,
  LabelSeries,
  Hint,
  XAxis,
  YAxis,
  LineSeries
  } from 'react-vis';

class Chart extends Component {

  state = {
    useCanvas: false
  }
  componentDidMount() {
    this.props.getTotalLanguages();
  }

  render() {
    const {useCanvas} = this.state;
    const  totalLanguages = this.props.reportState.totalLanguages;
    const barChartData = [];
    const linearChartData = [];
    var totalUsers = 0;
    totalLanguages.map(data=>{
      totalUsers += data.total;
      barChartData.push({x:data.language,y:data.total, label:data.total.toString()})
    })
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 bg-white">

            <div className="card">
              <div className="card-header">
                Total : {totalUsers} Records
              </div>
              <div className="card-body">               
                <XYPlot
                    xType="ordinal"
                    width={1000}
                    height={300}
                    >
                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries
                      className="vertical-bar-series-example"
                      data={barChartData}
                      />
                      <LabelSeries
                        data={barChartData} />

                </XYPlot>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                Users per year
              </div>
              <div className="card-body">               
                <XYPlot
                  width={300}
                  height={300}>
                  <HorizontalGridLines />
                  <VerticalGridLines />
                  <XAxis title="X Axis" position="start"/>
                  <YAxis title="Y Axis"/>
                  <LineSeries
                    className="first-series"
                    data={[
                      {x: 1, y: 3},
                      {x: 2, y: 5},
                      {x: 3, y: 15},
                      {x: 4, y: 12}
                    ]}/>
                  <LineSeries
                    className="second-series"
                    data={null}/>
                  <LineSeries
                    className="third-series"
                    curve={'curveMonotoneX'}
                    style={{
                      strokeDasharray: '2 2'
                    }}
                    data={[
                      {x: 1, y: 10},
                      {x: 2, y: 4},
                      {x: 3, y: 2},
                      {x: 4, y: 15}
                    ]}
                    strokeDasharray="7, 3"
                    />

                </XYPlot>
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return { reportState : state.reportState }
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({ getTotalLanguages : reportActions.getTotalLanguages }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Chart));