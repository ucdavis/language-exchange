import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as reportActions from '../../actions/reportActions';
import * as userActions from '../../actions/userActions';
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
  DiscreteColorLegend,
  Hint
  } from 'react-vis';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      barData : [{x:0, y:0}],
      year: 'All',
      value: null,
      total_registered_by_year : null,
      hint_value: null
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._rememberValue = this._rememberValue.bind(this);
    this._forgetValue = this._forgetValue.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.getTotalUsersPerLanguages();
    this.props.fetchUsers();
  }

  handleChange(event) {
    this.setState({year: event.target.value});
  }

  handleSubmit(event) {
    alert('Your have chosen year: ' + this.state.year);
    event.preventDefault();
  }

  _rememberValue(value) {
    this.setState({hint_value:value});
  }

  _forgetValue() {
    this.setState({
      hint_value: null
    });
  }
  

  render() {
    const authUser = this.props.userState.current;
    if( authUser.user_type){  
        const {hint_value} = this.state;
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
          usersUpdated.push({x:row.key, y:row.value, label:row.value.toString()});
          return usersUpdated;
        })

        // Data for users registered per year
        const usersRegistered = [];
        d3.nest()
        .key(function(d){ return d.created_at.split("-")[0]; })
        .sortKeys(d3.ascending)
        .rollup(function(v) {return v.length})
        .entries(users)
        .map(row=>{
          usersRegistered.push({ x:row.key, y:row.value, label:row.value.toString()});
          return usersRegistered;
        })

        // Data for users by year and month
        const allUsersPerYear = [];
        d3.nest()
        .key(function(d){ return ( (d.created_at.split("-")[0]) +"/"+ (d.created_at.split("-")[1]) )})
        .sortKeys(d3.ascending)
        .rollup(function(v) {return v.length;})
        .entries(users)
        .map(row=>{
          allUsersPerYear.push({x:row.key,y:row.value});
          return allUsersPerYear;
        })
        var maxUsersByMonthValues = [];
        allUsersPerYear.map(row=>{maxUsersByMonthValues.push(row.y); return maxUsersByMonthValues});
        var maxUsersByMonth = Math.max(...maxUsersByMonthValues);

        var allYears = [];
        usersRegistered.map(row=>{ allYears.push(row.x); return allYears})
        const maxYear = Math.max(...allYears);
        const minYear = Math.min(...allYears);

    // Data for sum of users by year

        var usersRegisteredLegend = [
          {title: "New", color:"red"},
          {title:"Active", color:"green"},
          {title:"Total", color:"orange"}
        ];
        var sumUsersByYear = [];
        var totalYear = 0;
        usersRegistered.map(row=>{
          sumUsersByYear
          .push({x:row.x,y:row.y+totalYear, label:(row.y+totalYear).toString()})
          totalYear += row.y;
          return sumUsersByYear;
        });


        return (
          <div>
            <div className="row">
              <div className="col-sm-12 bg-white">

    {/* Bar chart */}
                <div className="card mt-3 mb-3">
                  <div className="card-header">
                    Total : {totalUsers} Records
                  </div>
                  <div className="card-body">         
                    <XYPlot
                        xType="ordinal"
                        yDomain = {[0,maxUsersPerLanguage+10]}
                        width={850}
                        height={400}
                    >                   
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis tickLabelAngle={0} />
                        <YAxis />
                        <VerticalBarSeries
                          data={barChartData}
                          animation={{stiffness:100, damping:25 }}
                          />
                        <LabelSeries
                          data={barChartData}
                          style={{fontSize:12}}
                        />
                    </XYPlot>
                  </div>
                </div>

      {/* Line chart users activitity by year */}
                <div className="card mb-3">
                  <div className="card-header">
                    Users activity by year
                  </div>
                  <div className="card-body">     
                
                  <DiscreteColorLegend  items={usersRegisteredLegend} orientation="horizontal"/>
                    <XYPlot
                      xType="ordinal"
                      xScale={[minYear,maxYear]}
                      
                      width={850}
                      height={350}
                      margin={{top:20}}
                    >
                        <HorizontalGridLines tickTotal={ allYears.length*2 } />
                        <VerticalGridLines/>
                        <XAxis tickValues={ allYears } />
                        <YAxis />

                        <LineMarkSeries
                          className="third-series"
                          curve={'curveMonotoneX'}
                          style={{
                            strokeDasharray: '5 5'
                          }}
                          data={usersUpdated}
                          color="green"
                        />
                        <LabelSeries
                            data={usersUpdated}
                            style={{fontSize:11}}
                        />
                        
                      
                        <LineMarkSeries
                          className="first-series"
                          curve={'curveMonotoneX'}
                          style={{
                            strokeDasharray: '5 5'
                          }}
                          data={ usersRegistered }
                          color="red"
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
                          color="orange"
                          />
                        <LabelSeries
                            data={sumUsersByYear}
                            style={{fontSize:11}}
                        />

                    </XYPlot>
                  
                  </div>
                </div>
                
    {/* Line chart users by year/month */}
                <div className="card mb-3 mt-3">
                  <div className="card-header">
                    New users by month
                  </div>
                  <div className="card-body">
                    <div className="row">

                      {/* 
                        <div className="col-sm-12">
                          <form onSubmit={this.handleSubmit}>
                            <label>
                              Filter by year :
                              <select value={this.state.year} onChange={this.handleChange}>
                              <option value="All">All</option>
                              {allYears.map(row=>{
                                return <option key={row} value={row}>{row}</option>
                              })}
                              </select>
                            </label>
                            <input type="submit" value="Update Data" />
                          </form>
                        </div>
                      */}

                      <div className="col-sm-12">
                        <XYPlot
                          xType="ordinal"
                          yDomain = { [0,maxUsersByMonth+5]}
                          width={900}
                          height={400}
                          margin={{bottom:70}}
                        >
                          <HorizontalGridLines />
                          <VerticalGridLines tickTotal={allYears.length}/>
                          <XAxis tickLabelAngle={-45} tickSize={10} style={{
                            fontSize:10,
                            line: {stroke: 'lightGrey'},
                            ticks: {stroke: 'lightGrey'},
                            text: {stroke: 'none', fill: '#6b6b76'}
                            }}
                          />
                          <YAxis style={{
                              line: {stroke: 'lightGrey'},
                              ticks: {stroke: 'lightGrey'},
                              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}
                          />

                          <LineMarkSeries
                            onValueMouseOver={this._rememberValue}
                            onValueMouseOut={this._forgetValue}
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
                          {hint_value ?
                            <Hint value={hint_value}/> :
                            null
                          }
                        </XYPlot>
                      </div>
                  
                    </div>
                  </div>
                </div>
                {/* END CARD */}

              </div>
            </div>
          </div>

        );

        }else{
          return ( <div> <h4> 403 Forbidden - User Not Authorized </h4></div> )
      }
    }
  }
  

function mapStateToProps(state){
  return { reportState : state.reportState, userState : state.userState }
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({
    fetchCurrentUser: userActions.fetchCurrentUser,
    getTotalUsersPerLanguages : reportActions.getTotalUsersPerLanguages,
    fetchUsers : fetchUsers
   }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Chart));