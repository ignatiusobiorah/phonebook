import './index.scss';
import afrodroid from './img/afrodroid.jpg';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from 'react';



const App = () => {

  //useStates
  const [view, setView] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  //Function to handle submit
  function handleSubmit (e) {
    e.preventDefault();

    const newContact = [
      {
        nameInput: name,
        phoneInput: phone,
        id: contacts.length + 1
      }, ...contacts
    ]
    setContacts(newContact);
    //  console.log(name);
    // console.log(phone);
    setName('');
    setPhone('');
    setView(!view);
  }

  //Function to delete contact
  const deleteContact = (e) => {
    const retrivedId = Number (e.target.getAttribute("id"));
   const filteredContacts = contacts.filter(contact => 
      contact.id !== retrivedId
   )
    setContacts(filteredContacts);
    // console.log(retrivedId);
    // console.log(filteredContacts);
  }

  //Function to toggle dark mode 
  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
  };

 


  return (
    <div className="container">
      <nav>
        <a href="/"><img src={afrodroid} alt="logo" /></a>
        <i onClick={toggleDarkMode} className="fa-solid fa-moon"></i>
      </nav>
      <div className='main'>
        <form>
          <input type="search" placeholder='Search contacts' />
        </form>
        <div className='list'>
          <h2>Contact List</h2>
          <button onClick={ () => setView(!view)}>{view ? "Add Contact" : "View Contact"}
          </button>
        </div>
        {view ?  <div className='table'>
          <table>
            {contacts.length > 0 ? 
            <thead>
            <tr>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </tr>
          </thead> : <h2>No contacts found</h2>}
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                <td>{contact.nameInput}</td>
                <td>{contact.phoneInput}</td>
                <td><i className="fa-regular fa-pen-to-square" id={contact.id}></i> <i className="fa-solid fa-trash" id={contact.id} onClick={deleteContact}></i> </td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div> : 
          <div className='newContact'>
          <h2>Add Contact</h2>
            <form className='addContact'>
            <label htmlFor="name">NAME</label>
            <input type="text" placeholder='Full name' value={name} onChange = {(e) => setName(e.target.value) } />
            <label htmlFor="phone">PHONE NUMBER:</label>
            <input type="number" placeholder='phoneNumber' value={phone} onChange = {(e) => setPhone(e.target.value)} />
            <button className='submit' onClick={handleSubmit}> submit</button>
          </form>      
        </div>}
     
        
      </div>
    </div>
  );
};

export default App;

//Still yet to write code to search contacts
