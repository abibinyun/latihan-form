import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, getEmployeeById } from "../service/localstorage";
import { useForm } from "./../hooks/useForm";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { editEmployee } from "./../service/localstorage";

export const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setshowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      const employee = getEmployeeById(id);
      setForm(employee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? editEmployee(id, inputValues) : addEmployee({ id: uuid(), ...inputValues });
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
        <h1 className="text-center">{id ? "Edit" : "Add new"} Employee</h1>
        <div />
      </div>

      <div className="card border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Name
            </label>
            <input name="name" type="text" value={inputValues.name} onChange={handleInputChange} className="form-control" id="inputValid" />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Email
            </label>
            <input name="email" type="email" value={inputValues.email} onChange={handleInputChange} className="form-control" id="inputValid" />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Phone
            </label>
            <input name="phone" type="text" value={inputValues.phone} onChange={handleInputChange} className="form-control" id="inputValid" />
          </div>

          <div className="form-group">
            <label htmlFor="inputValid" className="form-label mt-4">
              Position
            </label>
            <select name="position" type="text" value={inputValues.position} onChange={handleInputChange} className="form-select" id="inputValid">
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="Sales Support">Sales Support</option>
              <option value="Tehnical">Tehnical</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="inputValid">
              Message
            </label>
            {/* <input type="text" name="message" value={inputValues.message} onChange={handleInputChange} className="form-control" id="inputValid" /> */}
            <textarea type="text" className="form-control" id="inputValid" name="message" value={inputValues.message} onChange={handleInputChange} rows="3" placeholder="type here" />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-primary btn-block">
              {id ? "Edit" : "Add"} Employee
            </button>
          </div>
        </form>
      </div>

      {showAlert && (
        <div className="px-5">
          <div className="alert alert-success">
            <strong>Well done!</strong> {id ? "edit" : "added a new"} Employee.
          </div>
        </div>
      )}
    </div>
  );
};