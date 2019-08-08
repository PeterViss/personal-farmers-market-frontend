import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
const Post = (props) => {
    

    //  const dayCount = (props.post.month) => {
    //     return "okay"
    // } 
    
    return(
        <div>
        <div>
            <form>
            <input value={props.post.content || ""} name="content" onChange={props.onChangeHandler}/>
            <input value={new Date(props.post.date) || ""} name="date" onChange={props.onChangeHandler}/>
            <select id="month-select">
                <option value="">{props.post.date}</option>
                <option value="Mon">Mon</option>
                <option value="Tue">Tue</option>
                <option value="Wed">Wed</option>
                <option value="Thu">Thu</option>
                <option value="Fri">Fri</option>
                <option value="Sat">Sat</option>
                <option value="Sun">Sun</option>
                {/* <option value="Mon">Mon</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option> */}
            </select>

            <input value={props.post.zip || ""} name="zip" input="number" onChange={props.onChangeHandler}/>
            </form>
        </div>
        </div>
    )
}
export default Post