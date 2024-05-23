const handleRegistration = (event) => {
    event.preventDefault();
    const email = getValue("reg-email");
    const first_name = getValue("reg-first_name");
    const last_name = getValue("reg-last_name");
    const mobile = getValue("reg-mobile");
    const password = getValue("reg-password");
    const confirm_password = getValue("reg-confirm_password"); 

    if (!email || !first_name || !last_name || !mobile || !password || !confirm_password){
        document.getElementById("error").innerText = "Please fill in all fields.";
    }
    else{
    const info = {
      email,
      first_name,
      last_name,
      mobile,
      password,
      confirm_password,
    };

    console.log(info);
  
    if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      ) {
        console.log(info);
  
        fetch("https://tastenest.onrender.com/chef/registration/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('info',data)
            if(data.response)
            {
                window.location.href = "login.html";
            }
            else{
                if(data.email){
                    document.getElementById("error").innerText =
                    "A user with this email already exists!";
                }
                else
                {
                    document.getElementById("error").innerText =
                    "Any Field may not blank!";
                }
            };
        });
      } else {
        document.getElementById("error").innerText =
          "Password must be contain at least eight characters, at least one letter, one number and one special character.";
      }
    } else {
      document.getElementById("error").innerText =
        "Password and confirm password does not matched!";
    }
  };
};
  
  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
  };
  

const handleLogin = (event) => {
    event.preventDefault();
    const email = getValue("login-email");
    const password = getValue("login-password");
    console.log(email, password);
    if ((email, password)) {
      fetch("https://tastenest.onrender.com/chef/api/token/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data && data.access && data.refresh) {
            const { access, refresh } = data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            window.location.href = "index.html";
          }
          else
          {
            const p = document.getElementById('login-error-message');
            p.textContent = 'Incorrect email or password!';
          }
        });
    }
  };


const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = "login.html";
};