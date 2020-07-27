import React, { Fragment, useState } from "react";
import { Button } from "antd";
import LoginClient from "./LoginClient";
import Chat from "./Chat";
import "./index.css";
import "antd/dist/antd.css";
const App = () => {
  //state
  const [typeUser, setTypeUser] = useState("");
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");

  return (
    <Fragment>
      {typeUser !== "" ? (
        typeUser === "client" ? (
          <LoginClient
            typeUser={typeUser}
            setLogin={setLogin}
            login={login}
            setUser={setUser}
            user={user}
          />
        ) : (
          <Chat user="Techie" userType={typeUser} />
        )
      ) : (
        <div>
          <Button type="primary" onClick={() => setTypeUser("client")}>
            Eres Cliente
          </Button>

          <Button type="secondary" onClick={() => setTypeUser("admin")}>
            Eres Techie
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default App;
