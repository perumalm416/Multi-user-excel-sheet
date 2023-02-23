import { Fragment, useEffect, useState } from "react";
import { columnBusyMgs } from "./Common";
import "./UserList.css";

export const UserListItem = (props) => {
  const { user, rowIndex, colIndex, userInfo, onUpdatedData } = props;
  const [editInfo, setEditInfo] = useState({id: null,field: null,value: null,});

  //Edit Field handler

  const onEditHandler = (columnInprogress,fieldName) => {
    if (columnInprogress) alert(columnBusyMgs);
    else setEditInfo({ id: user.id, field: fieldName, value: user.name });
  };

  //update input to original list

  const onUpdateEditInfoHandler = (editedId, editedField, editedValue) => {
    const updatedInfo = userInfo.map((rowInfo) => {
      if (editedId === rowInfo.id) {
        return { ...rowInfo, [editedField]: editedValue };
      } else {
        return rowInfo;
      }
    });
    onUpdatedData(updatedInfo);
    setEditInfo(() => {
      return { id: editedId, field: editedField, value: editedValue };
    });
  };

  // refresh the input field

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditInfo(() => {
        return { id: null, field: null, value: null };
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [editInfo]);

  // dynamic row and static column
  const column1 = `${rowIndex}${colIndex}` === `${user.id}0`;
  const column2 = `${rowIndex}${colIndex}` === `${user.id}1`;
  const column3 = `${rowIndex}${colIndex}` === `${user.id}2`;
  const column4 = `${rowIndex}${colIndex}` === `${user.id}3`;
  const column5 = `${rowIndex}${colIndex}` === `${user.id}4`;

  return (
    <Fragment>
      <td
        id="1"
        className="item"
        onClick={() => onEditHandler(column1,"name")}
        style={{ border: column1 ? user.userStyle.border : "" }}
      >
        {editInfo.id === user.id && editInfo.field === "name" ? (
          <input
            type="text"
            placeholder="enter your name"
            onChange={(e) =>
              setEditInfo((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            onBlur={() =>
              onUpdateEditInfoHandler(user.id, "name", editInfo.value)
            }
          />
        ) : (
          user.name
        )}
      </td>
      <td
        id="2"
        className="item"
        onClick={() => onEditHandler(column2,"username")}
        style={{ border: column2 ? user.userStyle.border : "" }}
      >
        {editInfo.id === user.id && editInfo.field === "username" ? (
          <input
            type="text"
            placeholder="enter your username"
            onChange={(e) =>
              setEditInfo((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            onBlur={() =>
              onUpdateEditInfoHandler(user.id, "username", editInfo.value)
            }
          />
        ) : (
          user.username
        )}
      </td>
      <td
        id="3"
        className="item"
        onClick={() => onEditHandler(column3,"email")}
        style={{ border: column3 ? user.userStyle.border : "" }}
      >
        {editInfo.id === user.id && editInfo.field === "email" ? (
          <input
            type="email"
            placeholder="abc@gamil.com"
            onChange={(e) =>
              setEditInfo((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            onBlur={() =>
              onUpdateEditInfoHandler(user.id, "email", editInfo.value)
            }
          />
        ) : (
          user.email
        )}
      </td>
      <td
        id="4"
        className="item"
        onClick={() => onEditHandler(column4,"phone")}
        style={{ border: column4 ? user.userStyle.border : "" }}
      >
        {editInfo.id === user.id && editInfo.field === "phone" ? (
          <input
            type="tel"
            placeholder="999-999-9999"
            onChange={(e) =>
              setEditInfo((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            onBlur={() =>
              onUpdateEditInfoHandler(user.id, "phone", editInfo.value)
            }
          />
        ) : (
          user.phone
        )}
      </td>
      <td
        id="5"
        className="item"
        onClick={() => onEditHandler(column5,"website")}
        style={{ border: column5 ? user.userStyle.border : "" }}
      >
        {editInfo.id === user.id && editInfo.field === "website" ? (
          <input
            type="text"
            placeholder="website details"
            onChange={(e) =>
              setEditInfo((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            onBlur={() =>
              onUpdateEditInfoHandler(user.id, "website", editInfo.value)
            }
          />
        ) : (
          user.website
        )}
      </td>
    </Fragment>
  );
};
