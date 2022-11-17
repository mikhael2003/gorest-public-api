let listUser = document.getElementById("listUser")

fetch("https://gorest.co.in/public/v2/users")
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })

    function showUser(value, index) {
        listUser.innerHTML += `<tr>
        <td>${value.email}</td>
        <td>${value.name}</td>
        <td>${value.gender}</td>
        <td>${value.status}</td>
        <td><buton> class"btn btn=info" onclick="edituser(${value.id})"Edit</button>
        <button class+"btn btn-danger" onclick="deleteuser(${value.id})">Delete</button></td></tr>`
    }

    function deleteuser(id) {
        console.log("Hapus data id: " + id)
        fetch("https://gorest.co.in/public/v2/users/" + id, {
            method: "DELETE",
            headers: {
                Autorization: "Bearer 376653058e729a3b126df7d409426d7a722625c02cb76b6d3621d92059d02fcd"
            }
        })
        .then(Response => {
            console.log(Response)
            listUser.innerHTML = ""
            getUser()
        })
        .catch(error => {
            console.log(error)
        })
    }