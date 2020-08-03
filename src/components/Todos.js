import React, {Component} from 'react';
import Todoitem from './Todoitem';
import PropTypes from 'prop-types';

class Todos extends Component{

  markComplete = () => {
      console.log('Hello')
  }  

  render() {
    return this.props.todos.map((todo)=> (
    // <h3>{todo.title}</h3>
    <Todoitem key={todo.id} todo={todo} markComplete={this.props.markComplete}
    delTodo ={this.props.delTodo}/>
    ));
  }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
 
export default Todos;
