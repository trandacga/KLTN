function sendemail(){
   var params = {
     name: document.getElementById("name").value,
     email: document.getElementById("email").value,
     phone: document.getElementById("phone").value,
     contentarea: document.getElementById("contentarea").value,
   }
   const severID = "service_de6h46o";
   const template = "template_xu5wjbw";

emailjs.send(severID,template,params)
       .then((res) => {
          document.getElementById("name").value = "",
          document.getElementById("email").value = "",
          document.getElementById("phone").value = "",
          document.getElementById("contentarea").value = "",
          console.log(res)
          alert("thành công")
       })
       .catch((err) => console.log(err));
}

