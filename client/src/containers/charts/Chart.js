import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as reportActions from '../../actions/reportActions';
import '../../../node_modules/react-vis/dist/style.css';
import * as d3 from 'd3';
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
  LineSeries,
  LineMarkSeries
  } from 'react-vis';

class Chart extends Component {

  state = {
    useCanvas: false,
    barData : [{x:0, y:0}]
  }
  componentDidMount() {
    this.props.getTotalUsersPerLanguages();
    this.props.getTotalUsersPerYear();

  }

  showData(totalLanguages){
    var totalUsers = 0;
    const barChartData = [];
    totalLanguages.map(data=>{
      totalUsers += data.total;
      barChartData.push({x:data.language,y:data.total, label:data.total.toString()})
    });
    this.setState({barData:barChartData})

  }

  render() {
    const {useCanvas} = this.state;
    const linearChartData = [];

    // Data for bar char
    const barChartData = [];
    var totalUsers = 0;
    var totalLanguages = this.props.reportState.totalUsersPerLanguages;
    totalLanguages.map(data=>{
      totalUsers += data.total;
      barChartData.push({x:data.language,y:data.total, label:data.total.toString()})
    });



    var usersPerYear = [];
    var totalUsersPerYear = this.props.reportState.totalUsersPerYear;
    console.log("totalUsersPerYear",totalUsersPerYear);

    // D3 nest

    var totalUserByYear = d3.nest()
    .key(function(d) { return d.year;})
    .rollup(function(v) { return d3.sum(v, function(d) { return d.total; }); })
    .entries(totalUsersPerYear)

    var dataUsersByYear = [];
    totalUserByYear.map(row=>{
      dataUsersByYear.push({x:row.key,y:row.value})
    })

    var allYears = [];
    dataUsersByYear.map(row=>allYears.push(row.x))

    var sumUsersByYear = [];
    var totalYear = 0;
    dataUsersByYear.map(row=>{
      sumUsersByYear.push({x:row.x,y:row.y+totalYear})
      totalYear += row.y
    })
    console.log("sumUsersByYear",sumUsersByYear)

    

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
                    width={800}
                    height={300}
                    >
                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries
                      className="vertical-bar-series-example"
                      data={barChartData}
                      animation={{stiffness: 100,damping:25 }}
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
                  width={800}
                  height={300}>
                  <HorizontalGridLines />
                  <VerticalGridLines />
                  <XAxis tickTotal={1} tickValues={allYears}/>
                  <YAxis />

                  <LineMarkSeries
                    className="first-series"
                    curve={'curveMonotoneX'}
                    style={{
                      strokeDasharray: '5 5'
                    }}
                    data={dataUsersByYear}
                    />

                    <LineMarkSeries
                    className="third-series"
                    curve={'curveMonotoneX'}
                    style={{
                      strokeDasharray: '5 5'
                    }}
                    data={sumUsersByYear}
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
  return  bindActionCreators({
    getTotalUsersPerLanguages : reportActions.getTotalUsersPerLanguages,
    getTotalUsersPerYear : reportActions.getTotalUsersPerYear
   }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Chart));