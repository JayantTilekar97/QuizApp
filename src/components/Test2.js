import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";


function Test2(){

    let axlist = []
    let testarr = []
    let currtest = localStorage.getItem("test");
    testarr = JSON.parse(currtest);
    console.log(testarr)
    axlist = testarr.json


  let history = useNavigate();
    const [ansoptn,setoptin] = useState("")
    const [multioptn,setmulti] = useState([])

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


  let prevquest = () => {
    let prevpage = axlist[testindx].questions[curnum-1]._id
    history("/test/"+id+"/"+prevpage);
  }


  
 let nextquest = () => {
  let nextpage = axlist[testindx].questions[curnum+1]._id
  console.log(ansoptn)
  console.log(multioptn)
  console.log(axlist[testindx].questions[curnum].correctOptionIndex)
  
  if(axlist[testindx].questions[curnum].type == "Multiple-Response")
  {
    if(axlist[testindx].questions[curnum].correctOptionIndex.length == multioptn.length)
  {
    let sum1 =0
    let sum2 =0
    for(let i=0;i<axlist[testindx].questions[curnum].correctOptionIndex.length;i++)
    {
      sum1 += axlist[testindx].questions[curnum].correctOptionIndex[i]
      sum2 += parseInt(multioptn[i])
      console.log(sum1)
      console.log(sum2)
    }
    if(sum1 == sum2)
    {
      testarr.corctans.push("correct")
    }
    else{
      testarr.corctans.push("wrong")
    }
  }
  else{
    testarr.corctans.push("wrong")
  }
}
  else
  {
   if(axlist[testindx].questions[curnum].correctOptionIndex == ansoptn)
   {
    testarr.corctans.push("correct")
   }
   else{
    testarr.corctans.push("wrong")
   }
  }
  localStorage.setItem("test", JSON.stringify(testarr))
  history("/test/"+id+"/"+nextpage);
}




 let finish = () => {
  if(axlist[testindx].questions[curnum].type == "Multiple-Response")
  {
    if(axlist[testindx].questions[curnum].correctOptionIndex.length == multioptn.length)
  {
    let sum1 =0
    let sum2 =0
    for(let i=0;i<axlist[testindx].questions[curnum].correctOptionIndex.length;i++)
    {
      sum1 += axlist[testindx].questions[curnum].correctOptionIndex[i]
      sum2 += parseInt(multioptn[i])
      console.log(sum1)
      console.log(sum2)
    }
    if(sum1 == sum2)
    {
      testarr.corctans.push("correct")
    }
    else{
      testarr.corctans.push("wrong")
    }
   }
  }
  else
  {
  if(axlist[testindx].questions[curnum].correctOptionIndex == ansoptn)
  {
   testarr.corctans.push("correct")
  }
  else{
    testarr.corctans.push("wrong")
  }
 }
  localStorage.setItem("test", JSON.stringify(testarr))
  history("/finish")
 }



 let handleRadio = event =>{
  setoptin(event.target.value)
 }

 
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
  setmulti(temparr)
 }



 if(type == "Single"){
  optionlist = options.map((optn,index) =>
 <div class="radio">
 <input onChange={handleRadio} type="radio" name="option" value={index}/>{optn}
 </div>
 );
 }
 else{
    optionlist = options.map((optn,index) =>
    <div class="checkbox">
    <input onChange={handleCheck} type="checkbox" name={index} value={index}/>
    <label for={index}>{optn}</label>
    </div>
    );
 }




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
                            {optionlist}
                        </form>
                    </div>
                      
                    {curnum == limit-1 ? 
                    <div class="panel-footer" style={{textAlign:"right"}}> 
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
                                {optionlist}
                                </div>
                        </form>
                    </div>
                      
                    {curnum == limit-1 ? 
                    <div class="panel-footer" style={{textAlign:"right"}}> 
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

export default Test2;
