const titleInput = document.querySelectorAll('.title');
const scopeInput = document.querySelectorAll('.scope');
const addTask = document.querySelector('#addTask');
const statusHold = document.querySelector('.status-hold');
const cancelTaskAdd = document.querySelector('#cancel');
const backk = document.querySelectorAll('.backk');
const items = document.querySelectorAll('.item');
const showTask = document.querySelector('#showTask');
const startDateInput = document.querySelectorAll('.startDate');
const endDateInput = document.querySelectorAll('.endDate');
const today = document.querySelector('#today');
const plus = document.querySelector('#plus');
const buttons = document.querySelectorAll('.buttons');
const categories = document.querySelector('#categories');
const taskID = document.querySelector('#taskID');
const dates = document.querySelector('#dates');
const knowing = document.querySelector('#knowing');
const category = document.querySelector('.category');

const seeTask = document.querySelector('#seeTask');
const taskAdd = document.querySelector('#taskAdd');
const taskHold = document.querySelector('#taskHold');

const titleError = document.querySelector('#titleError');
const scopeError = document.querySelector('#scopeError');
const startError = document.querySelector('#startError');
const endError = document.querySelector('#endError');
const precedeEnd = document.querySelector('#precedeEnd');
const precedeStart = document.querySelector('#precedeStart');

const titleError2 = document.querySelector('#titleError2');
const scopeError2 = document.querySelector('#scopeError2');
const startError2 = document.querySelector('#startError2');
const endError2 = document.querySelector('#endError2');
const precedeEnd2 = document.querySelector('#precedeEnd2');
const precedeStart2 = document.querySelector('#precedeStart2');

const viewStart = document.querySelector('#viewStart')
const viewEnd = document.querySelector('#viewEnd')

let title;
let scope;
let startDate;
let endDate;
let currentDate;
let statas;
let id;

//ALL THE ERRORS during input WILL BE IN THIS ARRAY
const errors = [];

//DISPLAYING THE ADD TASK FORM
plus.addEventListener('click', ()=>{
    taskHold.setAttribute('class', 'hidden');
    taskAdd.removeAttribute('class');
})

//CREATING AN ARRAY FOR ALL THE TASKS
const TASKS = [];
const PENDING = [];
const STARTED = [];
const ONGOING = [];
const FINISHED = [];
const DELAYED = [];
const CANCELLED = [];

//CREATING AN OBJECT FOR THE TASK

class Task{
    constructor(title, scope, startDate, endDate, currentDate, statas, id){
        this.title = title;
        this.scope = scope;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentDate = currentDate;
        this.statas = statas;
        this.id = id;
    }
    //CREATING THE FUNCTION THAT WILL SHOW THE TASK WHEN THE VIEW BUTTON IS CLICKED
    view(){
        statusHold.innerHTML = '';
        titleInput[1].value = this.title;
        scopeInput[1].value = this.scope;
        viewStart.textContent = new Date(this.startDate);
        viewEnd.textContent = new Date(this.endDate);
        today.textContent = new Date(this.currentDate);
        taskID.textContent = this.id;


        //CREATING THE PARAGRAPH FOR THE STATUS
        const statusDisplay = document.createElement('p');
        statusDisplay.setAttribute('class', 'status');
        statusDisplay.textContent = this.statas;
        statusHold.appendChild(statusDisplay);

        buttons[1].innerHTML = '';

        if(this.statas != 'Cancelled'){
            const cancelTask = document.createElement('button');
            cancelTask.textContent = 'Cancel Task';
            cancelTask.setAttribute('id', 'cancel2');
            buttons[1].appendChild(cancelTask);

            cancelTask.addEventListener('click', ()=>{
                if(cancelTask.textContent == 'Cancel Task'){
                    this.statas = 'Cancelled';
                    statusDisplay.textContent = 'Cancelled'
                    cancelTask.textContent = 'Task Cancelled'
                    buttons[1].innerHTML = '';
                    buttons[1].appendChild(cancelTask);
                }else{
                    buttons[1].removeChild(cancelTask);
                    return;
                }
            })
        }

        if(this.statas == 'Pending'){
            const editTask = document.createElement('button');
            editTask.setAttribute('id', 'editTask');
            editTask.textContent = 'Edit Task';
            buttons[1].appendChild(editTask);

            editTask.addEventListener('click', ()=>{
                if(this.statas != 'Pending'){
                    buttons[1].removeChild(editTask);
                    return;
                }
                if(editTask.textContent == 'Edit Task'){
                    //MAKING THE DATES DIV VISIBLE
                    dates.removeAttribute('class')

                    //MAKING THE START AND END DATES INVISIBLE
                    knowing.setAttribute('class', 'hidden');

                    //MAKING THE INPUTS NOT READ ONLY
                    titleInput[1].removeAttribute('readonly');
                    scopeInput[1].removeAttribute('readonly');

                    editTask.textContent = 'Save Edit';
                }else{
                    //EMPTYING THE ARRAY FIRST AT EVERY CLICK
                    for(i=0; i<errors.length; i++){
                        errors.pop();
                    }

                    //GETTING THE START AND END DATE OF THE TASK FROM THE INPUT
                    let a = startDateInput[1].value;
                    let b = endDateInput[1].value;

                    //TURNING THE DATE AND TIME FROM THE INPUT INTO MILISECONDS
                    a = new Date(a).getTime()
                    b = new Date(b).getTime()

                    //GETTING THE TIME THE TASK WAS CREATED
                    currentDate = new Date().getTime();

                    //ADDING TO THE ERROR ARRAY IF THERES AN ERROR AND slicing IT IF THERE'S NONE
                    if(titleInput[1].value.length == 0 || isNaN(titleInput[1].value.length)){
                        errors.push('Title Error');
                        titleError2.style.display = 'block';
                    }else{
                        titleError2.style.display = 'none';
                        for(i=0; i<errors.length; i++){
                            if(errors[i] == 'Title Error'){
                                errors.splice(i,1);
                            }
                        }
                    }

                    if(scopeInput[1].value == ''){
                        errors.push('Scope Error');
                        scopeError2.style.display = 'block';
                    }else{
                        scopeError2.style.display = 'none';
                        for(i=0; i<errors.length; i++){
                            if(errors[i] == 'Scope Error'){
                                errors.splice(i,1);
                            }
                        }
                    }
                    
                    if(isNaN(a)){
                        errors.push('Start date error');
                        startError2.style.display = 'block';
                    }else{
                        startError2.style.display = 'none';
                        for(i=0; i<errors.length; i++){
                            if(errors[i] == 'Start date Error'){
                                errors.splice(i,1);
                            }
                        }
                    }
                    
                    if(isNaN(b)){
                        errors.push('End date error');
                        endError2.style.display = 'block';
                    }else{
                        endError2.style.display = 'none';
                        for(i=0; i<errors.length; i++){
                            if(errors[i] == 'End date Error'){
                                errors.splice(i,1);
                            }
                        }
                    }

                    if(b<a || b<currentDate || b == a){
                        errors.push('End date precede error');
                        precedeEnd2.style.display = 'block';
                    }else{
                        precedeEnd2.style.display = 'none';
                        for(i=0; i<errors.length; i++){
                            if(errors[i] == 'End date precede error'){
                                errors.splice(i,1);
                            }
                        }
                    }

                    if(a<currentDate){
                        errors.push('Start date precede error');
                        precedeStart2.style.display = 'block';
                    }else{
                        precedeStart2.style.display = 'none';
                        for(i=0; i<errors.length; i++){
                            if(errors[i] == 'Start date precede error'){
                                errors.splice(i,1);
                            }
                        }
                    }

                    if(errors.length > 0){
                        console.log(errors);
                        return;
                    }

                    //GETTING THE SCOPE AND TITLE FROM THE INPUT
                    this.title = titleInput[1].value;
                    this.scope = scopeInput[1].value;
                    this.startDate = a;
                    this.endDate = b;

                    //MAKING THE INPUTS READ ONLY
                    titleInput[1].setAttribute('readonly','readonly');
                    scopeInput[1].setAttribute('readonly','readonly');

                    //MAKING THE DATES DIV INVISIBLE
                    knowing.removeAttribute('class')

                    //MAKING THE START AND END DATES VISIBLE
                    dates.setAttribute('class', 'hidden');

                    editTask.textContent = 'Edit Task';

                    titleInput[1].value = this.title;
                    scopeInput[1].value = this.scope;
                    viewStart.textContent = new Date(this.startDate);
                    viewEnd.textContent = new Date(this.endDate);
                }
            })
        }

        //TURNING THE STATUS OF A TASK TO DELAYED
        let endStatus = setInterval(() => {
            let update = new Date().getTime();
            if(update >= this.endDate && this.statas != 'Cancelled' && this.statas != 'Finished'){
                this.statas = 'Delayed';
                statusDisplay.textContent = this.statas;
                buttons[1].innerHTML = '';

                clearInterval(endStatus);
            }
        }, 1000);


        let updateStatus = setInterval(() => {
            let update = new Date().getTime();
            if(update >= this.startDate && this.statas != 'Cancelled' && this.statas != 'Delayed'){

                if(this.statas != 'Started' && this.statas != 'Ongoing' && this.statas != 'Finished'){
                    this.statas = 'Started';
                    statusDisplay.textContent = this.statas;
                }

                clearInterval(updateStatus);

                const toOnGoing = ()=>{
                    if(update >= this.startDate && update <= this.endDate){
                        this.statas = 'Ongoing';
                        statusDisplay.textContent = this.statas;
                    }
                }


                const onGoing = document.createElement('button');
                if(this.statas == 'Started'){
                    onGoing.textContent = 'Start';
                    onGoing.style.backgroundColor = 'skyblue';
                }else if(this.statas == 'Ongoing'){
                    onGoing.textContent = 'Done';
                    onGoing.style.backgroundColor = 'rgb(114, 3, 3)';
                }else if(this.statas == 'Finished'){
                    onGoing.textContent = 'Completed';
                    onGoing.style.backgroundColor = 'yellow';
                }
                buttons[1].appendChild(onGoing);

                onGoing.addEventListener('click', ()=>{
                    if(onGoing.textContent == 'Start'){
                        toOnGoing();
                        onGoing.textContent = 'Done';
                        onGoing.style.backgroundColor = 'rgb(114, 3, 3)';
                    }
                    else if(onGoing.textContent == 'Done'){
                        this.statas = 'Finished'
                        statusDisplay.textContent = this.statas;
                        onGoing.textContent = 'Completed';
                        onGoing.style.backgroundColor = 'yellow';
                    }
                });
                
                
            }
        }, 1000);
    }
}

//CANCEL BUTTON
cancelTaskAdd.addEventListener('click', ()=>{
    titleInput[0].value = '';
    scopeInput[0].value = '';
    startDateInput[0].value = '';
    endDateInput[0].value = '';

    //GOING BACK TO THE MAIN PAGE
    taskAdd.setAttribute('class', 'hidden');
    taskHold.removeAttribute('class');
})


addTask.addEventListener('click', ()=>{

    //EMPTYING THE ARRAY FIRST AT EVERY CLICK
    for(i=0; i<errors.length; i++){
        errors.pop();
    }

    //GETTING THE START AND END DATE OF THE TASK FROM THE INPUT
    let a = startDateInput[0].value;
    let b = endDateInput[0].value;

    //TURNING THE DATE AND TIME FROM THE INPUT INTO MILISECONDS
    a = new Date(a).getTime()
    b = new Date(b).getTime()

    //GETTING THE TIME THE TASK WAS CREATED
    currentDate = new Date().getTime();

    //ADDING TO THE ERROR ARRAY IF THERES AN ERROR AND POPPING IT IF THERE'S NONE
    if(titleInput[0].value.length == 0 || isNaN(titleInput[0].value.length)){
        errors.push('Title Error');
        titleError.style.display = 'block';
    }else{
        titleError.style.display = 'none';
        for(i=0; i<errors.length; i++){
            if(errors[i] == 'Title Error'){
                errors.splice(i,1);
            }
        }
    }

    if(scopeInput[0].value == ''){
        errors.push('Scope Error');
        scopeError.style.display = 'block';
    }else{
        scopeError.style.display = 'none';
        for(i=0; i<errors.length; i++){
            if(errors[i] == 'Scope Error'){
                errors.splice(i,1);
            }
        }
    }
    
    if(isNaN(a)){
        errors.push('Start date error');
        startError.style.display = 'block';
    }else{
        startError.style.display = 'none';
        for(i=0; i<errors.length; i++){
            if(errors[i] == 'Start date Error'){
                errors.splice(i,1);
            }
        }
    }
    
    if(isNaN(b)){
        errors.push('End date error');
        endError.style.display = 'block';
    }else{
        endError.style.display = 'none';
        for(i=0; i<errors.length; i++){
            if(errors[i] == 'End date Error'){
                errors.splice(i,1);
            }
        }
    }

    if(b<a || b<currentDate || b == a){
        errors.push('End date precede error');
        precedeEnd.style.display = 'block';
    }else{
        precedeEnd.style.display = 'none';
        for(i=0; i<errors.length; i++){
            if(errors[i] == 'End date precede error'){
                errors.splice(i,1);
            }
        }
    }

    if(a<currentDate){
        errors.push('Start date precede error');
        precedeStart.style.display = 'block';
    }else{
        precedeStart.style.display = 'none';
        for(i=0; i<errors.length; i++){
            if(errors[i] == 'Start date precede error'){
                errors.splice(i,1);
            }
        }
    }

    if(errors.length > 0){
        console.log(errors);
        return;
    }

    //GETTING THE SCOPE AND TITLE FROM THE INPUT
    title = titleInput[0].value;
    scope = scopeInput[0].value;
    startDate = a;
    endDate = b;
    statas = 'Pending';

    let jube = [];
    //GENERATING A TASK ID
    const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',0,1,2,3,4,5,6,7,8,9,'@','$','#','%','/','&','!','?','+'];
    for(i=0; i<6; i++){
        let rand = Math.floor(Math.random() * characters.length);
        jube.push(characters[rand]);
    }
    id = jube.toString();

    //CREATING A NEW TASK
    const newTask = new Task(title, scope, startDate, endDate, currentDate, statas, id)

    //CREATING A DIV FOR THE TASK
    const taskHolder = document.createElement('div');
    taskHolder.setAttribute('class', 'task');
    showTask.appendChild(taskHolder);

    //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
    const titleHead = document.createElement('h3');
    titleHead.textContent = newTask.title;
    taskHolder.appendChild(titleHead);

    //CREATING A LABEL TO INDICATE START AND FINISH
    const labelStart = document.createElement('label');
    labelStart.textContent = 'Start';
    
    const labelEnd = document.createElement('label');
    labelEnd.textContent = 'End';

    //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
    const timeDisplay1 = document.createElement('div');
    timeDisplay1.setAttribute('class', 'time');
    taskHolder.appendChild(timeDisplay1);
    timeDisplay1.appendChild(labelStart);

    const timeDisplay2 = document.createElement('div');
    timeDisplay2.setAttribute('class', 'time');
    taskHolder.appendChild(timeDisplay2);
    timeDisplay2.appendChild(labelEnd);

    //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
    const showStart = document.createElement('p');
    let rawA = new Date(newTask.startDate);
    let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
    let rawA2 = rawA.toLocaleTimeString('en-US');
    showStart.textContent = `${rawA1} ${rawA2}`;

    //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
    const showEnd = document.createElement('p');
    let rawB = new Date(newTask.endDate);
    let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
    let rawB2 = rawB.toLocaleTimeString('en-US');
    showEnd.textContent = `${rawB1} ${rawB2}`;

    timeDisplay1.appendChild(showStart);
    timeDisplay2.appendChild(showEnd);

    //ADDING EVENT LISTERNER TO THE BUTTON THAT WILL BE CREATED DYNAMICALLY
    const viewTask = document.createElement('button');
    viewTask.textContent = 'View';
    taskHolder.appendChild(viewTask);
    viewTask.addEventListener('click', ()=>{
        newTask.view()
        taskHold.setAttribute('class', 'hidden');
        seeTask.removeAttribute('class');
    })

    TASKS.push(newTask);
    PENDING.push(newTask);

    //GOING BACK TO THE MAIN PAGE
    taskAdd.setAttribute('class', 'hidden');
    taskHold.removeAttribute('class');

})

//LEAVING THE VIEW TASK PAGE
backk[0].addEventListener('click', ()=>{
    seeTask.setAttribute('class', 'hidden');
    taskHold.removeAttribute('class');
})
backk[1].addEventListener('click', ()=>{
    categories.setAttribute('class', 'hidden');
    taskHold.removeAttribute('class');
})

for(i=0; i<items.length; i++){
    items[i].addEventListener('click', ()=>{
        categories.removeAttribute('class');
        category.innerHTML = '';
        taskHold.setAttribute('class', 'hidden');
        taskAdd.setAttribute('class', 'hidden');
        seeTask.setAttribute('class', 'hidden');

        //local storage shii
        //CLEARING THE LOCAL STORAGE SO THAT I'LL BE ABLE TO PUT NEW TASKS WITHOUT ANY CONFLICT
        for(a=0; a<STARTED.length; a++){
            SAVE.push(STARTED[a]);
        }
        for(a=0; a<ONGOING.length; a++){
            SAVE.push(ONGOING[a]);
        }
        for(a=0; a<PENDING.length; a++){
            SAVE.push(PENDING[a]);
        }
        for(a=0; a<DELAYED.length; a++){
            SAVE.push(DELAYED[a]);
        }
        for(a=0; a<FINISHED.length; a++){
            SAVE.push(FINISHED[a]);
        }
        for(a=0; a<CANCELLED.length; a++){
            SAVE.push(CANCELLED[a]);
        }        
    })
}

items[0].addEventListener('click', ()=>{

    //EMPTYING THE STARTED ARRAY SO THAT WE WON'T HAVE DUPLICATES
    for(i=0; i<TASKS.length; i++){
        STARTED.pop();
    }

    //FILLING THE STARTED ARRAY WITH ONLY STARTED STATUS
    for(i=0; i<TASKS.length; i++){
        if(TASKS[i].statas == 'Started'){
            STARTED.push(TASKS[i]);
        }
    }

    //PUTTING THE STARTED TASKS ON THE SCREEN
    for(i=0; i<STARTED.length; i++){
        //CREATING A DIV FOR THE TASK
        const taskHolder = document.createElement('div');
        taskHolder.setAttribute('class', 'task');
        category.appendChild(taskHolder);
    
        //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
        const titleHead = document.createElement('h3');
        titleHead.textContent = STARTED[i].title;
        taskHolder.appendChild(titleHead);
    
        //CREATING A LABEL TO INDICATE START AND FINISH
        const labelStart = document.createElement('label');
        labelStart.textContent = 'Start';
        
        const labelEnd = document.createElement('label');
        labelEnd.textContent = 'End';
    
        //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
        const timeDisplay1 = document.createElement('div');
        timeDisplay1.setAttribute('class', 'time');
        taskHolder.appendChild(timeDisplay1);
        timeDisplay1.appendChild(labelStart);
    
        const timeDisplay2 = document.createElement('div');
        timeDisplay2.setAttribute('class', 'time');
        taskHolder.appendChild(timeDisplay2);
        timeDisplay2.appendChild(labelEnd);
    
        //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
        const showStart = document.createElement('p');
        let rawA = new Date(STARTED[i].startDate);
        let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
        let rawA2 = rawA.toLocaleTimeString('en-US');
        showStart.textContent = `${rawA1} ${rawA2}`;
    
        //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
        const showEnd = document.createElement('p');
        let rawB = new Date(STARTED[i].endDate);
        let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
        let rawB2 = rawB.toLocaleTimeString('en-US');
        showEnd.textContent = `${rawB1} ${rawB2}`;
    
        timeDisplay1.appendChild(showStart);
        timeDisplay2.appendChild(showEnd);
    
        //DISPAYING THE TASK ID
        const ident = document.createElement('div');
        ident.setAttribute('class', 'ident');
        taskHolder.appendChild(ident);
        
        const labelID = document.createElement('label');
        labelID.textContent = 'Task ID';
        ident.appendChild(labelID);
    
        const paraID = document.createElement('p');
        paraID.textContent = STARTED[i].id;
        ident.appendChild(paraID);
    }
 
})

items[1].addEventListener('click', ()=>{
     //EMPTYING THE ONGOING ARRAY SO THAT WE WON'T HAVE DUPLICATES
     for(i=0; i<TASKS.length; i++){
        ONGOING.pop();
    }

    //FILLING THE ONGOING ARRAY WITH ONLY STARTED STATUS
    for(i=0; i<TASKS.length; i++){
        if(TASKS[i].statas == 'Ongoing'){
            ONGOING.push(TASKS[i]);
        }
    }

    for(i=0; i<ONGOING.length; i++){
        //CREATING A DIV FOR THE TASK
        const taskHolder = document.createElement('div');
        taskHolder.setAttribute('class', 'task');
        category.appendChild(taskHolder);
    
        //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
        const titleHead = document.createElement('h3');
        titleHead.textContent = ONGOING[i].title;
        taskHolder.appendChild(titleHead);
    
        //CREATING A LABEL TO INDICATE START AND FINISH
        const labelStart = document.createElement('label');
        labelStart.textContent = 'Start';
        
        const labelEnd = document.createElement('label');
        labelEnd.textContent = 'End';
    
        //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
        const timeDisplay1 = document.createElement('div');
        timeDisplay1.setAttribute('class', 'time');
        taskHolder.appendChild(timeDisplay1);
        timeDisplay1.appendChild(labelStart);
    
        const timeDisplay2 = document.createElement('div');
        timeDisplay2.setAttribute('class', 'time');
        taskHolder.appendChild(timeDisplay2);
        timeDisplay2.appendChild(labelEnd);
    
        //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
        const showStart = document.createElement('p');
        let rawA = new Date(ONGOING[i].startDate);
        let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
        let rawA2 = rawA.toLocaleTimeString('en-US');
        showStart.textContent = `${rawA1} ${rawA2}`;
    
        //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
        const showEnd = document.createElement('p');
        let rawB = new Date(ONGOING[i].endDate);
        let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
        let rawB2 = rawB.toLocaleTimeString('en-US');
        showEnd.textContent = `${rawB1} ${rawB2}`;
    
        timeDisplay1.appendChild(showStart);
        timeDisplay2.appendChild(showEnd);
    
        //DISPAYING THE TASK ID
        const ident = document.createElement('div');
        ident.setAttribute('class', 'ident');
        taskHolder.appendChild(ident);
        
        const labelID = document.createElement('label');
        labelID.textContent = 'Task ID';
        ident.appendChild(labelID);
    
        const paraID = document.createElement('p');
        paraID.textContent = ONGOING[i].id;
        ident.appendChild(paraID);
    }
})

items[2].addEventListener('click', ()=>{
    //PUSHING ONY THE TASKS WITH THE STATUS OF PENDING AND REMOVING THE TASKS THAT AREN'T PENDING
    for(i=0; i<PENDING.length; i++){
        if(PENDING[i].statas !== 'Pending'){
            PENDING.splice(i,1);
        }
    }
    for(i=0; i<PENDING.length; i++){
        //CREATING A DIV FOR THE TASK
        const taskHolder = document.createElement('div');
        taskHolder.setAttribute('class', 'task');
        category.appendChild(taskHolder);

        //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
        const titleHead = document.createElement('h3');
        titleHead.textContent = PENDING[i].title;
        taskHolder.appendChild(titleHead);

        //CREATING A LABEL TO INDICATE START AND FINISH
        const labelStart = document.createElement('label');
        labelStart.textContent = 'Start';
        
        const labelEnd = document.createElement('label');
        labelEnd.textContent = 'End';

        //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
        const timeDisplay1 = document.createElement('div');
        timeDisplay1.setAttribute('class', 'time');
        taskHolder.appendChild(timeDisplay1);
        timeDisplay1.appendChild(labelStart);

        const timeDisplay2 = document.createElement('div');
        timeDisplay2.setAttribute('class', 'time');
        taskHolder.appendChild(timeDisplay2);
        timeDisplay2.appendChild(labelEnd);

        //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
        const showStart = document.createElement('p');
        let rawA = new Date(PENDING[i].startDate);
        let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
        let rawA2 = rawA.toLocaleTimeString('en-US');
        showStart.textContent = `${rawA1} ${rawA2}`;

        //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
        const showEnd = document.createElement('p');
        let rawB = new Date(PENDING[i].endDate);
        let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
        let rawB2 = rawB.toLocaleTimeString('en-US');
        showEnd.textContent = `${rawB1} ${rawB2}`;

        timeDisplay1.appendChild(showStart);
        timeDisplay2.appendChild(showEnd);

        //DISPAYING THE TASK ID
        const ident = document.createElement('div');
        ident.setAttribute('class', 'ident');
        taskHolder.appendChild(ident);
        
        const labelID = document.createElement('label');
        labelID.textContent = 'Task ID';
        ident.appendChild(labelID);

        const paraID = document.createElement('p');
        paraID.textContent = PENDING[i].id;
        ident.appendChild(paraID);
    }
})

items[3].addEventListener('click', ()=>{
    //EMPTYING THE DELAYED ARRAY SO THAT WE WON'T HAVE DUPLICATES
    for(i=0; i<TASKS.length; i++){
       DELAYED.pop();
   }

   //FILLING THE DELAYED ARRAY WITH ONLY STARTED STATUS
   for(i=0; i<TASKS.length; i++){
       if(TASKS[i].statas == 'Delayed'){
           DELAYED.push(TASKS[i]);
       }
   }

   for(i=0; i<DELAYED.length; i++){
       //CREATING A DIV FOR THE TASK
       const taskHolder = document.createElement('div');
       taskHolder.setAttribute('class', 'task');
       category.appendChild(taskHolder);
   
       //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
       const titleHead = document.createElement('h3');
       titleHead.textContent = DELAYED[i].title;
       taskHolder.appendChild(titleHead);
   
       //CREATING A LABEL TO INDICATE START AND FINISH
       const labelStart = document.createElement('label');
       labelStart.textContent = 'Start';
       
       const labelEnd = document.createElement('label');
       labelEnd.textContent = 'End';
   
       //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
       const timeDisplay1 = document.createElement('div');
       timeDisplay1.setAttribute('class', 'time');
       taskHolder.appendChild(timeDisplay1);
       timeDisplay1.appendChild(labelStart);
   
       const timeDisplay2 = document.createElement('div');
       timeDisplay2.setAttribute('class', 'time');
       taskHolder.appendChild(timeDisplay2);
       timeDisplay2.appendChild(labelEnd);
   
       //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
       const showStart = document.createElement('p');
       let rawA = new Date(DELAYED[i].startDate);
       let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
       let rawA2 = rawA.toLocaleTimeString('en-US');
       showStart.textContent = `${rawA1} ${rawA2}`;
   
       //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
       const showEnd = document.createElement('p');
       let rawB = new Date(DELAYED[i].endDate);
       let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
       let rawB2 = rawB.toLocaleTimeString('en-US');
       showEnd.textContent = `${rawB1} ${rawB2}`;
   
       timeDisplay1.appendChild(showStart);
       timeDisplay2.appendChild(showEnd);
   
       //DISPAYING THE TASK ID
       const ident = document.createElement('div');
       ident.setAttribute('class', 'ident');
       taskHolder.appendChild(ident);
       
       const labelID = document.createElement('label');
       labelID.textContent = 'Task ID';
       ident.appendChild(labelID);
   
       const paraID = document.createElement('p');
       paraID.textContent = DELAYED[i].id;
       ident.appendChild(paraID);
   }
})

items[4].addEventListener('click', ()=>{
    //EMPTYING THE FINISHED ARRAY SO THAT WE WON'T HAVE DUPLICATES
    for(i=0; i<TASKS.length; i++){
       FINISHED.pop();
   }

   //FILLING THE FINISHED ARRAY WITH ONLY STARTED STATUS
   for(i=0; i<TASKS.length; i++){
       if(TASKS[i].statas == 'Finished'){
           FINISHED.push(TASKS[i]);
       }
   }

   for(i=0; i<FINISHED.length; i++){
       //CREATING A DIV FOR THE TASK
       const taskHolder = document.createElement('div');
       taskHolder.setAttribute('class', 'task');
       category.appendChild(taskHolder);
   
       //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
       const titleHead = document.createElement('h3');
       titleHead.textContent = FINISHED[i].title;
       taskHolder.appendChild(titleHead);
   
       //CREATING A LABEL TO INDICATE START AND FINISH
       const labelStart = document.createElement('label');
       labelStart.textContent = 'Start';
       
       const labelEnd = document.createElement('label');
       labelEnd.textContent = 'End';
   
       //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
       const timeDisplay1 = document.createElement('div');
       timeDisplay1.setAttribute('class', 'time');
       taskHolder.appendChild(timeDisplay1);
       timeDisplay1.appendChild(labelStart);
   
       const timeDisplay2 = document.createElement('div');
       timeDisplay2.setAttribute('class', 'time');
       taskHolder.appendChild(timeDisplay2);
       timeDisplay2.appendChild(labelEnd);
   
       //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
       const showStart = document.createElement('p');
       let rawA = new Date(FINISHED[i].startDate);
       let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
       let rawA2 = rawA.toLocaleTimeString('en-US');
       showStart.textContent = `${rawA1} ${rawA2}`;
   
       //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
       const showEnd = document.createElement('p');
       let rawB = new Date(FINISHED[i].endDate);
       let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
       let rawB2 = rawB.toLocaleTimeString('en-US');
       showEnd.textContent = `${rawB1} ${rawB2}`;
   
       timeDisplay1.appendChild(showStart);
       timeDisplay2.appendChild(showEnd);
   
       //DISPAYING THE TASK ID
       const ident = document.createElement('div');
       ident.setAttribute('class', 'ident');
       taskHolder.appendChild(ident);
       
       const labelID = document.createElement('label');
       labelID.textContent = 'Task ID';
       ident.appendChild(labelID);
   
       const paraID = document.createElement('p');
       paraID.textContent = FINISHED[i].id;
       ident.appendChild(paraID);
   }
})

items[5].addEventListener('click', ()=>{
    //EMPTYING THE CANCELLED ARRAY SO THAT WE WON'T HAVE DUPLICATES
    for(i=0; i<TASKS.length; i++){
       CANCELLED.pop();
   }

   //FILLING THE CANCELLED ARRAY WITH ONLY STARTED STATUS
   for(i=0; i<TASKS.length; i++){
       if(TASKS[i].statas == 'Cancelled'){
           CANCELLED.push(TASKS[i]);
       }
   }

   for(i=0; i<CANCELLED.length; i++){
       //CREATING A DIV FOR THE TASK
       const taskHolder = document.createElement('div');
       taskHolder.setAttribute('class', 'task');
       category.appendChild(taskHolder);
   
       //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
       const titleHead = document.createElement('h3');
       titleHead.textContent = CANCELLED[i].title;
       taskHolder.appendChild(titleHead);
   
       //CREATING A LABEL TO INDICATE START AND FINISH
       const labelStart = document.createElement('label');
       labelStart.textContent = 'Start';
       
       const labelEnd = document.createElement('label');
       labelEnd.textContent = 'End';
   
       //CREATING A DIV FOR THE TASK DATES AND APPENDING IT
       const timeDisplay1 = document.createElement('div');
       timeDisplay1.setAttribute('class', 'time');
       taskHolder.appendChild(timeDisplay1);
       timeDisplay1.appendChild(labelStart);
   
       const timeDisplay2 = document.createElement('div');
       timeDisplay2.setAttribute('class', 'time');
       taskHolder.appendChild(timeDisplay2);
       timeDisplay2.appendChild(labelEnd);
   
       //CREATING A PARAGRAPH FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
       const showStart = document.createElement('p');
       let rawA = new Date(CANCELLED[i].startDate);
       let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
       let rawA2 = rawA.toLocaleTimeString('en-US');
       showStart.textContent = `${rawA1} ${rawA2}`;
   
       //CREATING A PARAGRAPH FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
       const showEnd = document.createElement('p');
       let rawB = new Date(CANCELLED[i].endDate);
       let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
       let rawB2 = rawB.toLocaleTimeString('en-US');
       showEnd.textContent = `${rawB1} ${rawB2}`;
   
       timeDisplay1.appendChild(showStart);
       timeDisplay2.appendChild(showEnd);
   
       //DISPAYING THE TASK ID
       const ident = document.createElement('div');
       ident.setAttribute('class', 'ident');
       taskHolder.appendChild(ident);
       
       const labelID = document.createElement('label');
       labelID.textContent = 'Task ID';
       ident.appendChild(labelID);
   
       const paraID = document.createElement('p');
       paraID.textContent = CANCELLED[i].id;
       ident.appendChild(paraID);
   }
})

// //CREATING AN ARRAY THAT WILL BE SAVED IN THE LOCAL STORAGE
// const SAVE = [];

// //I DID THIS HERE SO THAT IT WILL RUN AFTER THE TASKS HAVE BEEN ARRANGED INTO THEIR RESPECTIVE ARRAYS
// for(i=0; i<items.length; i++){
//     items[i].addEventListener('click', ()=>{
//         //CLEARING THE SAVE ARRAY FIRST
//         for(i=0; i<SAVE.length; i++){
//             SAVE.pop();
//         }
//         //local storage shii
//         //CLEARING THE LOCAL STORAGE SO THAT I'LL BE ABLE TO PUT NEW TASKS WITHOUT ANY CONFLICT
//         localStorage.clear();

//         for(a=0; a<STARTED.length; a++){
//             SAVE.push(STARTED[a]);
//         }
//         for(a=0; a<ONGOING.length; a++){
//             SAVE.push(ONGOING[a]);
//         }
//         for(a=0; a<PENDING.length; a++){
//             SAVE.push(PENDING[a]);
//         }
//         for(a=0; a<DELAYED.length; a++){
//             SAVE.push(DELAYED[a]);
//         }
//         for(a=0; a<FINISHED.length; a++){
//             SAVE.push(FINISHED[a]);
//         }
//         for(a=0; a<CANCELLED.length; a++){
//             SAVE.push(CANCELLED[a]);
//         }
        
//         //PUTTING THE SAVE ARRAY INTO THE LOCAL STORAGE
//         let saveMe = JSON.stringify(SAVE);
//         localStorage.setItem("TASKS", saveMe);
//     })

// }