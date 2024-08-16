import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactControllerProps {
  isLoggedIn: boolean;
}
const ContactController: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: ''
  });

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      // setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  };

  const addContact = async () => {
    try {
      const response = await axios.post('/api/contacts', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Failed to add contact', error);
    }
  };

  const updateContact = async (id: string) => {
    if (!editingContact) return;

    try {
      const response = await axios.put(`/api/contacts/${id}`, editingContact);
      setContacts(contacts.map((contact) => (contact.id === id ? response.data : contact)));
      setEditingContact(null);
    } catch (error) {
      console.error('Failed to update contact', error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Failed to delete contact', error);
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Contact List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          className="mr-2 rounded border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          className="mr-2 rounded border p-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          className="mr-2 rounded border p-2"
        />
        <button onClick={addContact} className="rounded bg-blue-500 p-2 text-white">
          Add Contact
        </button>
      </div>

      <ul>
        {!contacts
          ? null
          : contacts.map((contact) => (
              <li key={contact.id} className="mb-2">
                {editingContact && editingContact.id === contact.id ? (
                  <>
                    <input
                      type="text"
                      value={editingContact.name}
                      onChange={(e) =>
                        setEditingContact({
                          ...editingContact,
                          name: e.target.value
                        })
                      }
                      className="mr-2 rounded border p-2"
                    />
                    <input
                      type="email"
                      value={editingContact.email}
                      onChange={(e) =>
                        setEditingContact({
                          ...editingContact,
                          email: e.target.value
                        })
                      }
                      className="mr-2 rounded border p-2"
                    />
                    <input
                      type="text"
                      value={editingContact.phone}
                      onChange={(e) =>
                        setEditingContact({
                          ...editingContact,
                          phone: e.target.value
                        })
                      }
                      className="mr-2 rounded border p-2"
                    />
                    <button
                      onClick={() => updateContact(contact.id)}
                      className="rounded bg-green-500 p-2 text-white">
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="ml-2 rounded bg-red-500 p-2 text-white">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="mr-4">{contact.name}</span>
                    <span className="mr-4">{contact.email}</span>
                    <span className="mr-4">{contact.phone}</span>
                    <button
                      onClick={() => handleEditClick(contact)}
                      className="rounded bg-yellow-500 p-2 text-white">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="ml-2 rounded bg-red-500 p-2 text-white">
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ContactController;
