import React, { useState, useEffect, Fragment } from "react";
import "../App.css";
import { fieldList } from "./UserList";
import { UserListItem } from "./UserListItem";

export const UserInfos = (props) => {
  const [userInfo, setUsers] = useState(props.userInfo);
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * userInfo.length);
      setRowIndex(index);
      const fieldIndex = Math.floor(Math.random() * fieldList.length);
      setColIndex(fieldIndex);
      const userField = fieldList[fieldIndex];
      const updatedUsers = [...userInfo];

      const updateduserItem = updatedUsers[index];
      updatedUsers[index] = {
        ...updatedUsers[index],
        [userField]: updateduserItem[userField] + "ABC",
      };
      setUsers(updatedUsers);
    }, 2000);

    return () => clearInterval(interval);
  }, [userInfo]);

  const onUpdatedData = (updatedInfo) => {
    setUsers(updatedInfo);
  };
  return (
    <Fragment>
      {userInfo.map((user, index) => (
        <tr key={index} className="container-body">
          <UserListItem
            key={user.id}
            user={user}
            rowIndex={rowIndex}
            colIndex={colIndex}
            userInfo={userInfo}
            onUpdatedData={onUpdatedData}
          />
        </tr>
      ))}
    </Fragment>
  );
};
