import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import About from './components/Pages/About'
// import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios'

import './App.css';


class App extends Component{

  state = {
    todos: []
  }


  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res => this.setState({  todos:res.data }))
  }
  //Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) })

  }

  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter( todo => todo.id !== id)] }));
  }

  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    
  }

  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <Header/>
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo = {this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path='/about' component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;