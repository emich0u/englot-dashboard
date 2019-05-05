import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addPorduct } from "../../../actions/productActions";
import { addExercice } from "../../../actions/exercicesActions";
import axios from 'axios';
import swal from 'sweetalert';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imagePath: "",
      category: "",
      prizeFourn: "",
      prizeSell: "",
      quantity: "",
      //---------------
      question:"",
      content:"",
      correctAnswer:"",
      lesson:null,
      //---------------
      questionQ:"",
      firstSugg:"",
      secondSugg:"",
      thirdSugg:"",
      correctAnswerQ:"",
      lessonQ:null,
    };

  }

  onClick2 = e => {
    e.preventDefault();
    if(this.state.question.length && this.state.content.length && this.state.correctAnswer.length && this.state.lesson)
    {
      axios
      .post(
        '/api/exercicef/add',
          {
          question: this.state.question,
          content: this.state.content,
          correctAns: this.state.correctAnswer,
          lesson:this.state.lesson,
          },
            )
            .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log('wrong data');
                  console.log(err);
                });
    }
    else{
      swal({
        title: "Wrong entries!",
        text: "Check your fields!",
        icon: "warning",
        dangerMode: true,
      });
    }

    //console.log();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick= c => {
    console.log(this.state.questionQ);
    console.log(this.state.firstSugg);
    console.log(this.state.secondSugg);
    console.log(this.state.thirdSugg);
    console.log(this.state.correctAnswerQ);
    console.log(this.state.lessonQ);

    if(this.state.questionQ.length && this.state.firstSugg.length && this.state.secondSugg.length && this.state.thirdSugg.length && this.state.correctAnswerQ.length && this.state.lessonQ)
    {
      axios
      .post(
        '/api/exerciceq/add',
          {
          question: this.state.questionQ,
          firstSugg: this.state.firstSugg,
          secondSugg: this.state.secondSugg,
          thirdSugg:this.state.thirdSugg,
          correctAns:this.state.correctAnswerQ,
          lesson:this.state.lessonQ,
          },
            )
            .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log('wrong data');
                  console.log(err);
                });
    }
    else{
      swal({
        title: "Wrong entries!",
        text: "Check your fields!",
        icon: "warning",
        dangerMode: true,
      });
    }
  }



  render() {
    return (
      <div className="productForm container">
        <h1 className="display-q text-center">Manage Englot exercises from here!</h1>
        <p className="lead text-center">
        Add a new "Fill in the blanks" exercise
        </p>
        <form onSubmit={this.onSubmit} className="Form col-md-8 ml-5">
          <div className="form-row">

            <div className="form-group col-md-12">
              <label>Question</label>
              <input
                type="text"
                name="question"
                value={this.state.question}
                onChange={this.onChange}
                className="form-control"
                placeholder="Question"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Content</label>
              <input
                type="text"
                name="content"
                value={this.state.content}
                onChange={this.onChange}
                className="form-control"
                placeholder="Content"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Correct answer</label>
              <input
                type="text"
                name="correctAnswer"
                value={this.state.correctAnswer}
                onChange={this.onChange}
                className="form-control"
                placeholder="Correct answer"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Lesson number</label>
              <input
                type="text"
                name="lesson"
                value={this.state.lesson}
                onChange={this.onChange}
                className="form-control"
                placeholder="Lesson"
              />
            </div>
            <button className="btn btn-primary">
                <li onClick={this.onClick2}>Add exercise</li>
            </button>
          </div>
        </form>

        <p className="lead text-center" style={{padding:15}}>
        Add a new "QCM" exercise
        </p>
        <form onSubmit={this.onSubmit} className="Form col-md-8 ml-5">
          <div className="form-row">

            <div className="form-group col-md-12">
              <label>Question</label>
              <input
                type="text"
                name="questionQ"
                value={this.state.questionQ}
                onChange={this.onChange}
                className="form-control"
                placeholder="Question"
              />
            </div>
            <div className="form-group col-md-12">
              <label>First suggestion</label>
              <input
                type="text"
                name="firstSugg"
                value={this.state.firstSugg}
                onChange={this.onChange}
                className="form-control"
                placeholder="First suggestion"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Second suggestion</label>
              <input
                type="text"
                name="secondSugg"
                value={this.state.secondSugg}
                onChange={this.onChange}
                className="form-control"
                placeholder="Second suggestion"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Third suggestion</label>
              <input
                type="text"
                name="thirdSugg"
                value={this.state.thirdSugg}
                onChange={this.onChange}
                className="form-control"
                placeholder="Third suggestion"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Correct answer</label>
              <input
                type="text"
                name="correctAnswerQ"
                value={this.state.correctAnswerQ}
                onChange={this.onChange}
                className="form-control"
                placeholder="Correct answer"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Lesson number</label>
              <input
                type="text"
                name="lessonQ"
                value={this.state.lessonQ}
                onChange={this.onChange}
                className="form-control"
                placeholder="Lesson"
              />
            </div>
              <div style={{alignSelf:'center'}}>
                <button className="btn btn-primary">
                    <li onClick={this.onClick}>Add exercise</li>
                </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  product: PropTypes.object.isRequired,
  addPorduct: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { addPorduct }
)(withRouter(Form));
