import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as reportActions from '../../actions/reportActions';
import {fetchUsers} from '../../actions/userActions';
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
    barData : [{x:0, y:0}]
  }
  componentDidMount() {
    this.props.getTotalUsersPerLanguages();
    this.props.getTotalUsersPerYear();
    this.props.fetchUsers();

  }

  // showData(totalLanguages){
  //   var totalUsers = 0;
  //   totalLanguages.map(data=>{
  //     totalUsers += data.total;
  //     barChartData.push({x:data.language,y:data.total, label:data.total.toString()})
  //   });
  //   this.setState({barData:barChartData})
  // }

  render() {

    // Data for users updated by year
    const users = this.props.userState.users;
    const usersUpdated = [];
    d3.nest()
    .key(function(d){ return d.updated_at.split("-")[0]; })
    .sortKeys(d3.ascending)
    .rollup(function(v) {return v.length})
    .entries(users)
    .map(row=>{
      usersUpdated.push({x:row.key,y:row.value})
    })
    console.log ("usersUpdated",usersUpdated);

    // Data for bar chart
    const barChartData = [];
    var totalUsers = 0;
    var totalLanguages = this.props.reportState.totalUsersPerLanguages;
    totalLanguages.map(data=>{
      totalUsers += data.total;
      barChartData.push({x:data.language,y:data.total, label:data.total.toString()})
    });

    // Data for line chart
    var usersPerYear = [];
    var totalUsersPerYear = this.props.reportState.totalUsersPerYear;

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

                    <LineMarkSeries
                    className="third-series"
                    curve={'curveMonotoneX'}
                    style={{
                      strokeDasharray: '5 5'
                    }}
                    data={usersUpdated}
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
  return { reportState : state.reportState, userState : state.userState }
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({
    getTotalUsersPerLanguages : reportActions.getTotalUsersPerLanguages,
    getTotalUsersPerYear : reportActions.getTotalUsersPerYear,
    fetchUsers : fetchUsers
   }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Chart));