let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".active_alarms");
const setAlarm = document.getElementById("set_alarm");
let alarms = [];
let alarmSound=new Audio("Flute.mp3");
let initialHour = 0,
  initialMin = 0,
  alarmIndex = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);

const searchObject = (parameter, value) => {
    let alarmObject,
      objIndex,
      exists = false;
    alarms.forEach((alarm, index) => {
      if (alarm[parameter] == value) {
        exists = true;
        alarmObject = alarm;
        objIndex = index;
        return false;
      }
    });
    return [exists, alarmObject, objIndex];
  };

function displayTimer() {
    let date = new Date();

    // timerRef.innerHTML=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let [hours, minutes, seconds] = [
      appendZero(date.getHours()),
      appendZero(date.getMinutes()),
      appendZero(date.getSeconds()),
    ];
    //Display time
    timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

    alarms.forEach((alm,index)=>{
        if(alm.isActive){
            if(`${alm.alarmHour}:${alm.alarmMinute}`===`${hours}:${minutes}`){
                alarmSound.play();
            }
        }
    });
}
const inputCheck=(inputValue)=>{
    inputValue=parseInt(inputValue);
    if(inputValue <10){
        inputValue=appendZero(inputValue);
    }
    return inputValue;
}
hourInput.addEventListener("input",()=>{
    hourInput.value=inputCheck(hourInput.value);
});
minuteInput.addEventListener("input",()=>{
    minuteInput.value=inputCheck(minuteInput.value);
});
const createAlarm=(alarmObject)=>{
    const {id,alarmHour,alarmMinute}=alarmObject;
    let almDiv=document.createElement("div");
    almDiv.classList.add("alarm");
    almDiv.setAttribute("data-id",id);
    almDiv.innerHTML=`<span>${alarmHour}:${alarmMinute}</span>`;
    let checkbox=document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click",(e)=>{
        if(e.target.checked){
            startAlarm(e);
        }
        else{
            stopAlarm(e);
        }
    });
    almDiv.append(checkbox);
    let deleteButton=document.createElement("button");
    deleteButton.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click",(e)=>
        deleteAlarm(e));
    almDiv.appendChild(deleteButton);
    activeAlarms.appendChild(almDiv);
}

setAlarm.addEventListener("click",()=>{
    alarmIndex+=1;
    let alarmObj={};
    alarmObj.id=`${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour=hourInput.value;
    alarmObj.alarmMinute=minuteInput.value;
    alarmObj.isActive=false;
    alarms.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value=appendZero(initialHour);
    minuteInput.value=appendZero(initialMinute);

})
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarms[index].isActive = true;
    }
  };
  //Stop alarm
  const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarms[index].isActive = false;
      alarmSound.pause();
    }
  };
  //delete alarm
  const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      e.target.parentElement.parentElement.remove();
      alarms.splice(index, 1);
    }
  };
window.onload=()=>{
    setInterval(displayTimer);
    initialHour=0;
    initialMin=0;
    alarmIndex=0;
    alarms=[];
    hourInput.value=appendZero(initialHour);
    minuteInput.value=appendZero(initialMin);

}
