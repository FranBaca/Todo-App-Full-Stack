const ProgressTodoBar = ({progress}) => {
    <div className="outer-bar">
        {console.log(progress)}
        <div 
            className="inner-bar"
            style={{width: "25px", backgroundColor: "red"}}
        >

        </div>
    </div>
}

export default ProgressTodoBar;