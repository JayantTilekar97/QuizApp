import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import Compo from "./Compo";


function Test6(){

    let axlist = []
    let testarr = []
    let currtest = localStorage.getItem("test");
    testarr = JSON.parse(currtest);
    console.log(testarr)
    axlist = testarr.json


  let history = useNavigate();
    var ansoptn = ""
    var multioptn = []

    let {id} = useParams();
    let {num} = useParams();

    let curnum
    let testindx
    let optionlist

    console.log(id);
    console.log(num);
    
    let testquest = []
    let testname
    let options = []
    let type = "Multiple-Response"
    let limit


//-----------------Intial loop for retriving data of current question-----------------//
  for(let i=0;i<axlist.length;i++)
  {
   if(axlist[i]._id == id)
   {
    testindx = i
    testname =axlist[i].name
    limit = axlist[i].questions.length
    for(let j=0;j<limit;j++)
    {
      if(axlist[i].questions[j]._id == num)
      {
        curnum = j
        if(curnum <= testarr.corctans.length-1)
        {
          testarr.corctans.splice(curnum,1)
        //   testarr.ans.splice(curnum,1)
          localStorage.setItem("test", JSON.stringify(testarr))
        }
      }
    }
    testquest = axlist[i].questions[curnum]
    options = testquest.options
    if(testquest.type == type)
    {
      type = "Multiple-Response"
    }
    else{
        type = "Single" 
    }
    console.log(type)
   }
  }




//-----------------------previous button---------------------//
  let prevquest = () => {
    multioptn = []
    let prevpage = axlist[testindx].questions[curnum-1]._id
    history("/test/"+id+"/"+prevpage);
  }




//-----------------------next button---------------------//
 let nextquest = () => {
  let nextpage = axlist[testindx].questions[curnum+1]._id
  console.log(ansoptn)
  console.log(multioptn)
  console.log(axlist[testindx].questions[curnum].correctOptionIndex)
  
  if(axlist[testindx].questions[curnum].type == "Multiple-Response")
  {
    let counter = 0
    if(axlist[testindx].questions[curnum].correctOptionIndex.length == multioptn.length)
  {
    for(let i=0;i<axlist[testindx].questions[curnum].correctOptionIndex.length;i++)
    {
      for(let j=0;j<multioptn.length;j++)
      {
        if(axlist[testindx].questions[curnum].correctOptionIndex[i] == parseInt(multioptn[j]))
        {
         counter++
        }
      }
    }
    console.log(counter)
    if(counter == multioptn.length)
    {
      testarr.ans[curnum]=multioptn
      testarr.corctans.push("correct")
      multioptn = []
    }
    else{
      testarr.ans[curnum]=multioptn
      testarr.corctans.push("wrong")
      multioptn = []
    }
  }
  else{
    testarr.ans[curnum]=multioptn
    testarr.corctans.push("wrong")
    multioptn = []
  }
}
  else
  {
   if(axlist[testindx].questions[curnum].correctOptionIndex == ansoptn)
   {
    testarr.ans[curnum]=ansoptn
    testarr.corctans.push("correct")
   }
   else{
    testarr.ans[curnum]=ansoptn
    testarr.corctans.push("wrong")
   }
  }
  localStorage.setItem("test", JSON.stringify(testarr))
  history("/test/"+id+"/"+nextpage);
}




//-----------------------finsish button---------------------//
 let finish = () => {
  if(axlist[testindx].questions[curnum].type == "Multiple-Response")
  {
    let counter = 0
    if(axlist[testindx].questions[curnum].correctOptionIndex.length == multioptn.length)
  {
    for(let i=0;i<axlist[testindx].questions[curnum].correctOptionIndex.length;i++)
    {
      for(let j=0;j<multioptn.length;j++)
      {
        if(axlist[testindx].questions[curnum].correctOptionIndex[i] == parseInt(multioptn[j]))
        {
         counter++
        }
      }
    }
    console.log(counter)
    if(counter == multioptn.length)
    {
        testarr.ans[curnum]=multioptn
        testarr.corctans.push("correct")
        multioptn = []
    }
    else{
        testarr.ans[curnum]=multioptn
        testarr.corctans.push("wrong")
        multioptn = []
    }
  }
  else{
    testarr.ans[curnum]=multioptn
    testarr.corctans.push("wrong")
    multioptn = []
}
  }
  else
  {
  if(axlist[testindx].questions[curnum].correctOptionIndex == ansoptn)
  {
    testarr.ans[curnum]=ansoptn
   testarr.corctans.push("correct")
  }
  else{
    testarr.ans[curnum]=ansoptn
    testarr.corctans.push("wrong")
  }
 }
  localStorage.setItem("test", JSON.stringify(testarr))
  history("/finish")
 }





//----------------------handle radio changes----------------------//
 let handleRadio = event =>{
  ansoptn=event.target.value
  console.log(ansoptn)
 }


 

//----------------------handle checkbox changes----------------------//
 let handleCheck = event =>{
   let temparr = multioptn
   if(temparr.includes(event.target.value)==true)
   {
    let indx = temparr.indexOf(event.target.value)
    temparr.splice(indx, 1)
   }
   else{
    temparr.push(event.target.value)
   }
   multioptn = temparr
 }
 





//---------------------displaying question & options---------------------//
 if(type == "Single")
 {
  return(
    <div class="container">
        <div class="row">
        <h1>My Interview Portal</h1>
            <hr/>
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style={{textAlign:"left"}}>{testname}</div>
                    <div class="panel-body">
                        <form style={{textAlign:"left",paddingLeft:15}}>
                            <label >{testquest.questionText}</label>

                            <Compo type={type} options={options} curnum={curnum} handleRadio={handleRadio} handleCheck={handleCheck} id={id} num={num}/>
                            
                        </form>
                    </div>
                      
                    {curnum == limit-1 ? 
                    <div class="panel-footer" style={{textAlign:"right"}}> 
                    <a style={{marginRight:960}} onClick={()=>prevquest()} class="btn btn-success">Previous</a>
                    <a onClick={()=>finish()} class="btn btn-danger">Finish</a>
                    </div>
                    :curnum == 0 ? 
                     <div class="panel-footer" style={{textAlign:"left"}}> 
                     <a onClick={()=>nextquest()} class="btn btn-success">Next</a>
                     </div>
                     :
                      <div class="panel-footer" style={{textAlign:"left"}}> 
                      <a onClick={()=>prevquest()} class="btn btn-success">Previous</a>
                      <a onClick={()=>nextquest()} class="btn btn-success" style={{marginLeft:15}}>Next</a>
                      </div>                     
                     }

            </div>
        </div>
    </div>
    </div>
  );
 }
else{
  return(
    <div class="container">
        <div class="row">
        <h1>My Interview Portal</h1>
            <hr/>
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style={{textAlign:"left"}}>{testname}</div>
                    <div class="panel-body">
                        <form style={{textAlign:"left",paddingLeft:15}}>
                        <label><b>{testquest.questionText}</b></label>
                                <div>

                                <Compo type={type} options={options} curnum={curnum} handleRadio={handleRadio} handleCheck={handleCheck} id={id} num={num}/>
                                
                                </div>
                        </form>
                    </div>
          
                    {curnum == limit-1 ? 
                    <div class="panel-footer" style={{textAlign:"right"}}> 
                    <a onClick={()=>prevquest()} style={{marginRight:960}} class="btn btn-success">Previous</a>
                    <a onClick={()=>finish()} class="btn btn-danger">Finish</a>
                    </div>
                    :curnum == 0 ? 
                     <div class="panel-footer" style={{textAlign:"left"}}> 
                     <a onClick={()=>nextquest()} class="btn btn-success">Next</a>
                     </div>
                     :
                      <div class="panel-footer" style={{textAlign:"left"}}> 
                      <a onClick={()=>prevquest()} class="btn btn-success">Previous</a>
                      <a onClick={()=>nextquest()} class="btn btn-success" style={{marginLeft:15}}>Next</a>
                      </div>                     
                     }

              </div>
        </div>
    </div>
    </div>
  );
}

}

export default Test6;
