import React, { Component } from "react";
import {XYPlot, XAxis, YAxis, HorizontalBarSeries, VerticalGridLines,HorizontalGridLines, MarkSeries ,LineSeries, VerticalBarSeries} from 'react-vis';
import axios from 'axios';
import Lottie from 'react-lottie';
import '../../../animations/style.css';
const lessons = ['1','2','3','11','12','13','21','22','31','41','42'];
class Products extends Component {
  state = {
    word:'a',
      users: [],
      isStopped: true,
      isPaused: true,
      data : [],
      allGrades:[],
      dataGrades:[],
      averageGrades:[]
    };
    componentDidMount() {
      this.state = {isStopped: false, isPaused: false};
        const url = `/api/admin/getUsers`;
        const urlAllGrades ='/api/grades/getAllGrades'
        //getRequestForColumnCharts
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ users: data })
          var dataPushed=[];
          {this.state.users.map((user) => (
                  dataPushed.push({x:user.username , y:user.lesson})
          ))}
          this.setState({ data: dataPushed })
          //console.log(this.state.data)
         })

         //getRequestForSecondCharts
         axios.get(urlAllGrades).then(response => response.data)
         .then((data) => {
           this.setState({ allGrades: data })
           var dataGradesPushed=[];
           {this.state.allGrades.map((grades) => (
                   dataGradesPushed.push({x: grades.lesson, y: grades.grade , size: grades.grade})
           ))}
           this.setState({ dataGrades: dataGradesPushed })
          // console.log(this.state.dataGrades);
          lessons.forEach(val =>{

            const currentAG = this.state.averageGrades;
            const G =this.state.dataGrades.filter(el =>{
              return el.x == val
            });

            if(G.length>0)
{
    var ag = 0;
    G.forEach(el => {
      ag+=el.y;
    })
            ag = ag/G.length;
            currentAG.push({x : ""+val,y : ""+ag,size : ""+G.length});
            this.setState({averageGrades : currentAG})
          }
          })
           console.log(this.state.averageGrades)
           //this.setState({word : 'b'});

          })

      }
      renderLottie()
      {
        const defaultOptions = {
              loop: true,
              autoplay: true,
              animationData: require('../../../animations/blink.json'),
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
        };
      if (this.state.users && this.state.users.length==0 && this.state.data.length==0 && this.state.averageGrades.length==0)
      return (

        <div className="card-group ">
          <div className="card  col-md-12">
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <Lottie options={defaultOptions}
          height={400}
          width={400}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}/>
          </div>
          </div>
          </div>
      );
      else
      return (
  <div className="card-group ">
          <div className="card  col-md-6">
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',padding:15}}>
          <XYPlot height={600} width={600} xType="ordinal">
            <VerticalBarSeries data={this.state.data} />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Users" />
            <YAxis title="Levels" />
          </XYPlot>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontWeight: 'bold',}}>
            <h5 className="car-title" style={{padding:15}}>-Column chart to our users' progress-</h5>
          </div>
          </div>
      <div className="card  col-md-6">
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',padding:15}}>
          <XYPlot width={600} height={600} xType="ordinal" yDomain={[0, 100]}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Lessons" />
            <YAxis title="Grades"  />
            <MarkSeries
            strokeWidth={2}
            opacity="0.8"
            className="mark-series-example"
            data={this.state.averageGrades}/>
          </XYPlot>
      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontWeight: 'bold',}}>
        <h5 className="car-title" style={{padding:15}}>-Scatter chart to average grade per lesson-</h5>
      </div>
      </div>
  </div>
      );
      }

  render() {
      return (
        <div>
          <h1 className="display-q text-center">Check our users' statistics from here!</h1>
    {this.renderLottie()}
      </div>

  );
  }
}
export default Products;
