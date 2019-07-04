import React from 'react'

import logo from './logo.svg'
import './styles/App.css'
import { MessageBoard } from '../MessageBoard'
import { AppContext } from './AppContext'

export class App extends React.Component {

  state = {
    totalPeople : 0
  }

  setTotalPeopleChange = value => {
    this.setState({
      totalPeople:value
    });
  }

  render() {
    return ( 
      <div>
        <AppContext.Provider
            value={{
              onTotalPeopleChange: this.setTotalPeopleChange
            }}
          >
            <header>
              <span>Welcome to MessageBoard</span><br/>
              <span>留言人數：{this.state.totalPeople}</span>
            </header>
            <MessageBoard />
          </AppContext.Provider>
        
      </div>
      
    );
  }
}

//export default App;
