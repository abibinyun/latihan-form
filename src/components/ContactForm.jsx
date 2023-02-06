import { useNavigate, useParams } from "react-router-dom";
import { addContact, getContactById, editContact } from "../service/localstorage";
import { useForm } from "../hooks/useForm"
import uuid from "react-uuid";
import { useState, useEffect } from "react";

export const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      const contact = getContactById(id);
      setForm(contact);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    id ? editContact(id, inputValues) : addContact({ id: uuid(), ...inputValues });
    resetForm();
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);
  };  

  return (
    <div>
      <div className="d-flex my-5 justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          Back
        </button>
        <h1 className="text-center">{id ? "Edit" : "Add new"} Contact</h1>
        <div />
      </div>

      <div className="card border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Name
            </label>
            <input  name="name" type="text" value={inputValues.name} onChange={handleInputChange} className="form-control" id="inputValid"  required />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Email
            </label>
            <input pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$" name="email" type="email" value={inputValues.email} onChange={handleInputChange} className="form-control" id="inputValid" required />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Phone
            </label>
            <input pattern="^(\+62|62|0)8[1-9][0-9]{6,9}$" name="phone" type="text" value={inputValues.phone} onChange={handleInputChange} className="form-control" id="inputValid" required />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Subject
            </label>
            <input  name="subject" type="text" value={inputValues.subject} onChange={handleInputChange} className="form-control" id="inputValid"  required />
          </div>

          <div className="form-group">
            <label htmlFor="inputValid" className="form-label mt-4">
              Category
            </label>
            <select name="category" type="text" value={inputValues.category} onChange={handleInputChange} className="form-select" id="inputValid" required>
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Tehnical">Tehnical</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Message
            </label>
            <textarea type="text" className="form-control" id="inputValid" name="message" value={inputValues.message} onChange={handleInputChange} rows="3" placeholder="type here" required   />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-primary btn-block">
              {id ? "Edit" : "Add"} Contact
            </button>
          </div>
        </form>
      </div>

      {showAlert && (
        <div className="px-5">
          <div className="alert alert-success">
            <strong>Well done!</strong> {id ? "edit" : "added a new"} Contact.
          </div>
        </div>
      )}
    </div>
  );
};
