import React, { Component } from 'react';
import './AddItems.css'; 

class AddItems extends Component{
  state ={
    id:'',
    name:'',
    age : ''
  }
 
  handleChange = (d)=>{
    this.setState({
      id:Math.random()*10,
      [d.target.id] : d.target.value 
    });
  }
  handleSubmit =  (e) =>{
    e.preventDefault(); 
    this.props.addItem(this.state);
    e.target.reset();
  }
 
  render()
  {
    return(
    <form onSubmit={this.handleSubmit}>
    <input type="text"  placeholder="Enter Name"id="name" onChange={this.handleChange}/>
    <input type="number" placeholder="Enter Age" id="age" onChange={this.handleChange}/>
    <input type="submit" value="Add Item" />
    </form>
    );}
   
} 
    
 
export default AddItems;