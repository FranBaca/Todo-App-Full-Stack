import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"
import { useEffect, useState } from "react"
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [tasks,setTasks] = useState(null)
  const [cookies, setCookies, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email;
  const getData = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
        const json = await response.json();
      setTasks(json)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }
  },[])
  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new DataTransfer(b.date))
  return (
   <div className="app">
    {!authToken && <Auth/>}
  { authToken && 
    <> 
    <ListHeader listName={"My Todos⌛"} getData={getData} />
    <p className="user-email">Welcome back {userEmail}</p>
    {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    </>
  }
  <p className="copyright">Created by Fran Baca©🐮</p>
   </div>
  );
}

export default App;
