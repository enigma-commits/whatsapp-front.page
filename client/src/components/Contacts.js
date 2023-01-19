import React,{useEffect, useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts,list } = useContacts()
  const [status, setStatus] = useState([]);
  useEffect(()=>{
    const newStatus = {}
    list.forEach((id)=>{
      newStatus[id]=true;
    })
    setStatus(list)
  },[list,setStatus]);
  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
          {status.includes(contact.id)?"    Online":"      Offline"}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
