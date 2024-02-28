const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCur = document.querySelector(".from select");
  const toCur = document.querySelector(".to select");
  const msg = document.querySelector(".msg");
  for(let select of dropdowns)
  {
    for(currcode in countryList)
    {
      let newOption = document.createElement("option");
      newOption.innerText = currcode;
      newOption.value = currcode; 
      // newOption.innerText = currcode;
      if(select.name==="from"  && currcode==="USD"){
        newOption.selected = "selected";
      }else if(select.name==="to" && currcode==="INR"){
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    });
  }

  const updateFlag = ((element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  });

  btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amt = amount.value;
    console.log(amt);
    if(amt==="" || amt<1){
      amt = 1;
      amount.value="1";
    }
    const URL= `${BASE_URL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
    let response =await fetch(URL);
    let data =  await response.json();
    let rate = data[toCur.value.toLowerCase()];
    console.log(rate);
    let finalAmt = amt*rate;
    msg.innerText = `${amt} ${fromCur.value} = ${finalAmt} ${toCur.value}`;
  });