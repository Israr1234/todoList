const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('userName');
const recordsDisplay = document.getElementById('records');


let userArray = [];

let edit_id = null;

let objStr = localStorage.getItem('users');
if(objStr != null){
    userArray = JSON.parse(objStr);
    console.log('cccccc'+ objStr);
}

DisplayInfo();

addUserBtn.onclick = () => {
    const name = usernameTextField.value;
    if(edit_id!=null){
        //edit
        userArray.splice(edit_id,1,{'name' : name});
        edit_id = null;
    }
    else{
        //insert
        userArray.push({'name':name});
    }
    // console.log(name);
    // console.log(userArray)
    SaveInfo(userArray);
    usernameTextField.value = '';
    addUserBtn.innerText = btnText;


}

function SaveInfo(){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    DisplayInfo();


}

function DisplayInfo(){
    let statement = '';
    userArray.forEach((user,i) => {
        statement += `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${user.name}</td>
                        <td>
                        <i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})' ></i> 
                        <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})' ></i>
                        </td>
                      </tr>`;
    });
    recordsDisplay.innerHTML=statement;
}

function EditInfo(id){
    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = 'Save Change'
}

function DeleteInfo(id){
    userArray.splice(id,1);
    SaveInfo(userArray);
}


// Searching
const allTr = document.querySelectorAll('#records tr');
// console.log(allTr)

const searchInputField = document.querySelector('#search');

searchInputField.addEventListener('input',function(e){
    const searchStr = e.target.value.toLowerCase();
    recordsDisplay.innerHTML='';
    allTr.forEach(tr=>{
        const td_in_tr = tr.querySelectorAll('td');
        // console.log(td_in_tr[0].innerText.toLocaleLowerCase());
        if(td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1){
            recordsDisplay.appendChild(tr);
        }
    });
    if(recordsDisplay.innerHTML == ''){
        recordsDisplay.innerHTML = 'No Records Found'
    }

   console.log(searchStr);
    console.log(e.target.value);
});