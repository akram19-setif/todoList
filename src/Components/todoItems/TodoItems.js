import React from 'react';
import './TodoItems.css';
const TodoItems=(props)=>{
  const {items,onDelete}=props;
  const lengthOfItems=items.length;

  const listItems=lengthOfItems!==0 ?(items.map(item =>{
 return (
   <div key={item.id}>
     <span className="name">{item.name}</span>
     <span className="age">{item.age}</span>
     <span className="action icon" onClick={()=>onDelete(item.id)}>&times;</span>
   </div>
 )
  })):(<p>there are no items</p>);
  
return(
  <div className="ListItems">
    <div>
    <span className='name title'>Name</span>
    <span className='age title'>Age</span>
    <span className='action title'>Action</span>
    </div>
    {listItems}
  </div>
);
}
export default TodoItems;