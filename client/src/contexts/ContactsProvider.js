import React, { useContext, useState, useCallback, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";

const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useLocalStorage("contacts", []);

    const [list, setList] = useState([]);

    const socket = useSocket()

    const addList = useCallback(({ userList }) => {
      setList(userList);
      }, [setList])

    useEffect(() => {
      if (socket == null) return
      socket.on('broadcast', addList)

      return () => socket.off('broadcast')
    }, [socket, addList])

    function createContact(id, name) {
        setContacts((prevContacts) => {
            return [...prevContacts, { id, name }];
        });
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact,list }}>
            {children}
        </ContactsContext.Provider>
    );
}
