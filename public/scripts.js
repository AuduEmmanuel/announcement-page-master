function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "myusername" && password == "mypassword") {
      window.location.href = "Announcement%20Page.html";
    } else {
                // Wrong username or password
    console.log("Wrong username or password!");
    // Add the following line of code to disable the submit button
    document.getElementById("submit").disabled = true;
      alert("Invalid username or password. Please try again.");

    }
  }



