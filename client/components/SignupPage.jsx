import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupLogo from '../images/logo.png';

function SignupPage() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  function createUser(e) {
    e.preventDefault();

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password,
        email: email,
        gradeLevel: gradeLevel,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate('/mainmenu');
        } else {
          console.error('Error', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="signupPage">
      <img src={signupLogo} />
      <form onSubmit={createUser}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Firstname</label>
              </td>
              <td>
                <input
                  className="formInput"
                  name="firstname"
                  type="text"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  required
                  placeholder="What's your name?"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Lastname</label>
              </td>
              <td>
                <input
                  className="formInput"
                  name="lastname"
                  type="text"
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                  required
                  placeholder="What's your name?"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Username</label>
              </td>
              <td>
                <input
                  className="formInput"
                  name="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder="What username would you like?"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
              <td>
                <input
                  className="formInput"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Create password"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Email</label>
              </td>
              <td>
                <input
                  className="formInput"
                  name="email"
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="What's your email?"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Grade Level</label>
              </td>
              <td>
                <input
                  className="formInput"
                  name="gradeLevel"
                  type="text"
                  value={gradeLevel}
                  onChange={e => setGradeLevel(e.target.value)}
                  required
                  placeholder="What's your grade level?"
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button className="orangeBtn" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
