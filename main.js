let task_input = document.getElementById("task_input");

//유저가 값을 입력한다.

//+버튼을 누르면 할일 추가

let addbutton = document.getElementById("add_button");

let task_list = [];

addbutton.addEventListener("click", addtask);

function addtask() {
  let task = {
    id: randomIDGenerate(),
    taskcontent: task_input.value,
    isComplete: false,
  };
  task_list.push(task);
  console.log(task_list);
  render();
}

function render() {
  let resulthtml = "";
  for (let i = 0; i < task_list.length; i++) {
    if(task_list[i].isComplete == true){
        resulthtml += `<div class="task_item">
        <div class="task-done">${task_list[i].taskcontent}</div>
        <div>
          <button onclick="toogleComplete('${task_list[i].id}')">Check</button>
          <button onclick="deleteTask('${task_list[i].id}')">Delete</button>
        </div>
      </div>`;
    } else{
        resulthtml += `<div class="task_item">
            <div class="task">${task_list[i].taskcontent}</div>
            <div>
            <button onclick="toogleComplete('${task_list[i].id}')">Check</button>
            <button onclick="deleteTask('${task_list[i].id}')">Delete</button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task_board").innerHTML = resulthtml;
}

function toogleComplete(id){
    for(let i=0;i<task_list.length;i++){
        if(task_list[i].id == id){
            task_list[i].isComplete = !task_list[i].isComplete;
            break;
        }
    }
    render()
}

function deleteTask(id){
    for(let i=0;i<task_list.length;i++){
        if(task_list[i].id == id){
            task_list.splice(i,1)
            break;
        }
    }
    render()
}


function randomIDGenerate(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}
//삭제버튼을 누르면 할일 삭제
//체크버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐
//1. 체크 버튼을 클ㄹ릭하는 순간 트루 펄스
//2. 트루면 끝난 걸로 간주하고 밑줄 보여주기
//3. 펄스면 안 끝난 걸로 간주하고 그대로

//진행ㅈ중 끝남 탭을 누르면 언더바가 이동
//끝남 탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체 탭ㅇ을 누르면 다시 전체 아이템으로 돌아옴
