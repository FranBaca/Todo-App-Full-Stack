import TickIcon from "./TickIcon";
import ProgressTodoBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";

const ListItem = ({task,getData}) => {
    const colors = [
        "rgb(255,144,161)",
        "rgb(255,175,163)",
        "rgb(108,115,148)",
        "rgb(108,115,148)",
        "rgb(141,181,145)",
    ]

    const randomColor= colors[Math.floor(Math.random()* colors.length)]
    const [showModal, setShowModal] = useState(false)
    const deleteItem = async () => {
        try{
           const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,{
            method: 'DELETE'
           })
           if(response.status === 200){
                getData()
           }
        }catch(err){
            console.error(err)
        }
    }
    return(
        <div className="list-item">
            <div className="info-container">
                <TickIcon />
                    <p className="task-title">{task.title}</p>
            <div className="outer-bar">
            <div 
                    className="inner-bar"
                    style={{width: `${task.progress}%`, backgroundColor: randomColor}}
            >
            </div>
            </div>
            </div>
            <div className="button-container">
                <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
                <button className="delete" onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode={"edit"} setShowModal={setShowModal} getData={getData} task={task} />}
        </div>
    )
}

export default ListItem;