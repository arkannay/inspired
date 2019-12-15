import React, {Fragment,useState} from 'react'
import ReactDOM from 'react-dom'
interface User {
    id: number;
    FullName: string,
    email: string,  
    DOB: string,
}
export default function App(): JSX.Element {
    var last_ID = -1
    const saveUser = (e: any): void => {
        e.preventDefault()
        if (!isNaN(Date.parse(document.getElementById("dobUser").value))) {
          const user: User = {
            id: document.getElementsByTagName("tr")["length"] - 1,
            FullName: document.getElementById("fullNameUser").value,
            email: document.getElementById("emailUser").value,
            DOB: document.getElementById("dobUser").value
          };
          console.log(user);
          newUser(user);
        } else {
          alert("Please input a valid date!");
        }
         
        
    };
    const pickRandomly = (e:any) => {
        e.preventDefault()
        console.log("You picked ")
        var users = document.getElementsByClassName("ID");
        if (users.length == 0) {
            alert("There are no users to pick from");
        } else {
            var pick = Math.floor(Math.random() * users.length)
            console.log("pick=" + pick)
            console.log("last_ID=" + last_ID)
            while (pick == last_ID && last_ID != -1 && (users.length != 1)) {
                pick = Math.floor(Math.random() * users.length)
            }
            console.log(users[pick].children[0].innerText);
            console.log(users[pick].children[1].innerText);
            console.log(users[pick].children[2].innerText);
            console.log(users[pick].children[3].innerText);
            alert(
              "You picked user with id " +
                users[pick].children[0].innerText +
                " ,full name " +
                users[pick].children[1].innerText +
                " ,email address " +
                users[pick].children[2].innerText +
                " and date of birth " +
                users[pick].children[3].innerText
            )
            last_ID = pick
            
        }
        
    }
    const newUser = (user:User) => {
      console.log("hello")
      var table = document.getElementById("list")
      var row = table.insertRow(user.id)
      var cell1 = row.insertCell(0)
      var cell2 = row.insertCell(1)
      var cell3 = row.insertCell(2)
      var cell4 = row.insertCell(3)
      var cell5 = row.insertCell(4);
      cell1.innerHTML = user.id
      cell2.innerHTML = user.FullName
      cell3.innerHTML = user.email
      cell4.innerHTML = user.DOB
      cell5.innerHTML = '<button style="width: 100%;">Remove</button>'
      row.classList.add("ID")
      cell5.firstChild.onclick = function(){console.log(row.parentNode.removeChild(row))}
    }
    return (
      <Fragment>
        <form onSubmit={saveUser}>
          <table id="list">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Date of Birth (YYYY-MM-DD) </th>
                <th></th>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input id="fullNameUser" required></input>
                </td>
                <td>
                  <input type="email" id="emailUser" required></input>
                </td>
                <td>
                  <input id="dobUser" required></input>
                </td>
                <td>
                  <button type="submit">Add User</button>
                  <button onClick={pickRandomly}>Pick a random user</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Date of Birth(YYYY-MM-DD)</th>
              <th></th>
            </tfoot>
          </table>
        </form>
      </Fragment>
    );
}

const root = document.getElementById('app-root')
ReactDOM.render(<App />,root)