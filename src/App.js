import "./App.css";
import { Fragment } from "react";
import { UserInfos } from "./Component/UserInfos";
import { UserList } from "./Component/UserList";

function App() {
  return (
    <Fragment>
      <div className="Identifier-head">
        <h3>User Identifer</h3>
        <ul>
          {UserList.map((info) => (
            <li key={info.id}>
              <div
                className="identifier"
                style={{ backgroundColor: info.userStyle.bgColor }}
              />
              <span>{info.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <table className="container">
        <thead>
          <tr className="container-head">
            <th className="item">Name</th>
            <th className="item">Username</th>
            <th className="item">Email Address</th>
            <th className="item">Phone</th>
            <th className="item">website</th>
          </tr>
        </thead>
        <tbody>{UserList && <UserInfos userInfo={UserList} />}</tbody>
      </table>
    </Fragment>
  );
}

export default App;
