import React, { useCallback, useState, useEffect } from 'react';
import axios from '../shared/axios';
import { toast } from 'react-toastify';
import useSocket from '../shared/hooks/use-socket';
import { useAuth } from '../shared/hooks/use-auth';

import { Contact, AuditEntry } from '../types';

const ContactController: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const auth = useAuth();

  const socket = useSocket(auth.user ? auth.user.id : ''); // Use the custom hook to get the socket instance based on the user.id
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [history, setHistory] = useState<AuditEntry[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Individual loading states for different operations
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (socket === null) return;
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('contact_updated', (updatedContact: Contact) => {
      console.log('Contact updated:', updatedContact); // Add this line to debug
      setContacts((prevContacts) =>
        prevContacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
      );
      toast.info(`Contact updated: ${updatedContact.first_name} ${updatedContact.last_name}`);
    });

    socket.on('contact_deleted', (deletedContact: Contact) => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== deletedContact.id)
      );
      toast.error(`Contact deleted: ${deletedContact.first_name} ${deletedContact.last_name}`);
    });

    return () => {
      console.log('Disconnecting from server');
      socket.disconnect();
    };
  }, [socket]);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get(`/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const fetchHistory = async (contactId: string) => {
    try {
      const response = await axios.get(`/contacts/${contactId}/history`);
      setHistory(response.data);
      setSelectedContact(contacts.find((c) => c.id === contactId) || null);
      setShowHistory(true);
    } catch (error) {
      console.error('Failed to fetch contact history', error);
    }
  };

  const addContact = async () => {
    setIsAdding(true);
    try {
      const response = await axios.post(`/contacts`, newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ first_name: '', last_name: '', email: '', phone_number: '' });
      setError(null);
    } catch (error) {
      console.error('Failed to add contact', error);
      setError('Failed to add contact. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const updateContact = async (id: string) => {
    if (!editingContact) return;

    setIsUpdating(true);
    try {
      const response = await axios.put(`/contacts/${id}`, editingContact);
      setContacts(contacts.map((contact) => (contact.id === id ? response.data : contact)));
      setEditingContact(null);
      setError(null);
    } catch (error) {
      console.error('Failed to update contact', error);
      setError('Failed to update contact. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteContact = async (id: string) => {
    setIsDeleting(true);
    try {
      await axios.delete(`/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
      setError(null);
    } catch (error) {
      console.error('Failed to delete contact', error);
      setError('Failed to delete contact. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setError(null);
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
          disabled={isAdding}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newContact.last_name}
          onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
          disabled={isAdding}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
          disabled={isAdding}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.phone_number}
          onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
          className="w-1/4 rounded-lg border border-gray-300 p-2"
          disabled={isAdding}
        />
        <button
          onClick={addContact}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={isAdding}>
          {isAdding ? (
            <span className="loader">Loading...</span> // Use a spinner icon or loader component here
          ) : (
            'Add Contact'
          )}
        </button>
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2 flex items-center space-x-2">
            {editingContact && editingContact.id === contact.id ? (
              <>
                <input
                  type="text"
                  value={editingContact.first_name}
                  onChange={(e) =>
                    setEditingContact({ ...editingContact, first_name: e.target.value })
                  }
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
                  disabled={isUpdating}
                />
                <input
                  type="text"
                  value={editingContact.last_name}
                  onChange={(e) =>
                    setEditingContact({ ...editingContact, last_name: e.target.value })
                  }
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
                  disabled={isUpdating}
                />
                <input
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
                  disabled={isUpdating}
                />
                <input
                  type="text"
                  value={editingContact.phone_number}
                  onChange={(e) =>
                    setEditingContact({ ...editingContact, phone_number: e.target.value })
                  }
                  className="w-1/4 rounded-lg border border-gray-300 p-2"
                  disabled={isUpdating}
                />
                <button
                  onClick={() => updateContact(contact.id)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  disabled={isUpdating}>
                  {isUpdating ? (
                    <span className="loader">Loading...</span> // Use a spinner icon or loader component here
                  ) : (
                    'Save'
                  )}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  disabled={isUpdating}>
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
                  className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  disabled={isAdding || isDeleting} // Disable other actions during adding or deleting
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  disabled={isAdding || isUpdating} // Disable other actions during adding or updating
                >
                  {isDeleting ? (
                    <span className="loader">Deleting...</span> // Use a spinner icon or loader component here
                  ) : (
                    'Delete'
                  )}
                </button>
                <button
                  onClick={() => fetchHistory(contact.id)}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  disabled={isAdding || isUpdating || isDeleting} // Disable history button during other operations
                >
                  View History
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {showHistory && selectedContact && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-bold">
            Edit History for {selectedContact.first_name} {selectedContact.last_name}
          </h3>
          <table className="min-w-full border border-gray-200 bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2">Field</th>
                <th className="border px-4 py-2">Old Value</th>
                <th className="border px-4 py-2">New Value</th>
                <th className="border px-4 py-2">Changed At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry.id}>
                  <td className="border px-4 py-2">{entry.field}</td>
                  <td className="border px-4 py-2">{entry.old_value || 'N/A'}</td>
                  <td className="border px-4 py-2">{entry.new_value || 'N/A'}</td>
                  <td className="border px-4 py-2">
                    {new Date(entry.changed_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setShowHistory(false)}
            className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Close History
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactController;
