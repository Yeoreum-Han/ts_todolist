import React, { useState } from 'react';
import List from './components/List';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebase';
import './App.css';
import { useAppSelector } from './hooks';
import SideCalendar from './components/SideCalendar';

export interface Todo {
  id: string;
  isDone: boolean;
  createdAt: number;
  text: string;
  stringDay: string;
};

function App() {
  const [userInput, setUserInput] = useState("");
  
  const clickedDay = useAppSelector((state) => state.date.day);
  const clickedDate = useAppSelector((state) => state.date.localeDate);

  const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const checkDate = useAppSelector((state) => state.clicked);

  const today = new Date();

  async function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todo"), {
        isDone: false,
        createdAt: Date.now().toString(),
        text: userInput,
        stringDay: clickedDate
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUserInput("");
  };

  return (
    <div className="App">
      <header className="App-header" style={{ display: "none" }}><h1>달력 투두리스트</h1></header>
      <section className="secCalendarCover">
        <h1 style={{ display: "none" }}>캘린더</h1>
        <SideCalendar/>
      </section>
      <section className="secTodoCover">
        <h1 style={{ display: "none" }}>투두작성폼</h1>
        <p>{
          checkDate.isClicked ?
            `${week[clickedDay]} ${clickedDate}`
            : `${week[today.getDay()]} ${today.toLocaleDateString()}`
        }</p>
        <form id="userTodo" name="userTodo" action="/" method="post" onSubmit={(e) => addTodo(e)}>
          <fieldset>
            <legend>TodoList</legend>
            <textarea id="userTodoText" name="userTodoText" style={{ resize: "none" }} placeholder="e.g.) 일어나서 이불 정리하기" onChange={(e) => setUserInput(e.target.value)} value={userInput} />
            <button type="submit">+</button>
          </fieldset>
        </form>
        <List />
      </section>
    </div>
  );
}

export default App;
