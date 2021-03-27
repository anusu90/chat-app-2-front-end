import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import queryString from "query-string"
import socketIOClient from "socket.io-client"

import "./chat.css"


import TextContainer from '../textcontainer/textcontainer';
import Messages from '../messages/messages';
import InfoBar from '../infobar/infobar';
import Input from '../input/input';

let socket;

const ENDPOINT = process.env.REACT_APP_BACKEND;

export default function Chat({ routeProps: routeProps, ...props }) {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(routeProps.location.search)
        socket = socketIOClient(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('newUser', { name, room }, () => {
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, routeProps.location.search])


    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((messages) => [...messages, msg])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [])


    function sendMessage(e) {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, () => { setMessage("") })
        }

    }



    console.log(message, messages)





    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}