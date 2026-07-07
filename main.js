let task_input = document.getElementById("task_input");

//유저가 값을 입력한다.

//+버튼을 누르면 할일 추가

let addbutton = document.getElementById("add_button");

let task_list = []

addbutton.addEventListener("click", addtask);


function addtask(){
    let taskcontent = task_input.value 
    task_list.push(taskcontent);
    console.log(task_list);
    render()

}

function render(){
    let resulthtml = '';
    for(let i=0;i<task_list.length;i++){
        resulthtml += `<div class="task_item">
        <div class="task">${task_list[i]}</div>
        <div>
          <button>Check</button>
          <button>Delete</button>
        </div>
      </div>`;
    }


    document.getElementById("task_board").innerHTML = resulthtml;
}

//삭제버튼을 누르면 할일 삭제
//체크버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐
//진행ㅈ중 끝남 탭을 누르면 언더바가 이동
//끝남 탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체 탭ㅇ을 누르면 다시 전체 아이템으로 돌아옴
