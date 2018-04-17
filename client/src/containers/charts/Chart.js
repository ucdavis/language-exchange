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