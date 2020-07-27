import React, { Fragment } from "react";
import { Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import Chat from "./Chat";
import "./index.css";
import "antd/dist/antd.css";
//variables para los estilos propias de la libreria antd
const { Search } = Input;

const LoginClient = ({ typeUser, setLogin, login, setUser, user }) => {
  //metodo que simula la entrada de la sala de un cliente
  const entryRoom = (value) => {
    //validamos el ingreso al chat
    if (value === "") {
      setLogin(false);
      setUser("");
    } else {
      setLogin(true);
      setUser(value);
    }
  };
  return (
    <Fragment>
      {login === false ? (
        <div className="login">
          <img src="https://www.handytec.mobi/images/logos/handytec_logo_index.svg" />
          <Search
            style={styles.componenteLogin}
            size="large"
            placeholder="Hola, por favor ingresa tu nombre"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Es para nosotros importante saber tu nombre para en el caso de que se pierda la comunicacion poder comunicarnos contigo">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
            enterButton="Chatea con un Handytech"
            onSearch={(value) => entryRoom(value)}
          />
        </div>
      ) : (
        <Chat user={user} userType={typeUser} />
      )}
    </Fragment>
  );
};
const styles = {
  componenteLogin: { padding: "5% 10%" },
};
export default LoginClient;
