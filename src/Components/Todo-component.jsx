import { List,ListItem ,ListItemText} from "@mui/material";
import './Todo-styling.css'
const Todo =({todos})=>{
    return(
        <div>
            <ul>
            {todos.map((todo) =>
            <List>
                <ListItem>
                    <ListItemText primary = {todo} secondary ="Complete by EOD 🔔" />
                </ListItem>
            </List>
            // <li>{todo}</li>
        )}
            </ul>
        </div>
    )
}

export default Todo;