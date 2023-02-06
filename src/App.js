import { ContactList } from "./components";
import { Navbar } from "./components";
import { ContactForm } from "./components";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/create-contact" element={<ContactForm />} />
          <Route path="/edit-contact/:id" element={<ContactForm />} />
        </Routes>
      </div>
    </div>
  );
};
