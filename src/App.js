
import './App.css';
import { Routes,Route,Link,useNavigate} from "react-router-dom";
import Signup from './Pages/User/Signup';
import Signin from './Pages/User/Signin';
import Home from './Pages/User/Home';

function App() {
  return (
    <div className="App">

   <Routes>
   <Route path='/' element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/signin' element={<Signin/>}/>

   </Routes>

    </div>
  );
}

export default App;
