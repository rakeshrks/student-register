import React from "react";
import ReactDOM from "react-dom";

import "./scss/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        registerStudentInfo: [],
      },
    }; // state end
  } // constructor end

  onUpdate(studentData) {
    this.state.data.registerStudentInfo.push(studentData);
    var newObj = {
      data: {
        registerStudentInfo: this.state.data.registerStudentInfo,
      },
    };
    this.setState({
      newObj,
    });
  } // onUpdate end

  onDelete(currentNodeId) {
    var newArray = [];
    for (var i = 0; i < this.state.data.registerStudentInfo.length; i++) {
      var stData = this.state.data.registerStudentInfo[i];
      if (stData && stData.uid && stData.uid == currentNodeId) {
        //newArray.push(stData);
        delete this.state.data.registerStudentInfo[i];
      }
    }

    var newObj = {
      data: {
        registerStudentInfo: this.state.data.registerStudentInfo,
      },
    };

    this.setState({
      newObj,
    });
  } // onDelete end
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Student Registration Module</h2>
        </div>
        <RegisterStudentForm
          headerProp={this.state.data}
          regClick={this.onUpdate.bind(this)}
          delClick={this.onDelete.bind(this)}
        />
      </div>
    );
  } // render end
} // App Class End

// ==========================================================================

class RegisterStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.registerStudent = this.registerStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }
  registerStudent(e) {
    var constructRegFormData = {
      studentName: this.refs.studentName.value,
      emailAddress: this.refs.emailAddress.value,
      phoneNumber: this.refs.phoneNumber.value,
      studClass: this.refs.studClass.value,
      studMarks: this.refs.studMarks.value,
      uid: Date.now(),
    };
    this.props.regClick(constructRegFormData);
    var nullStr = "";
    this.refs.studentName.value = nullStr;
    this.refs.emailAddress.value = nullStr;
    this.refs.phoneNumber.value = nullStr;
    this.refs.studClass.value = nullStr;
    this.refs.studMarks.value = nullStr;

    //
  } // register student

  deleteStudent(e) {
    var currentNodeId = e.currentTarget.id;
    this.props.delClick(currentNodeId);
  } // delete student end

  render() {
    return (
      <div className="container">
        <div className="col">
          <div className="panel panel-default">
            <div className="panel-heading">
              {" "}
              <label> Register Student </label>{" "}
            </div>
            <div className="panel-body">
              <div className="container my-cont">
                <div className="row">
                  <div className="col-md-3">
                    <span> Student Name:</span>
                  </div>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="studentName"
                      type="text"
                      ref="studentName"
                    />
                  </div>
                </div>

                <div className="row mrgnTp10">
                  <div className="col-md-3">
                    <span> Email:</span>
                  </div>

                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="emailAddress"
                      type="email"
                      ref="emailAddress"
                    />
                  </div>
                </div>

                <div className="row mrgnTp10">
                  <div className="col-md-3">
                    <span> Phone#:</span>
                  </div>

                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="phoneNumber"
                      type="text"
                      ref="phoneNumber"
                    />
                  </div>
                </div>

                <div className="row mrgnTp10">
                  <div className="col-md-3">
                    <span> Class:</span>
                  </div>

                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="studClass"
                      type="text"
                      ref="studClass"
                    />
                  </div>
                </div>

                <div className="row mrgnTp10">
                  <div className="col-md-3">
                    <span>Marks %:</span>
                  </div>

                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="studMarks"
                      type="text"
                      ref="studMarks"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <span>
                <button
                  type="button"
                  id="registerBtn"
                  className="btn btn-primary"
                  onClick={this.registerStudent}
                >
                  New Student
                </button>
              </span>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <label className="mrgnBtm10"> Display Student Information </label>
              <div className="container my-cont">
                <div className="row">
                  <div className="col-md-2">
                    <label> Student Name </label>
                  </div>

                  <div className="col-md-2">
                    <label>Email </label>
                  </div>

                  <div className="col-md-3">
                    <label>Phone #</label>
                  </div>
                  <div className="col-md-2">
                    <label>Class </label>
                  </div>

                  <div className="col-md-3">
                    <label>Marks % </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel-body">
              <div className="container my-cont">
                {this.props.headerProp.registerStudentInfo.map(
                  function (player) {
                    return (
                      <div className="row mrgnBtm10">
                        <div className="col-md-2">
                          <span> {player.studentName} </span>
                        </div>

                        <div className="col-md-2">
                          <span> {player.emailAddress} </span>
                        </div>

                        <div className="col-md-2">
                          <span> {player.phoneNumber} </span>
                        </div>

                        <div className="col-md-2">
                          <span> {player.studClass} </span>
                        </div>
                        <div className="col-md-2">
                          <span> {player.studMarks} </span>
                        </div>

                        <div className="col-md-2 pull-right">
                          <span>
                            {" "}
                            <button
                              id={player.uid}
                              type="button"
                              className="btn-danger"
                              onClick={this.deleteStudent}
                            >
                              Delete
                            </button>{" "}
                          </span>
                        </div>
                      </div>
                    );
                  }.bind(this)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
} // RegisterStudentForm End
ReactDOM.render(<App />, document.getElementById("root"));
