import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  function handleNewMessage(newMessage) {
    const message = {
      id: messageList.length + Math.random() * 100,
      text: newMessage,
      user: "MorenaNobre",
    };

    setMessageList([message, ...messageList]);
    setMessage("");
  }

  function handleDeleteMessage(event) {
    const messageId = Number(event.target.dataset.id);
    const messageListFiltered = messageList.filter((messageFiltered) => {
      return messageFiltered.id != messageId;
    });

    setMessageList(messageListFiltered);
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage:
          "url(https://a-static.besthdwallpaper.com/multicolored-doodle-pattern-wallpaper-3440x1440-82651_15.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            messageList={messageList}
            handleDeleteMessage={handleDeleteMessage}
          />
          {/* Lista de mensagens:
                    <ul>
                        {messageList.map((messageItem) => {
                            return (
                                <li key={messageItem.id}>
                                    {messageItem.user}: {messageItem.text}
                                </li>
                            )
                        })}
                    </ul> */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={() => {handleNewMessage(message)}}
              label="Enviar"
              fullWidth
              styleSheet={{
                maxWidth: "100px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary.purple,
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary["purple-light"],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  const handleDeleteMessage = props.handleDeleteMessage;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messageList.map((messageItem) => {
        return (
          <Text
            key={messageItem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              wordBreak: "break-word",
              hover: {
                backgroundColor: "rgba( 0, 0, 0, 0.21 )",
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${messageItem.user}.png`}
              />
              <Box
                styleSheet={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Text tag="strong">{messageItem.user}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginTop: "5px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Text
                onClick={handleDeleteMessage}
                styleSheet={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  color: "#FFF",
                  backgroundColor: "rgba(0,0,0,.5)",
                  width: "20px",
                  height: "20px",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                tag="span"
                data-id={messageItem.id}
              >
                X
              </Text>
            </Box>
            {messageItem.text}
          </Text>
        );
      })}
    </Box>
  );
}
