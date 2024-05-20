import React, { useState } from 'react';
import List from './components/List';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebase';
import './App.css';

export interface Todo {
  id: string;
  isDone: boolean;
  createdAt: number;
  text: string;
};

function App() {
  const [userInput, setUserInput] = useState("");


  async function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todo"), {
        isDone: false,
        createdAt: Date.now().toString(),
        text: userInput
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUserInput("");
  };

  return (
    <div className="App">
      <header className="App-header" style={{ display: "none" }}><h1>달력 투두리스트</h1></header>
      <section>
        <h1 style={{ display: "none" }}>캘린더</h1>
      </section>
      <section className="sectionCover">
        <h1 style={{ display: "none" }}>투두작성폼</h1>
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
