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

  const addContact = async () => {
    try {
      const response = await axios.post('/api/contacts', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ first_name: '', last_name: '', email: '', phone_number: '' });
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
    <div className="rounded-lg bg-gray-100 p-6">
      <h2 className="mb-4 text-xl font-bold">Contact List</h2>

      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="First Name"
          value={newContact.first_name}
          onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newContact.last_name}
          onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.phone_number}
          onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
        />
        <button
          onClick={addContact}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Add Contact
        </button>
      </div>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2 flex items-center space-x-2">
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
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
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
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
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
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
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
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
                />
                <button
                  onClick={() => updateContact(contact.id)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="w-1/4">{contact.first_name}</span>
                <span className="w-1/4">{contact.last_name}</span>
                <span className="w-1/4">{contact.email}</span>
                <span className="w-1/4">{contact.phone_number}</span>
                <button
                  onClick={() => handleEditClick(contact)}
                  className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
                  Edit
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
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
{}
