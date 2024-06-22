import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Onboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = [];
        usersSnapshot.forEach((doc) => {
          usersData.push(doc.data().email);
        });
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users from Firestore:", error);
      }
    };

    const fetchEmailData = async () => {
      try {
        const emailsCollection = collection(firestore, "emails");
        const emailsSnapshot = await getDocs(emailsCollection);
        const emailsData = [];
        emailsSnapshot.forEach((doc) => {
          emailsData.push(doc.data());
        });
        setEmails(emailsData);
      } catch (error) {
        console.error("Error fetching emails from Firestore:", error);
      }
    };

    fetchUserData();
    fetchEmailData();
  }, []);

  const sendEmail = async () => {
    if (selectedEmail && selectedUser) {
      try {
        const response = await fetch("http://localhost:5000/email/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: selectedUser,
            subject: selectedEmail.subject,
            message: selectedEmail.text,
          }),
        });
        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Failed to send email.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("An error occurred while sending the email.");
      }
    } else {
      alert("Please select a user and an email to send.");
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleEmailSelection = (email) => {
    setSelectedEmail(email);
  };
  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div
      style={{
        background: "rgb(102,175,255)",
        background:
          "linear-gradient(149deg, rgba(102,175,255,1) 0%, rgba(245,245,245,1) 36%, rgba(245,245,245,1) 61%, rgba(102,175,255,1) 100%)",
      }}
      className="onboard h-screen"
    >
      <div className="absolute top-0 left-0 p-10">
        <Link smooth to="/onboard">
          <h1 className="font-thin text-4xl text-gray-900 ">ONBOARDIO</h1>
        </Link>
      </div>
      <div className="absolute top-0 right-0 p-6">
        <div className="text-black bg-blue-400  inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-full sm:w-auto sm:mb-0 group">
          Hello,{" "}
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </div>
      </div>
      <div className="flex justify-center font-bold text-2xl mt-40 mb-7 ">
        <h1 className="text-center ">Boss, No Time Today? 💃 </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {/* User selection section */}
        <div className=" p-4 inline-flex items-center justify-center">
          {/* Search Bar */}
          <ul>
            <li>
              <input
                type="text"
                placeholder="Search email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: 20 }}
                className="mt-1 p-3 block w-80 border bg-white border-blue-500 hover:border-blue-700  focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </li>
            {filteredUsers.map((user, index) => (
              <li
                key={index}
                style={{ borderRadius: 20 }}
                className={`mt-1 p-3 block w-80 border bg-white border-blue-500 hover:border-blue-700  focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                  selectedUser === user ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>
        {/* Email selection section */}
        <div className=" p-2 inline-flex items-center justify-center">
          <ul>
            {emails.map((email) => (
              <li
                key={email.id}
                style={{ borderRadius: 20 }}
                className={`mt-1 p-3 block w-80 border bg-white border-blue-500 hover:border-blue-700  focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                  selectedEmail === email ? "bg-blue-200" : ""
                }`}
                onClick={() => handleEmailSelection(email)}
              >
                {email.subject}
              </li>
            ))}
          </ul>
        </div>
        <div className=" bg-white rounded-lg overflow-hidden shadow-md mr-10">
          <div className="p-4">
            <div className="mb-4">
              <p className="text-gray-700 mb-1">
                <strong>To:</strong>{" "}
                {selectedUser ? selectedUser : "receiver@example.com"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Subject:</strong>{" "}
                {selectedEmail ? selectedEmail.subject : "Your subject here"}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-1">
                <strong>Message:</strong>
              </p>
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                rows="6"
                placeholder="Your message here..."
                value={selectedEmail ? selectedEmail.text : ""}
                readOnly={!isEditable}
                onChange={(e) =>
                  setSelectedEmail((prevEmail) => ({
                    ...prevEmail,
                    text: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => sendEmail()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          doSignOut().then(() => {
            navigate("/login");
          });
        }}
        className="fixed bottom-0 right-0 m-4 text-sm text-blue-600 underline"
      >
        Logout
      </button>
    </div>
  );
};

export default Onboard;
