import { useState } from 'react'

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTargetId, setEditTargetId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const onChangeTodoInput = (e) => {
    setTodoInput(e.target.value)
  }

  const onChangeEditInput = (e) => {
    setEditInput(e.target.value)
  }

  const onClickAddTodo = () => {
    const newId = crypto.randomUUID()
    const newTodo = {id: newId, todo: todoInput}
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setTodoInput("")
  }

  const onCLickRenameTodo = (todo) => {
    setEditTargetId(null)
    const newTodos = todos.map((t) => {
      return t.id === todo.id ? {...t, todo: editInput} : t
    })
    setTodos(newTodos)
  }

  const handleEditToggle = (todo) => {
    // 編集キャンセル時に以下が走る
    if (editTargetId === todo.id){
      setEditTargetId(null)
      return;
    }
    setEditTargetId(todo.id);
    setEditInput(todo.todo);
  }

  const onClickDeleteTodo = (deleteTargetTodo) => {
    if (!confirm(`${deleteTargetTodo.todo}を削除しますか？`)) return;

    const newTodos = todos.filter((t) => {
      return t.id !== deleteTargetTodo.id
    })
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
            todos.map((todo) => (
              <li key={todo.id}>
                <div className='todo-item'>
                  {
                    editTargetId  === todo.id ? (
                      <>
                        <input type="text" value={editInput} onChange={onChangeEditInput}/>
                        <button onClick={() => onCLickRenameTodo(todo)}>保存</button>
                        <button onClick={() => handleEditToggle(todo)}>キャンセル</button>
                      </>
                    ):
                    (
                      <>
                        <p>{todo.todo}</p>
                        <button onClick={() => handleEditToggle(todo)}>編集</button>
                        <button onClick={() => onClickDeleteTodo(todo)}>削除</button>
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
