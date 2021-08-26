import React, { Fragment, useEffect, useState } from "react";
import { firebase } from "./firebase";

import db_users from "./assets/images/db_users.png";
import db_config from "./assets/images/db_config.png";

import Table from "./components/Table";

function App() {
  const [users, setUsers] = useState([]);
  const [usersByEmail, setUsersByEmail] = useState([]);
  const [duplicateEmails, setDuplicateEmails] = useState([]);

  const getUsers = async () => {
    try {
      const db = firebase.firestore();

      const data = await db.collection("users").get();

      const arrayData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const sortUsersByEmail = () => {
    let usersCopy = [...users];

    usersCopy.map((user) => {
      user.email_length = user.email.length;
    });
    usersCopy.sort(function (a, b) {
      return a.email_length < b.email_length
        ? 1
        : b.email_length < a.email_length
        ? -1
        : 0;
    });
    setUsersByEmail(usersCopy);
  };

  const findUsersEmailDuplicated = () => {
    let usersCopy = [...users];

    let usersEmail = [];
    usersCopy.map((user) => {
      usersEmail.push(user.email);
    });

    var counts = {};
    var duplicateEmails = [];

    let dupliE = usersEmail.filter((email, index) => {
      usersEmail.forEach((em, id) => {
        if (index !== id) {
          if (em.includes(email)) {
            return email;
          }
        }
      });
    });
    console.log(dupliE);

    usersEmail.forEach(function (item) {
      if (counts[item] === undefined) {
        counts[item] = 1;
      } else {
        counts[item] += 1;
        if (counts[item] === 2) {
          console.log(item);
          duplicateEmails.push(item);
        }
      }
    });

    setDuplicateEmails(duplicateEmails);
  };

  return (
    <div className="container" style={{ marginTop: 30 }}>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span>
                <p>
                  <strong>Step 1: </strong>Create API which recovers all users
                  from a table and return basic data from each user on the
                  response.
                </p>
                <p>
                  The response must be in json format and contain the following
                  fields (id, name, username, email and status).
                </p>
              </span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="response">
                <Table users={users} />
                <div>
                  <em>Response Request:</em>
                  <p>{JSON.stringify(users)}</p>
                </div>
                <div>
                  <em>Explanation:</em>
                  <p>
                    The request is made in the first load of the page{" "}
                    <code>
                      const data = await db.collection("users").get();
                    </code>
                  </p>
                  <img className="img-fluid" src={db_users} alt="users table" />
                  <p>
                    The database is in firebase and you can check the propper
                    configuration in the ./src/firebase.js.
                  </p>
                  <img
                    className="img-fluid"
                    src={db_config}
                    alt="database config"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span>
                <p>
                  <strong>Step 2: </strong>Quantifies each character on the
                  email's field from user table and returns them on descending
                  order by the number of repetitions.
                </p>
                <p>
                  There are no difference in uppercase and lowercase, so both
                  are counted as the same letter and the response must be in
                  JSON format.
                </p>
              </span>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <button className="btn-secondary" onClick={sortUsersByEmail}>
                Load Table
              </button>
              {usersByEmail.length > 0 && (
                <Fragment>
                  <div>
                    <em>Explanation:</em>
                    <p>
                      Get <code>email.length</code> for each user data. Sort the
                      Array of Objects using this length to be show it in
                      descending order the users table list.
                    </p>
                    <p>
                      The column email has a title that in the on hover showed
                      the total length
                    </p>
                  </div>
                  <Table users={usersByEmail} />
                </Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <span>
                <p>
                  <strong>Step 3: </strong>Show a list of all potentially
                  duplicated email.
                </p>
                <p>
                  You are free to define what a potentially duplicated email is.
                  Example: jonh.doe@ibm.com VS jonhdoe@ibm.com VS
                  john-doe@ibm.com
                </p>
              </span>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <button
                className="btn-secondary"
                onClick={findUsersEmailDuplicated}
              >
                Find Duplicates
              </button>
              <div>
                <em>Explanation:</em>
                <p>
                  Duplicated emails are emails that are equally the same by all
                  charts.
                </p>
                {duplicateEmails && (
                  <Fragment>
                    <strong>
                      Total:
                      <p>{duplicateEmails && duplicateEmails.length}</p>
                    </strong>
                    {duplicateEmails.map((email) => {
                      return <p>{email}</p>;
                    })}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
