import React, { useCallback, useState, useEffect } from 'react';
import axios from '../shared/axios';
import { useAuth } from '../shared/hooks/use-auth';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const ContactController: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.get(`/contacts/${user.id}`);
        setContacts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  }, [user]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.post(`/contacts/${user.id}`, newContact);
        setContacts([...contacts, response.data]);
        setNewContact({ first_name: '', last_name: '', email: '', phone_number: '' });
      }
    } catch (error) {
      console.error('Failed to add contact', error);
    }
  }, [contacts, newContact]);

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
          placeholder="First Name"
          value={newContact.first_name}
          onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
          className="mr-2 rounded border p-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newContact.last_name}
          onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
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
          placeholder="Phone Number"
          value={newContact.phone_number}
          onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
          className="mr-2 rounded border p-2"
        />
        <button onClick={addContact} className="rounded bg-blue-500 p-2 text-white">
          Add Contact
        </button>
      </div>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2">
            {editingContact && editingContact.id === contact.id ? (
              <>
                <input
                  type="text"
                  value={editingContact.first_name}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      first_name: e.target.value
                    })
                  }
                  className="mr-2 rounded border p-2"
                />
                <input
                  type="text"
                  value={editingContact.last_name}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      last_name: e.target.value
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
                  value={editingContact.phone_number}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      phone_number: e.target.value
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
                <span className="mr-4">
                  {contact.first_name} {contact.last_name}
                </span>
                <span className="mr-4">{contact.email}</span>
                <span className="mr-4">{contact.phone_number}</span>
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
