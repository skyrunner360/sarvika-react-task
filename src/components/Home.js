import React,{useState,useEffect} from 'react'
import Logout from './Logout'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';


export default function Home(props) {
    // Defining States
    const [userData, setUserData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [taskDesc, setTaskDesc] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [tasks, setTasks] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const getuserdata=async()=>{
        // Getting token from localstorage
        var token = await JSON.parse(localStorage.getItem("login"));
        let realtoken = token.token;
        await fetch("https://dushyant70-task-app.herokuapp.com/users/me",{headers:{"Authorization": "Bearer "+realtoken}}).then(
            (response)=>{
                response.json().then((result)=>{
                    setUserData(result.name)
                })
            }
        ).catch((e)=>{console.log("User Data Error"+e)})
    }
    const addtask=async(description,completed)=>{
      var token = await JSON.parse(localStorage.getItem("login"));
      let realtoken = token.token;
      await fetch("https://dushyant70-task-app.herokuapp.com/tasks",{method:"POST",body: JSON.stringify({description,completed}), headers:{"Authorization": "Bearer "+realtoken,"content-type":"application/json"}}).then(
          (response)=>{
              response.json().then((result)=>{
                  // console.log(result)
              })
              gettasklist(); //call this function to refresh the DOM
          }
      ).catch((e)=>{console.log("Add task Error"+e)})
  }
    const gettasklist=async()=>{
      var token = await JSON.parse(localStorage.getItem("login"));
      let realtoken = token.token;
      await fetch("https://dushyant70-task-app.herokuapp.com/tasks?limit=10&skip=0",{headers:{"Authorization": "Bearer "+realtoken,"content-type":"application/json"}}).then(
          (response)=>{
              response.json().then((result)=>{
                  setTasks(result)
              })
          }
      ).catch((e)=>{console.log("Task List Error"+e)})
  }
    const deltask=async(taskid)=>{
      var token = await JSON.parse(localStorage.getItem("login"));
      let realtoken = token.token;
      await fetch("https://dushyant70-task-app.herokuapp.com/tasks/"+taskid,{method:"DELETE", headers:{"Authorization": "Bearer "+realtoken}}).then(
          (response)=>{
              response.json().then((result)=>{
                  // console.log(result)
              })
              gettasklist();
          }
      ).catch((e)=>{console.log("Delete Task Error"+e)})
  }
    const taskdescription=async(taskid)=>{
      var token = await JSON.parse(localStorage.getItem("login"));
      let realtoken = token.token;
      let completed = true;
      await fetch("https://dushyant70-task-app.herokuapp.com/tasks/"+taskid,{method:"PATCH", headers:{"Authorization": "Bearer "+realtoken},body: JSON.stringify(completed)}).then(
          (response)=>{
              response.json().then((result)=>{
                  props.setTaskDescrip(result);
                  console.log(result)
              })
          }
      ).catch((e)=>{console.log("Task Desc. Error"+e)})
  }
    useEffect(() => {
        getuserdata();
        gettasklist();      
    },[])
    return (
        <div width="100%">
        
        {/* Bootstrap Card */}
    <div className="card" style={{width: "100%"}}>
  <img src="https://source.unsplash.com/featured/?welcome" className="card-img-top" alt="Welcome" width="30%" height="30%"/>
  <div className="card-body">
    <h5 className="card-title">Welcome <span className="text-info">{userData}</span></h5>
    <p className="card-text"> Here are Your Tasks.</p>
    <p className="card-text"> You can delete the Completed Tasks or add new Tasks from here only.</p>
  </div>
<Button type="button" onClick={handleOpen}>
  Add Task
</Button>

{/* Loop to display 10 tasks at a time in a list */}
 {tasks.map((el)=>{
   return <ul className="list-group list-group-flush" key={el._id}>
     <Link to="/desc" onClick={()=>{taskdescription(el._id)}}>
   <li className="list-group-item" key={el._id}>{el.description}
   </li>
   </Link>
   <Button onClick={()=>{deltask(el._id)}}>Delete Task</Button>
 </ul>
 })}
  <div className="card-body">
      <Logout/>
  </div>
</div>
      {/* Material UI Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add your Tasks Here
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <textarea onChange={(event)=>{setTaskDesc(event.target.value)}} placeholder="Buy Vegetables in Evening"></textarea>
          </Typography>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>{addtask(taskDesc,isCompleted);handleClose()}}>Save</Button>
        </Box>
      </Modal>
        </div>
    )
}
