import React, { useState, useEffect } from "react";
import Axios from "../../node_modules/axios";

function Indexinter() {
  var inteobj = []
  const [axlist, setstate] = useState(inteobj)

  useEffect(() => {
    localStorage.setItem("test", JSON.stringify());
    Axios.get("http://interviewapi.stgbuild.com/getQuizData").then((response) => {
    const inlist = response.data.tests
    setstate(inlist)
  })
  },[])


  let testtype = (tname,tlen) => {
    // console.log(tname)
    let test = {
      json : axlist,
      testname: tname,
      corctans: [],
      ans:[],
      status:"pending"
    }
    localStorage.setItem("test", JSON.stringify(test))
    }

  const listItems = axlist.map((test) =>
  <tr>
  <td>{test.name}</td>
   <td>{test.questions.length}</td>
   <td>
  <a 
  class="btn btn-warning"
  onClick={()=>testtype(test.name,test.questions.length)}
  href={"/test/"+test._id+"/"+test.questions[0]._id}>Start Test</a>
  </td>
  </tr>
);


  return (
    <>
      <div class="container">
        <div class="row">
          <h1 style={{textAlign:"left",fontFamily:"sans-serif",fontWeight:500}}>My Interview Portal</h1>
          <hr/>
          <div class="col-md-12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th style={{textAlign:"center"}}>Test</th>
                  <th style={{textAlign:"center"}}>No of Questions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listItems}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Indexinter;
