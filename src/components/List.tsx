import { useEffect, useState } from "react";
import { Todo } from "../App";
import { collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import './List.css';

interface CurrentTodo {
    id: string;
    text: string;
    isDone: boolean;
}

export default function List() {
    //편집할 때의 todo
    const [currentTodo, setCurrentTodo] = useState<CurrentTodo | null>(null);
    //db의 todoList
    const [todoList, setTodoList] = useState<Todo[]>([]);

    //todo를 받아오면서 currentTodo 상태업뎃
    function openEdit(todo: Todo) {
        setCurrentTodo({
            id: todo.id,
            text: todo.text,
            isDone: todo.isDone,
        });
    }

    //수정사항 업데이트하고 currentTodo 비우기
    async function editTodo() {
        if (currentTodo) {
            await updateDoc(doc(db, "todo", currentTodo.id), {
                isDone: currentTodo.isDone,
                text: currentTodo.text
            });
            setCurrentTodo(null);
        }
    }

    async function deleteTodo(todoId: string) {
        await deleteDoc(doc(db, "todo", todoId));
    }

    //체크박스 수정시 업데이트하고 todoList업뎃
    async function checkTodo(todoId: string, isDone: boolean) {
        await updateDoc(doc(db, "todo", todoId), {
            isDone: isDone,
        });

        setTodoList(prevList => prevList.map(todo => todo.id === todoId ? { ...todo, isDone } : todo));
    }

    function getData() {
        try {
            const todoListQuery = query(collection(db, "todo"), orderBy("createdAt"));
            onSnapshot(todoListQuery, (snapshot) => {
                const updatedTodoList: Todo[] = snapshot.docs.map((doc) => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        isDone: docData.isDone,
                        createdAt: docData.createdAt,
                        text: docData.text,
                    };
                });
                setTodoList(updatedTodoList);
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="todoListCover">
            <h1 style={{ display: "none" }}>todolist</h1>
            {todoList.map((todo) => (
                <div className="todoCover"
                    key={todo.id}>
                    {currentTodo && currentTodo.id === todo.id ?
                        <div className="editCover">
                            <input
                                type="checkbox"
                                checked={currentTodo.isDone}
                                onChange={(e) => setCurrentTodo({ ...currentTodo, isDone: e.target.checked })}
                            />
                            <textarea
                                id="listTextarea"
                                style={{ resize: "none" }}
                                value={currentTodo.text}
                                onChange={(e) => setCurrentTodo({ ...currentTodo, text: e.target.value })}
                            />
                        </div>
                        :
                        <div className="showCover">
                            <input
                                type="checkbox"
                                checked={todo.isDone}
                                onChange={(e) => checkTodo(todo.id, e.target.checked)}
                            />
                            <p
                                className={todo.isDone ? "checkedTodo" : ""}
                                onClick={() => openEdit(todo)}
                            >
                                {todo.text}
                            </p>
                        </div>
                    }
                    <div className="buttonCover">
                        <button
                            style={currentTodo && currentTodo.id === todo.id ? { visibility: "visible" } : { visibility: "hidden" }}
                            type="button"
                            onClick={editTodo}>v</button>
                        <button type="button" onClick={() => deleteTodo(todo.id)}>x</button>
                    </div>
                </div>
            ))
            }
        </div >
    );
}

