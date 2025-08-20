# Todo List Application

A modern, responsive Todo List application built with React and styled with Tailwind CSS. This application allows users to manage their tasks efficiently with features like adding, editing, deleting, searching, and filtering tasks.

## Features

- **Task Management**: Add, edit, and delete tasks
- **Data Persistence**: Tasks are saved in localStorage for persistence between sessions
- **Search Functionality**: Search for specific tasks by name
- **Filtering Options**: Filter tasks by status (All, Active, Completed)
- **Form Validation**: Comprehensive form validation with error messages
- **Responsive Design**: Mobile-friendly interface that works on all device sizes
- **Modern UI**: Clean and intuitive interface styled with Tailwind CSS

## Technologies Used

- React.js
- Tailwind CSS
- React Feather Icons
- LocalStorage API

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/akram19-setif/todoList.git
   cd todoList
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

```
├── public/
│   ├── index.html
│   └── ...
└── src/
    ├── Components/
    │   ├── addItems/
    │   │   └── AddItems.js
    │   ├── todoItems/
    │   │   └── TodoItems.js
    │   └── searchFilter/
    │       └── SearchFilter.js
    ├── App.js
    ├── App.css
    ├── index.js
    ├── index.css
    └── ...
```

## Usage

- **Adding a Task**: Enter task details in the form and click the Add button
- **Editing a Task**: Click on the edit icon next to a task to modify it
- **Deleting a Task**: Click on the delete icon to remove a task
- **Searching**: Type in the search box to find specific tasks
- **Filtering**: Use the filter buttons to view All, Active, or Completed tasks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
