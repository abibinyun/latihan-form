import React from "react";
import { removeContact, getListContacts } from "../service/localstorage";
import { useNavigate } from "react-router-dom";

export const ContactItem = ({ contact, setContacts }) => {
  const { id, name, email, phone, subject, category, message } = contact;
  const navigate = useNavigate();

  const deleteContact = () => {
    removeContact(id);
    setContacts(getListContacts());
  };

  return (
    <tr className="table-primasry">
      <th>{name}</th>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{subject}</td>
      <td>{category}</td>
      <td>{message}</td>
      <td>
        <div className="d-flex gap-3">
          <span type="button" className="badge bg-success" onClick={() => navigate(`/edit-contact/${id}`)}>
            Edit
          </span>
          <span type="button" className="badge bg-danger" onClick={() => deleteContact()}>
            Delete
          </span>
        </div>
      </td>
    </tr>
  );
};
