import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as reportActions from '../../actions/reportActions';
import '../../../node_modules/react-vis/dist/style.css';
// import * as d3 from 'd3';
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
    this.props.getTotalUsersPerLanguages();
    this.props.getTotalUsersPerYear();
  }

  render() {
    const {useCanvas} = this.state;
    const barChartData = [];
    const linearChartData = [];
    var totalUsers = 0;
    var  totalLanguages = this.props.reportState.totalUsersPerLanguages;
    totalLanguages.map(data=>{
      totalUsers += data.total;
      barChartData.push({x:data.language,y:data.total, label:data.total.toString()})
    });

    var usersPerYear = [];
    var totalUsersPerYear = this.props.reportState.totalUsersPerYear;
    console.log("totalUsersPerYear",totalUsersPerYear);


    const totalPerYear = [];
    totalUsersPerYear.map(total =>{
      totalPerYear.push({x:total.year,y:total.total})
    })
    console.log("Total Year",totalPerYear);
    
    // totalUsersPerYear.map(data=>{
    //   usersPerYear.push({x:data.}) 
    // })

    // D3 nest
    // var totalYear = d3.nest()
    // .key(function(d) { return d.year; })
    // .entries(totalPerYear);
    // console.log("totalYear",totalYear)

    const abcArr = [["2014", 10], ["2015", 20], ["2016",30],["2014",40],["2015",40]]

      var items = {}, row, year;
      for (var i = 0; i < totalPerYear.length; i++) {
          row = totalPerYear[i];
          console.log("row:",row)
          year = row[0];
          console.log("year",year);
          if (!items[year]) {
              items[year] = 0;
          }
          items[year] += row[1];
          console.log("Items (year)",items[year]);
          
      }
      console.log("Items Variable:",items);

      // var totalsPerYear = {}, row, year;
      // for (var i = 0; i < totalPerYear.length; i++) {
      //   row = totalPerYear[i];
      //     year = row.year;
      //     if (!totalsPerYear[i].total) {
      //       totalsPerYear[i].total = 0;
      //     }
      //     totalsPerYear[i].total += row.total;
          
      // }
      // console.log("totalsPerYear:",totalsPerYear);

      function groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    Array.prototype.groupBy = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }
    const groupedBy = totalUsersPerYear.groupBy('year')
    console.log("GROUPED BY:",groupedBy);


      // // Now, generate new array
      // var outputArr = [], temp;
      // for (key in items) {
      //     temp = [key, items[key]]
      //     outputArr.push(temp);
      // }
      //  console.log("TotalPerYear:",outputArr);

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
                  <XAxis title="Time" position="start"/>
                  <YAxis title="Number of users"/>
                  <LineSeries
                    className="first-series"
                    data={totalPerYear}/>
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
  return  bindActionCreators({
    getTotalUsersPerLanguages : reportActions.getTotalUsersPerLanguages,
    getTotalUsersPerYear : reportActions.getTotalUsersPerYear
   }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Chart));