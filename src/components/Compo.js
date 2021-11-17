import React from 'react'
import Test6 from './Test6'
import { useNavigate,useParams } from "react-router-dom";

 function Compo(props) {

    let history = useNavigate();
    let optionlist
    let type = props.type
    let handleRadio = props.handleRadio
    let options = props.options
    let curnum = props.curnum
    let handleCheck = props.handleCheck
    let id = props.id
    let num = props.num

    if(type == "Single"){
    
        let ansarr = []
        let temparr = []
        let temp = localStorage.getItem("test");
        temparr = JSON.parse(temp);
        ansarr = temparr.ans
         console.log(ansarr[curnum])
         console.log(curnum)
       
        if(typeof ansarr[curnum] == "undefined")
        {
        optionlist = options.map((optn,index) =>
       <div>
      <input  id={index} onClick={handleRadio} type="radio" name="option" value={index}/><label for={index}>{optn}</label>
      </div>);
      }
        else{
            // ansoptn = ansarr[curnum]
          optionlist = options.map((optn,index) =>
          (ansarr[curnum] == index.toString())
          ?
        <><div>
         <input  id={index} checked={true} onClick={handleRadio} type="radio" name="option" value={index}/><label for={index}>{optn}</label>
         </div></>
         :<><div>
         <input  id={index} onClick={handleRadio} type="radio" name="option" value={index}/><label for={index}>{optn}</label>
         </div></>
       );
        }
      }
     else{
        let ansarr = []
        let temparr = []
        let temp = localStorage.getItem("test");
        temparr = JSON.parse(temp);
        ansarr = temparr.ans
        
        if(typeof ansarr[curnum] == "undefined")
        {
            optionlist = options.map((optn,index) =>
            <div class="checkbox">
            <input onClick={handleCheck} type="checkbox" name={index} value={index}/>
            <label for={index}>{optn}</label>
            </div>);
        }
      else{
        // multioptn = ansarr[curnum]
        optionlist = options.map((optn,index) =>
        (((ansarr[curnum]).includes(index.toString())) == true)
          ?
          <><div class="checkbox">
        <input onClick={handleCheck} checked="true" type="checkbox" name={index} value={index}/>
        <label for={index}>{optn}</label>
        </div></>
        :<><div class="checkbox">
        <input onClick={handleCheck} type="checkbox" name={index} value={index}/>
        <label for={index}>{optn}</label>
        </div></>
        );
       }
     }
 

    
    return (
        <div>
            {optionlist}
        </div>
    )
}

export default Compo;