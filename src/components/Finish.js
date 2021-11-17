// import React,{useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";



function Finish(){
  let marks = []
  let correct =0
  let wrong =0 
  let history = useNavigate();

    let currtest = localStorage.getItem("test");
    marks = JSON.parse(currtest);
    marks.status = "finish"
    localStorage.setItem("test", JSON.stringify(marks))

    // console.log(marks)
    for(let i=0;i<marks.corctans.length;i++)
    {
      if(marks.corctans[i]=="correct")
      {
       correct++
      }
      else{
        wrong++
      }
    }
 
  //----------------------Go to Index Page----------------------//
    let backtoIndx = () => {
      history("/index");
      window.location.reload(false)
    }

  return (
    <>
       <div class="container">
        <div class="row">
        <h1 style={{textAlign:"left",fontFamily:"sans-serif",fontWeight:500}}>My Interview Portal</h1>
            <hr/>
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">{marks.testname}</div>
                    <div class="panel-body">
                        <center>
                            <h2>Total no of Questions : {marks.corctans.length}</h2>
                            <h3 class="text-success">Correct Answers: {correct}
                            <span style={{marginLeft:20}} class="text-danger">Wrong Answers: {wrong}</span></h3>
                        </center>
                    </div>
                    <div class="panel-footer" style={{textAlign:"centre"}}> 
                     <a class="btn btn-warning" onClick={()=>backtoIndx()} style={{color:"black"}}>Back to Test Page</a>
                     </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Finish;
