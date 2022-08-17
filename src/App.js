import React, { Component } from 'react';
import './App.css';
import TodoItems from './Components/todoItems/TodoItems';
import AddItems from './Components/addItems/AddItems';
class App extends Component {
  state = { 
    items: [
      {id:1,name:'Hamza',age:12},
      {id:2,name:'Oussama',age:53},
      {id:3,name:'Ahmed',age:25}]
   };
   handelDelete=(id)=>{
     let items=this.state.items.filter(item=>{
     return item.id !== id});
     this.setState({ items});
   }
   getItem=(item)=>{
     let newItem=this.state.items.push(item);
       this.setState({
          newItem
    })
   }
  
 
  render() { 
    return ( 
      <div className="App container"> 
     <h1 className="text-center">TODOLIST</h1>  
      <TodoItems items={this.state.items} onDelete={this.handelDelete}/>
      <AddItems addItem={this.getItem}/>
      </div>
     );
  }
}
 

export default App;
