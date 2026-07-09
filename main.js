// document.getElementById() : HTML 문서에서 id 값이 "task_input"인 요소(input 태그)를 찾아온다.
// 이렇게 찾아온 요소는 변수에 저장해두고, 나중에 .value 등으로 그 안의 값을 읽거나 쓸 수 있다.
let task_input = document.getElementById("task_input");
let mode = 'all'
//유저가 값을 입력한다.
//+버튼을 누르면 할일 추가

// "add_button" id를 가진 버튼 요소를 찾아서 변수에 저장
let addbutton = document.getElementById("add_button");

// 할일 목록을 저장할 배열. 처음에는 아무것도 없는 빈 배열([])로 시작한다.
// 이 배열 안에 할일 하나하나가 객체({}) 형태로 담기게 된다.
let task_list = [];

// "task_tabs" 안에 있는 탭들(전체/진행중/끝남) 중에서 밑줄(#under_line)만 빼고 가져온다.
let tabs = document.querySelectorAll(".task_tabs > div:not(#under_line)");
let underLine = document.getElementById("under_line");

// addEventListener("click", 함수이름)
// : addbutton을 클릭(click)했을 때 addtask라는 함수를 실행하라고 등록하는 코드.
// 함수 이름 뒤에 ()를 붙이지 않는 이유: ()를 붙이면 "지금 바로 실행"되고,
// ()를 안 붙이면 "클릭했을 때 실행할 함수"로만 등록(예약)된다.
addbutton.addEventListener("click", addtask);

// 탭(전체/진행중/끝남)을 하나씩 돌면서 클릭 이벤트를 등록한다.
tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    // 클릭한 탭의 id("all" / "ongoing" / "done")를 현재 모드로 저장
    mode = tab.id;
    // 밑줄을 클릭한 탭 위치로 슬라이드시킨다.
    moveUnderLine(tab);
    // 바뀐 모드에 맞게 화면을 다시 그린다.
    render();
  });
});

// 클릭된 tab 요소의 위치(offsetLeft)와 너비(offsetWidth)를 읽어서
// #under_line의 left/width에 그대로 적용한다.
// CSS에 transition이 걸려 있어서 값이 바뀌는 순간 스르륵 슬라이드되는 것처럼 보인다.
function moveUnderLine(tab) {
  underLine.style.left = tab.offsetLeft + "px";
  underLine.style.width = tab.offsetWidth + "px";
}

// 페이지가 처음 열렸을 때도 현재 mode("all")에 해당하는 탭 위치로 밑줄을 맞춰준다.
moveUnderLine(document.getElementById(mode));



// 버튼을 클릭하면 실행되는 함수
function addtask() {
  // 할일 하나를 객체(object) 형태로 만든다.
  // 객체는 { 키: 값, 키: 값 } 형태로 여러 정보를 묶어서 저장할 수 있다.
  let task = {
    id: randomIDGenerate(), // 각 할일을 구분하기 위한 고유 아이디 (아래 randomIDGenerate 함수에서 생성)
    taskcontent: task_input.value, // input 태그에 사용자가 입력해둔 실제 텍스트 값
    isComplete: false, // 할일이 완료되었는지 여부. 처음 추가할 때는 아직 안 끝났으니 false
  };

  // 배열.push(값) : 배열의 맨 뒤에 새로운 값(여기서는 task 객체)을 추가하는 메서드
  task_list.push(task);

  // console.log() : 브라우저 개발자도구(콘솔)에 값을 출력해서 확인해보는 디버깅용 코드
  console.log(task_list);

  // 화면(HTML)을 다시 그려서 방금 추가한 할일이 눈에 보이도록 갱신
  render();
}

// task_list 배열에 들어있는 내용을 바탕으로 화면(HTML)을 새로 그려주는 함수
// 배열의 값이 바뀔 때마다(추가/삭제/완료체크) 이 함수를 다시 호출해서 화면을 최신 상태로 맞춰준다.
function render() {
  //1. 내가 선택한 탭(mode)에 따라 보여줄 목록을 고른다.
  let list = task_list;
  if (mode === "ongoing") {
    list = task_list.filter((task) => task.isComplete === false);
  } else if (mode === "done") {
    list = task_list.filter((task) => task.isComplete === true);
  }

  // 최종적으로 화면에 넣을 HTML 코드를 문자열로 차곡차곡 쌓아갈 변수
  let resulthtml = "";

  // for문으로 list 배열의 처음(0)부터 끝(length-1)까지 하나씩 순서대로 확인한다.
  for (let i = 0; i < list.length; i++) {
    // 현재 할일(list[i])의 isComplete 값이 true라면 = 완료된 할일이라면
    if (list[i].isComplete == true) {
      // 완료된 할일용 HTML 조각을 만든다. (class="task-done" → CSS에서 밑줄 등 완료 스타일 적용)
      // 백틱(`)으로 감싼 문자열 안에서 ${ } 를 쓰면 그 안의 변수 값을 그대로 문자열에 끼워넣을 수 있다. (템플릿 리터럴)
      resulthtml += `<div class="task_item">
        <div class="task-done">${list[i].taskcontent}</div>
        <div>
          <button onclick="toogleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    } else {
      // isComplete가 false라면 = 아직 진행중인 할일이라면
      // 완료 스타일이 없는 일반 class="task"로 HTML 조각을 만든다.
      resulthtml += `<div class="task_item">
            <div class="task">${list[i].taskcontent}</div>
            <div>
            <button onclick="toogleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
    }
  }

  // 지금까지 문자열로 쌓아온 HTML(resulthtml)을 실제로 "task_board" 요소 안에 넣어서 화면에 보여준다.
  // innerHTML에 문자열을 대입하면, 그 요소의 내부 내용이 통째로 이 문자열로 교체된다.
  document.getElementById("task_board").innerHTML = resulthtml;
}

// Check 버튼을 눌렀을 때 실행되는 함수. 어떤 할일을 클릭했는지 구분하기 위해 id를 매개변수로 받는다.
function toogleComplete(id) {
  // task_list를 처음부터 끝까지 돌면서, 클릭된 버튼의 id와 같은 id를 가진 할일을 찾는다.
  for (let i = 0; i < task_list.length; i++) {
    if (task_list[i].id == id) {
      // 찾았다면 isComplete 값을 반대로 뒤집는다. (!는 true/false를 반전시키는 논리 부정 연산자)
      // 즉 완료 상태였으면 미완료로, 미완료였으면 완료로 바뀐다.
      task_list[i].isComplete = !task_list[i].isComplete;

      // 원하는 항목을 찾았으니 더 이상 반복할 필요가 없어서 break로 for문을 즉시 빠져나간다.
      break;
    }
  }
  // 바뀐 상태를 화면에 다시 반영하기 위해 render() 재호출
  render();
}

// Delete 버튼을 눌렀을 때 실행되는 함수
function deleteTask(id) {
  // 클릭된 버튼의 id와 같은 id를 가진 할일을 배열에서 찾는다.
  for (let i = 0; i < task_list.length; i++) {
    if (task_list[i].id == id) {
      // 배열.splice(시작위치, 삭제할개수) : i번째 위치부터 1개의 요소를 배열에서 제거한다.
      task_list.splice(i, 1);
      break;
    }
  }
  // 삭제된 상태를 화면에 반영
  render();
}


// 할일마다 서로 겹치지 않는 고유한 id를 만들어주는 함수
function randomIDGenerate() {
  // Date.now() : 현재 시각을 숫자(1970년 1월 1일부터 지난 밀리초)로 반환
  // .toString(36) : 그 숫자를 36진법 문자열로 변환 (0-9, a-z를 사용해서 더 짧게 표현)
  // Math.random() : 0 이상 1 미만의 임의의 소수를 생성
  // .toString(36).substr(2, 5) : 역시 36진법 문자열로 바꾼 뒤 앞의 "0."을 떼고 5글자만 사용
  // 이 둘을 합치면 시간 정보 + 랜덤값이 섞여서 겹칠 확률이 매우 낮은 id가 만들어진다.
  // .toUpperCase() : 마지막으로 전부 대문자로 변환
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).toUpperCase();
}
//삭제버튼을 누르면 할일 삭제
//체크버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐
//1. 체크 버튼을 클ㄹ릭하는 순간 트루 펄스
//2. 트루면 끝난 걸로 간주하고 밑줄 보여주기
//3. 펄스면 안 끝난 걸로 간주하고 그대로

//진행ㅈ중 끝남 탭을 누르면 언더바가 이동
//끝남 탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체 탭ㅇ을 누르면 다시 전체 아이템으로 돌아옴
