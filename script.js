let listUser = document.getElementById("listUser")
let email = document.getElementById("email")
let name = document.getElementById("name")
let gender = document.getElementById("gender")
let status = document.getElementById("status")
let alert = document.getElementById("alert")
let button = document.getElementById("btnCrate")



function getUser() {
}

function showUser(value, index) {

}

function deleteuser(id) {

}

function createuser() {
    if(statusSimpan == 0) {
        //simpan data
    }else{
        //ubah data
        console.log("Button ubah ditekan")
    }
    console.log("Button simpan ditekan")
}

function createuser(statusSimpan = 0) {

    
    console.log("Button simpan ditekan")
    console.log(email.value)
    fetch("https://gorest.co.in/public/v2/users/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Autorization': "Bearer 376653058e729a3b126df7d409426d7a722625c02cb76b6d3621d92059d02fcd"  
        },
        body: JSON.stringify({
            "email": email.value,
            "name": name.value,
            "gender": gender.value,
            "status": status.value
        }) 
    })

    .then(response => {
        response.json()
        console.log(response.status)
    })
    .then(result => {
        console.log(result)
        if (response.status == 201) {// user berhasil disimpan di server gorests
            alert.innerHTML = '<div class="alert alert-success">User berhasil disimpan</div>'
        } else {// user gagal disimpan di server gorests
        alert.innerHTML = '<div class="alert alert-danger">User gagal disimpan</div>'
    }
    })
}

fetch("https://gorest.co.in/public/v2/users")
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        data.forEach(showUser)
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
        <td><button class="btn btn-info" onclick="editUser(${value.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteuser(${value.id})">Delete</button></td></tr>`
    }

    function deleteuser(id) {
        console.log("Hapus data id: " + id)
        fetch("https://gorest.co.in/public/v2/users" + id, {
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
    function editUser(id) {
        console.log(id);
        fetch("https://gorest.co.in/public/v2/users/" + id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // set value input email,nama, gender, dan status
            email.value = data.email
            name.value = data.name
            gender.value =  data.gender
            status.value = data.status
            // ubah teks "simpan" menjadi "ubah"   
            button.innerHTML="Ubah"
            // ubah onclick menambahkan parameter"1"
            // onclick+"createuser(1)"
            button.setAttribute("onclick", "createUser(1, " + id + ")")
        })
        .catch(error => {
            console.log(error)
        });
    }