import { useState } from "react";
import "./todo.css";
import { v4 as uuidv4 } from "uuid";

export function Todo() {
  const [todos, setTodos] = useState([]);

  const [error, setError] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [filterState, setFilterState] = useState("ALL");

  const getCompleted = todos.filter(
    (todos) => todos.status == "COMPLETED"
  ).length;
  const completedTodo = todos.length

  const clearCompleted = () => {
    const activetasks = todos.filter((todo) => todo.status !== "COMPLETED");
    setTodos(activetasks);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTaskButton = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      setTodos([
        ...todos,
        { description: inputValue, status: "ACTIVE", id: uuidv4() },
      ]);
      setInputValue("");
    }
  };
  console.log(todos);

  const handleDeleteTodo = (todo) => {
    const newTodos = [...todos];
    newTodos.splice(todo, 1);
    setTodos(newTodos);
  };

  const handleTaskCheckBox = (id) => {
    const tasks = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.status == "ACTIVE") {
          return { ...todo, status: "COMPLETED" };
        } else if (todo.status == "COMPLETED") {
          return { ...todo, status: "ACTIVE" };
        }
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };
  const handleFilterChangeState = (state) => {
    // console.log(state);
    setFilterState(state);
  };
  console.log(filterState);

  return (
    <div className="todo">
      <div className="container">
        <div className="box">
          <div className="todo-text">
            To-Do list
            <div className="input-container">
              {error && <div>please enter</div>}
              <input
                placeholder={"Add task"}
                value={inputValue}
                className="input"
                onChange={handleInputChange}
              />
              <button className="add" onClick={handleAddTaskButton}>
                Add
              </button>
            </div>
            <div className="all">
              <button
                onClick={() => handleFilterChangeState("ALL")}
                style={{ color: filterState === "ALL" ? "blue" : "black" }}
                className="AL"
              >
                ALL
              </button>
              <button
                onClick={() => handleFilterChangeState("ACTIVE")}
                style={{ color: filterState === "ACTIVE" ? "blue" : "black" }}
                className="AL"
              >
                ACTIVE
              </button>
              <button
                onClick={() => handleFilterChangeState("COMPLETED")}
                style={{
                  color: filterState === "COMPLETED" ? "blue" : "black",
                }}
                className="AL"
              >
                COMPLETED
              </button>
            </div>
            <div className="filter-container">
              {todos
                .filter((todo) => {
                  if (filterState === "ACTIVE") {
                    return todo.status === "ACTIVE";
                  } else if (filterState === "COMPLETED") {
                    return todo.status === "COMPLETED";
                  } else {
                    return true;
                  }
                })

                .map((todo) => {
                  return (
                    <div className="enter" key={todo.id}>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <input
                          type="checkbox"
                          checked={todo.status == "COMPLETED"}
                          onChange={() => handleTaskCheckBox(todo.id)}
                        />
                        <p style={{ maxWidth: "200px", overflow: "scroll" }}>
                          {" "}
                          {todo.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteTodo(todo)}
                        className="delete"
                      >
                        
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="task-container">
              <p>
                {getCompleted} of {completedTodo} is completed
              </p>

            <button onClick={clearCompleted} className="clear">Clear Completed </button>
            </div>
            <p className="p">No tasks yet. Add one above!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Todo
