export const getListContacts = () => {
  if (!localStorage["contacts"]) {
    localStorage["contacts"] = "[]";
  }

  let contacts = localStorage["contacts"];
  contacts = JSON.parse(contacts);
  return contacts;
};

export const addContact = (contact) => {
  const contacts = getListContacts();
  contacts.push(contact);
  localStorage["contacts"] = JSON.stringify(contacts);
};

export const removeContact = (id) => {
  let contacts = getListContacts();
  contacts = contacts.filter((contact) => contact.id !== id);
  localStorage["contacts"] = JSON.stringify(contacts);
};

export const getContactById = (id) => {
  const contacts = getListContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
};

export const editContact = (id, newContact) => {
  let contacts = getListContacts();
  contacts = contacts.filter((contact) => contact.id !== id);
  contacts.push(newContact);
  localStorage["contacts"] = JSON.stringify(contacts);
};