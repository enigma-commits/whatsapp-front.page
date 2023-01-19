import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts,list } = useContacts()
  console.log(list);
  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
          {list.includes(contact.id)?"    Online":"      Offline"}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
