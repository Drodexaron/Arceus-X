const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

let inputUsername = "";
let inputPassword = "";
let inputEmail = "";

let varUsername = "";
let varPassword = "";
let varEmail = "";

let retrievedUsername = "";
let retrievedEmail = "";
let retrievedPassword = "";

// Sign Up System

const signUp = document.getElementById("signUp");

function fetchInfo() {
  inputUsername = document.getElementById("inputUsername").value;
  inputEmail = document.getElementById("inputEmail").value;
  inputPassword = document.getElementById("inputPassword").value;
  console.log("Debugging: Fetched Values");
}

function vaildateInputs() {
  
  if (!inputUsername || inputUsername.length < 8 ){
    Swal.fire({
      icon: 'error',
      title: 'Invalid Username!',
      text: 'Username must be longer than 8 characters!',
    });
    return false;
  } else if(!emailRegex.test(inputEmail)){
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email!',
      text: 'Please enter a valid email address!',
    });
    return false;
  } else if(!inputPassword || inputPassword.length < 8){
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password!',
      text: 'Password length must have up to 8 characters!',
    });
    return false;
  } else if(!specialCharacters.test(inputPassword)){
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password!',
      text: 'Password must contain atleast one speical character!',
    });
    return false;
  } else {
    return true;
  }
}

function storeDatas(){
  varUsername = inputUsername;
  varEmail = inputEmail;
  varPassword = inputPassword;
  
  let storedUsername = "";
  let storedEmail = "";
  let storedPassword = "";
  
  try {
    localStorage.setItem('storedUsername', inputUsername);
    localStorage.setItem('storedEmail', inputEmail);
    localStorage.setItem('storedPassword', inputPassword);
    return true;
    return { storedUsername, storedEmail, storedPassword };
  } catch(error) {
    return false;
  }
}

function retriveDatas() {
  retrievedUsername = localStorage.getItem('storedUsername');
  retrievedEmail = localStorage.getItem('storedEmail');
  retrievedPassword = localStorage.getItem('storedPassword');
}

function changeLogin() {
  inputUsername = "00000000";
  inputEmail = document.getElementById("login-inputEmail").value;
  inputPassword = document.getElementById("login-inputPassword").value;
}

function verifyInputs() {
  retriveDatas();
  if (inputEmail === retrievedEmail) {
    return true;
    if (inputPassword === retrievedPassword) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
// Sign Up & Log In
if  (window.location.href.includes('signup.html')) {
  signUp.addEventListener("click", function(event){
  
  event.preventDefault();
  fetchInfo();
  if (vaildateInputs() === false){
    return false;
  } else if(storeDatas() === false){
    alert("Failed to store the datas!")
    return false;
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Sign up Successful!',
      text: 'Please login back, the page will load automatically!',
    });
    setTimeout(function(){
      window.location.href = "login.html";
    }, 5000);
  }
});
} else {
  const login = document.getElementById("login");
  
  login.addEventListener("click", function(event){
    event.preventDefault();
    
    changeLogin();
    if (vaildateInputs() === false){
      return false;
    } else {
      if (verifyInputs() === false){
        Swal.fire({
          icon: 'error',
          title: 'Wrong Email or Password!',
          text: 'Please login back...',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Log in Successful!',
          text: 'Welcome, ' + retrievedUsername,
        });
      }
    }
  });
}
