import React, { Fragment, useState, useEffect } from "react";
import { Card, Avatar, Input, Typography } from "antd";
import { w3cwebsocket as websocketClient } from "websocket";
import "./index.css";

import "antd/dist/antd.css";
const uuid = require("uuid");

//creo el cliente
//const connClient = new websocketClient("ws://127.0.0.1:5555");
const connClient = new websocketClient("ws://serverwslenin.herokuapp.com");

//variables para los estilos propias de la libreria antd
const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const Chat = ({ user, userType }) => {
  //state
  const [valueMessageToSend, setToSend] = useState("");
  const [messages, setMessages] = useState([
    //simulamos un boot de respuesta rapida
    {
      value: "Hola pronto un techie se comunicara contigo",
      user: "Techie",
      userType: "admin",
    },
  ]);
  //hook para llamada a servidor
  useEffect(() => {
    //coneccion con el servidor
    connClient.onopen = () => {
      console.log("conectado");
    };
    //metodo que responde el servidor cuando un cliente hizo una peticion
    connClient.onmessage = (message) => {
      const dataServer = JSON.parse(message.data);
      console.log("server says" + JSON.stringify(dataServer));
      if (dataServer.type === "message") {
        //copiamos los datos del estado anterior al nuevo
        setMessages([
          ...messages,
          {
            value: dataServer.value,
            user: dataServer.user,
            userType: dataServer.userType,
          },
        ]);
      }
    };
  }, [messages]);
  //metodo que invoca al servidor
  const sendMessage = (e) => {
    connClient.send(
      JSON.stringify({
        type: "message",
        value: valueMessageToSend,
        user: user,
        userType: userType,
      })
    );
    //volvemos a setear el valor del input del chat a vacio
    setToSend("");
  };

  return (
    <Fragment>
      <div>
        <div className="titleChat">
          <Text style={styles.titleStyle}>Chatea con Nosotros</Text>
          <br />
          <Text style={styles.titleMinStyle}>#NoTeDetengas</Text>
        </div>
        <div style={styles.chatContainer}>
          {messages.map((message) => (
            <Card
              //es necesario key unico
              key={message.user + message.value + uuid.v4()}
              //dejamos el style aqui x las condiciones
              style={{
                width: 300,
                margin: "16px 4px 0 4px",
                alignSelf: user === message.user ? "flex-end" : "flex-start",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    //dejamos el style aqui x las condiciones
                    style={{
                      color:
                        message.userType === "admin" ? "#ffffff" : "#f56a00",
                      backgroundColor:
                        message.userType === "admin" ? "#000000" : "#fde3cf",
                    }}
                  >
                    {message.user[0].toUpperCase()}
                  </Avatar>
                }
                title={message.user}
                description={message.value}
              />
            </Card>
          ))}
        </div>
        <div className="inputMessage">
          <Search
            placeholder="Escribe tu mensaje ...."
            enterButton="Enviar"
            size="large"
            value={valueMessageToSend}
            onChange={(e) => {
              setToSend(e.target.value);
            }}
            onSearch={sendMessage}
          />
        </div>
      </div>
    </Fragment>
  );
};
const styles = {
  titleStyle: { fontSize: "36px", color: "white" },
  titleMinStyle: { fontSize: "16px", color: "white" },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 50,
  },
};

export default Chat;
