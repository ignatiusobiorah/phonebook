import "./index.scss";
import afrodroid from "./img/afrodroid.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";

const App = () => {
  //useStates
  const [view, setView] = useState(true);
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const [input, setInput] = useState({ name: "", phone: "" });
  const [contacts, setContacts] = useState([]);

  //Function to handle submit
  function handleSubmit(e) {
    e.preventDefault();

    if (input.name == "" || input.phone == "") return;

    const newContact = [{ ...input, id: contacts.length + 1 }, ...contacts];

    setContacts(newContact);
    setInput({
      name: "",
      phone: "",
    });
    setView(!view);
  }

  //Function to delete contact
  const deleteContact = (e) => {
    const retrivedId = Number(e.target.getAttribute("id"));
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== retrivedId
    );

    // console.log(retrivedId);
    // console.log(filteredContacts);
    setContacts(filteredContacts);
  };

  //Function to toggle dark mode
  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
  };

  return (
    <div className="container">
      <nav>
        <a href="/">
          <img src={afrodroid} alt="logo" />
        </a>
        <i onClick={toggleDarkMode} className="fa-solid fa-moon"></i>
      </nav>
      <div className="main">
        <form>
          <input type="search" placeholder="Search contacts" />
        </form>
        <div className="list">
          <h2>Contact List</h2>
          <button onClick={() => setView(!view)}>
            {view ? "Add Contact" : "View Contact"}
          </button>
        </div>
        {view ? (
          <div className="table">
            <table>
              {contacts.length > 0 ? (
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>PHONE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
              ) : (
                <thead>
                  <tr>
                    <th>No contacts found</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <i className="fa-regular fa-pen-to-square"></i>{" "}
                      <i
                        className="fa-solid fa-trash"
                        id={contact.id}
                        onClick={deleteContact}
                      ></i>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="newContact">
            <h2>Add Contact</h2>
            <form className="addContact">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                placeholder="Full name"
                value={input.name}
                onChange={(e) =>
                  setInput({ name: e.target.value, phone: input.phone })
                }
              />
              <label htmlFor="phone">PHONE NUMBER:</label>
              <input
                type="number"
                placeholder="phoneNumber"
                value={input.phone}
                onChange={(e) =>
                  setInput({ name: input.name, phone: e.target.value })
                }
              />
              <button className="submit" onClick={handleSubmit}>
                submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

//Haven't added functionality to some places yet
//-- search bar
//-- edit icon
