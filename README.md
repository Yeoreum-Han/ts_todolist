# todolist - 투두리스트

## 🙋 소개
![todolist01](https://github.com/Yeoreum-Han/ts_todolist/assets/127937169/2a7f7ae3-446b-4098-ad74-d908b2ced0d3)  
 하루의 할 일을 일별로 작성하고 관리하는 사이트입니다.  
 이 [**투두리스트**](https://reactts-todolist.web.app/)에서는 달력으로 날짜를 선택할 수 있어 지난 날의 할 일도 확인할 수 있습니다.
  
## 📖 기술스택
 * html5
 * css3
 * react 
 * typescript
 * firebases
  
## 💡 핵심기능  
1. 일자별 할 일 추가와 관리  
![todolist02](https://github.com/Yeoreum-Han/ts_todolist/assets/127937169/9977c726-691f-4053-a084-bc0e0cdb32aa)   
-- 할 일을 작성하고 리스트에 **추가**할 수 있습니다.
텍스트 클릭 시 수정 가능하고 체크박스로 완료한 일을 구분합니다.  
또한 오른쪽 x버튼으로 삭제할 수 있습니다.
달력으로 날짜를 선택해 일정을 **날짜별로 관리**할 수 있습니다.  
  
2. 반응형 웹  
-- 575px, 768px, 1024px을 분기점으로 미디어쿼리를 작성했습니다.  

   
## 🤔 트러블슈팅
1. 수정 시 체크박스 상태 유지  
체크박스 상태에 따라 className을 부여해 스타일을 적용했는데 수정 후 상태가 false로 초기화 되어 스타일이 적용되지 않는 문제가 발생했습니다.  
   
-> 이는 체크박스 클릭시 상태가 db에 저장되지 않기 때문임을 확인했습니다.   updateDoc으로 **db에 isDone 값을 업데이트**하고 db값을 받아,  
저장한 todoList의 상태도 업데이트하도록 작성했습니다.   
또한 수정 후 저장하는 editTodo 함수에서 수정한 텍스트와 함께 현재의 **isDone상태도 다시 저장** 하는 것으로 수정했습니다. 
