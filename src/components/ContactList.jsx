import { ContactItem } from "./ContactItem";
import { useEffect, useState } from "react";
import { getListContacts } from "../service/localstorage";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(getListContacts());
  }, []);

  return (
    <div>
      <h1 className="my-5 text-center">Manage Contact</h1>

      {contacts.length > 0 ? (
        <div className="card bg-secondary p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Subject</th>
                <th scope="col">Category</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <ContactItem contact={contact} key={contact.id} setContacts={setContacts} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-center">No Contact</h3>
      )}
    </div>
  );
};
