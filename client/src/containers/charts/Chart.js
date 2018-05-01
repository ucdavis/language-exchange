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
  LabelSeries,
  XAxis,
  YAxis,
  LineMarkSeries,
  } from 'react-vis';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      barData : [{x:0, y:0}],
      year: 'All',
      value: null,
      total_registered_by_year : null,
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({year: event.target.value});
  }

  handleSubmit(event) {
    alert('Your have chosen year: ' + this.state.year);
    event.preventDefault();
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
    const users = this.props.userState.users;


    // Data for bar chart
    const barChartData = [];
    var totalUsers = 0;
    var totalLanguages = this.props.reportState.totalUsersPerLanguages;
    totalLanguages.map(data=>{
      totalUsers += data.total;
      barChartData.push({x:data.short_name,y:data.total, label:data.total.toString(),yOffset: -15});
      return barChartData;
    });
    var maxUsersPerLanguageValues = [];
    barChartData.map(row=>{maxUsersPerLanguageValues.push(row.y); return maxUsersPerLanguageValues});
    var maxUsersPerLanguage = Math.max(...maxUsersPerLanguageValues);

    // Data for users updated per year
    const usersUpdated = [];
    d3.nest()
    .key(function(d){ return d.updated_at.split("-")[0]; })
    .sortKeys(d3.ascending)
    .rollup(function(v) {return v.length})
    .entries(users)
    .map(row=>{
      usersUpdated.push({x:row.key, y:row.value, label:row.value.toString(),yOffset: -10});
      return usersUpdated;
    })
    // console.log ("usersUpdated",usersUpdated);

    // Data for users registered per year
    const usersRegistered = [];
    d3.nest()
    .key(function(d){ return d.created_at.split("-")[0]; })
    .sortKeys(d3.ascending)
    .rollup(function(v) {return v.length})
    .entries(users)
    .map(row=>{
      usersRegistered.push({x:row.key, y:row.value, label:row.value.toString(),yOffset:18});
      return usersRegistered;
    })

    // All Data for users per all years
    const allUsersPerYear = [];
    d3.nest()
    .key(function(d){ return ( (d.created_at.split("-")[0]) +"/"+ (d.created_at.split("-")[1]) )})
    .sortKeys(d3.ascending)
    .rollup(function(v) {return v.length;})
    .entries(users)
    .map(row=>{
      allUsersPerYear.push({x:row.key,y:row.value, label:row.value.toString(),yOffset:-15});
      return allUsersPerYear;
    })
    console.log ("allUsersPerYear",allUsersPerYear);
    

    var allYears = [];
    usersRegistered.map(row=>{ allYears.push(row.x); return allYears})

    const maxYear = Math.max(...allYears);
    const minYear = Math.min(...allYears);

// Data for sum of users by year

    var sumUsersByYear = [];
    var totalYear = 0;
    usersRegistered.map(row=>{
      sumUsersByYear
      .push({x:row.x,y:row.y+totalYear, label:(row.y+totalYear)
      .toString(),yOffset: -20})
      totalYear += row.y;
      return sumUsersByYear;
    });
    var totalRegistered = sumUsersByYear[sumUsersByYear.length-1]

    return (
      <div>
        <div className="row">
          <div className="col-sm-12 bg-white">


            <div className="card mt-3 mb-3">
              <div className="card-header">
                Total : {totalUsers} Records
              </div>
              <div className="card-body">         
                <XYPlot
                    xType="ordinal"
                    yDomain = {[0,maxUsersPerLanguage+50]}
                    width={800}
                    height={400}
                    margin={{bottom:70, top:20}}
                    >

                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickLabelAngle={0} />
                    <YAxis />
                    <VerticalBarSeries
                      data={barChartData}
                      animation={{stiffness: 100,damping:25 }}
                      />
                      <LabelSeries
                        data={barChartData}
                        style={{fontSize:12}}
                      />

                </XYPlot>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                Users per year
              </div>
              <div className="card-body">     
             

                <XYPlot
                  xType="ordinal"
                  xScale={[minYear,maxYear]}
                  yDomain = {[0,totalRegistered.y+50]}
                  width={800}
                  height={400}
                >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis tickValues={ allYears } />
                    <YAxis />
                   
                    <LineMarkSeries
                      className="first-series"
                      curve={'curveMonotoneX'}
                      style={{
                        strokeDasharray: '5 5'
                      }}
                      data={ usersRegistered }
                    />
                    <LabelSeries
                        data={usersRegistered}
                        style={{fontSize:11}}
                        
                    />

                      
                    <LineMarkSeries
                      className="third-series"
                      curve={'curveMonotoneX'}
                      style={{
                        strokeDasharray: '5 5'
                      }}
                      data={sumUsersByYear}
                      />
                    <LabelSeries
                        data={sumUsersByYear}
                        style={{fontSize:11}}
                    />


                    <LineMarkSeries
                      className="third-series"
                      curve={'curveMonotoneX'}
                      style={{
                        strokeDasharray: '5 5'
                      }}
                      data={usersUpdated}
                    />
                    <LabelSeries
                        data={usersUpdated}
                        style={{fontSize:11}}
                    />

                </XYPlot>
               
              </div>
            </div>

                        <div className="card mb-3 mt-3">
              <div className="card-header">
                New users per month
              </div>
              <div className="card-body">     
             

                <XYPlot
                  xType="ordinal"
                  yDomain = {[0,70]}
                  width={1000}
                  height={400}
                  margin={{bottom:70}}
                >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis tickLabelAngle={-45} tickSize={10} style={{fontSize:10}}/>
                    <YAxis />

                    <LineMarkSeries
                      className="first-series"
                      curve={'curveMonotoneX'}
                      style={{
                        strokeDasharray: '5 5'
                      }}
                      data={ allUsersPerYear }
                    />
                    <LabelSeries
                        data={allUsersPerYear}
                        style={{fontSize:12}}
                    />

                </XYPlot>
                {/* <form onSubmit={this.handleSubmit}>
                      <label>
                        Filter by year :
                        <select value={this.state.year} onChange={this.handleChange}>
                        <option value="All">All</option>
                        {allYears.map(row=>{
                          return <option key={row} value={row}>{row}</option>
                        })}
                        </select>
                      </label>
                      <input type="submit" value="Submit" />
                    </form> */}
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