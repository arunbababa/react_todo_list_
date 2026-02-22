import { useState } from 'react'

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const onChangeTodoInput = (e) => {
    setTodoInput(e.target.value)
  }

  const onChangeEditInput = (e) => {
    setEditInput(e.target.value)
  }

  const onClickAddTodo = () => {
    const newTodos = [...todos, todoInput]
    setTodos(newTodos)
    setTodoInput("")
  }

  const onCLickRenameTodo = (index) => {
    setEditIndex(null)
    const newTodos = [...todos]
    newTodos.splice(index, 1, editInput)
    setTodos(newTodos)
  }

  const handleEditToggle = (todo, index) => {
    if (editIndex === index){
      setEditIndex(null)
      return;
    }
    setEditIndex(index);
    setEditInput(todo);
  }

  const onClickDeleteTodo = (todo, index) => {
    if (!confirm(`${todo}を削除しますか？`)) return;

    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <>
      <h1>Reactで作るタスク管理アプリ</h1>

      <div>
        <input type="text" placeholder='タスクを入力してください' onChange={onChangeTodoInput} value={todoInput}/>
        <button onClick={onClickAddTodo}>追加</button>
      </div>

      <div className="todo-list">
        <h3>TODOリスト</h3>
        <ul>
          {
            todos.map((todo, index) => (
              <li key={index}>
                <div className='todo-item'>
                  {
                    editIndex === index ? (
                      <>
                        <input type="text" value={editInput} onChange={onChangeEditInput}/>
                        <button onClick={() => onCLickRenameTodo(index)}>保存</button>
                        <button onClick={() => handleEditToggle(todo, index)}>キャンセル</button>
                      </>
                    ):
                    (
                      <>
                        <p>{todo}</p>
                        <button onClick={() => handleEditToggle(todo, index)}>編集</button>
                        <button onClick={() => onClickDeleteTodo(todo, index)}>削除</button>
                      </>
                    )
                  }
                  
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
