import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts,list } = useContacts()
  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id} style={{backgroundColor:"#E3F6FF"}}>
          {contact.name}
          {list.includes(contact.id)?"    Online":"      Offline"}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
