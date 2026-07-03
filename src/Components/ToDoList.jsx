import React, { useState, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../App";

const ToDoList = () => {
  let { user } = useContext(UserContext);

  let [items, setItem] = useState([
    { id: 1, itemName: "HTML", checked: true },
    { id: 2, itemName: "Css", checked: true },
    { id: 3, itemName: "Javascript", checked: false },
    { id: 4, itemName: "React Js", checked: false },
  ]);

  let [isEdit, setEdit] = useState(false);
  let [newListItem, setNewListItem] = useState("");
  let [currentId, setCurrentId] = useState(null);

  //handel list update or add new item
  let handleAddSave = () => {
    if (isEdit) {
      let updateItem = items.map((item) => {
        return item.id === currentId
          ? { ...item, itemName: newListItem }
          : item;
      });
      setItem(updateItem);
      setNewListItem("");
      setEdit(false);
      setCurrentId(null);
    } else {
      setItem([
        ...items,
        { id: items.length + 1, itemName: newListItem, checked: false },
      ]);
      setNewListItem("");
    }
  };

  /* Handle edit button click to change button add/save text */
  let handleEdit = (id) => {
    setEdit(true);
    let findItem = items.find((item) => {
      return item.id === id;
    });
    setNewListItem(findItem.itemName);
    setCurrentId(id);
  };

  // Handle delete function
  function handleDelete(id) {
    let filterListItems = items
      .filter((item, index) => {
        return item.id !== id;
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItem(filterListItems);
  }

  /* Handle list checking */
  let handleChecked = (id) => {
    let newList = items.map((item) => {
      return id === item.id ? { ...item, checked: !item.checked } : item;
    });
    setItem(newList);
  };

  return (
    <div className="content">
          <div className="container">
      <header>
        <h1>To Do List - {user.name}</h1>
      </header>

      {/* Add or update list */}
      <div>
        <input
          type="text"
          id="inputBox"
          value={newListItem}
          placeholder="Add new item..."
          onChange={(e) => {
            setNewListItem(e.target.value);
          }}
        />
        <button onClick={handleAddSave} id="addSaveBtn">
          {isEdit ? "Save" : "Add"}
        </button>
      </div>
      {/*  Display List */}
      <div id="lists">
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  id="checkBox"
                  checked={item.checked}
                  onChange={() => {
                    handleChecked(item.id);
                  }}
                />
                <label>{item.itemName}</label>
                <FaEdit
                  role="button"
                  tabIndex={0}
                  id="btnEdit"
                  onClick={() => handleEdit(item.id)}
                />
                <MdDelete
                  role="button"
                  tabIndex={0}
                  id="btnDelete"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <footer>
        <h2>Footer</h2>
        <UserContext.Consumer>
          {({ user }) => {
            return <h3>{user.email}</h3>;
          }}
        </UserContext.Consumer>
      </footer>
    </div>
    </div>
  );
};

export default ToDoList;
