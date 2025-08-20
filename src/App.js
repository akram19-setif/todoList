import React, { Component } from 'react';
import './App.css';
import TodoItems from './Components/todoItems/TodoItems';
import AddItems from './Components/addItems/AddItems';
import SearchFilter from './Components/searchFilter/SearchFilter';
class App extends Component {
  state = { 
    items: [],
    filteredItems: [],
    searchTerm: '',
    filterOption: 'all'
  };
  
  componentDidMount() {
    // Load items from localStorage when component mounts
    const savedItems = localStorage.getItem('todoItems');
    if (savedItems) {
      const items = JSON.parse(savedItems);
      this.setState({ 
        items: items,
        filteredItems: items
      });
    } else {
      // Default items if nothing in localStorage
      const defaultItems = [
        {id:1, name:'Hamza', age:12},
        {id:2, name:'Oussama', age:53},
        {id:3, name:'Ahmed', age:25}
      ];
      this.setState({
        items: defaultItems,
        filteredItems: defaultItems
      });
    }
  }
   // Save to localStorage whenever state changes
   componentDidUpdate(prevProps, prevState) {
     if (prevState.items !== this.state.items) {
       localStorage.setItem('todoItems', JSON.stringify(this.state.items));
     }
   }
   
   handelDelete=(id)=>{
     const items = this.state.items.filter(item => item.id !== id);
     this.setState({ items }, () => this.applyFilters());
   }
   
   getItem=(item)=>{
     const items = [...this.state.items, item];
     this.setState({ items }, () => this.applyFilters());
   }
   
   handleSearch = (searchTerm) => {
     this.setState({ searchTerm }, () => this.applyFilters());
   }
   
   handleFilter = (filterOption) => {
     this.setState({ filterOption }, () => this.applyFilters());
   }
   
   applyFilters = () => {
     const { items, searchTerm, filterOption } = this.state;
     
     // First filter by search term
     let filtered = items;
     if (searchTerm) {
       filtered = filtered.filter(item => 
         item.name.toLowerCase().includes(searchTerm.toLowerCase())
       );
     }
     
     // Then filter by age
     if (filterOption !== 'all') {
       filtered = filtered.filter(item => {
         if (filterOption === 'young') return item.age < 18;
         if (filterOption === 'adult') return item.age >= 18 && item.age <= 60;
         if (filterOption === 'senior') return item.age > 60;
         return true;
       });
     }
     
     this.setState({ filteredItems: filtered });
   }
  
 
  render() { 
    return ( 
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12"> 
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">My Todo List</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
              <h2 className="text-xl font-bold text-white">Your Tasks</h2>
              <p className="text-blue-100 text-sm">Manage your daily tasks efficiently</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <SearchFilter 
                onSearch={this.handleSearch} 
                onFilter={this.handleFilter} 
              />
              <TodoItems items={this.state.filteredItems} onDelete={this.handelDelete}/>
            </div>
            
            <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
              <AddItems addItem={this.getItem}/>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Your tasks are automatically saved to your browser</p>
          </div>
        </div>
      </div>
     );
  }
}
 

export default App;
