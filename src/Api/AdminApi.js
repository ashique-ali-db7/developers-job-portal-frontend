import axios from "axios";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export function adminSignin(data,resultFunction){

axios.post('/admin/adminLogin',data,config).then((response)=>{
    
resultFunction(response.data)
}).catch((response)=>{
    response.message = "Invalid user name or password";
    resultFunction(response.message)
})


}