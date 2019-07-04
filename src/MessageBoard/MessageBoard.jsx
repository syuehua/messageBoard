
import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

import { MessageForm } from '../MessageForm'
import { MessageList } from '../MessageList'
import { AppContext } from '../App/AppContext'
import { BoardContext } from './BoardContext'
import '../index.css';

export class MessageBoard extends React.Component {

  static contextType = AppContext

  state = {
    author:'',
    comments: [],
    submitting: false,
    value: '', 
    init:false,
    authorList: new Map(),
    editId: -1,
    editComment: [],
    loading: true
  };

  removeComments = id => {
    console.log(id)
    
    let comments = this.state.comments
    comments.splice(id, 1);
    let storageData = JSON.parse(localStorage.getItem('message'))
    console.log(storageData.length-id)
    storageData.splice((storageData.length-(id+1)), 1)
    localStorage.setItem('message', JSON.stringify(storageData))  
    this.setState({
      comments: comments
    })
  }

  editComments = id => {
    document.getElementById('commentsList').hidden = true
    this.setState({
      editId: id,
      editComment: this.state.comments[id]
    })
  }

  handleSubmit = (e) => {

    this.state.submitting = true
    this.state.value = e.content
    this.state.author = e.author

    setTimeout(() => {
      let messageDateTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      console.log(messageDateTime)
      console.log(this.state.init)
      if(this.state.editId > -1) {
        let storageData = JSON.parse(localStorage.getItem('message'))
        storageData[(storageData.length-(this.state.editId+1))] = 
          {
            author: this.state.author,
            content: this.state.value,
            datetime: messageDateTime
          }
        
        localStorage.setItem('message', JSON.stringify(storageData))  
        let comments = this.state.comments
        console.log('10000000')
        console.log(comments);
        comments[this.state.editId] = 
          {
            author: this.state.author,
            content: this.state.value,
            datetime: messageDateTime
          }
        
        document.getElementById('commentsList').hidden = false
        console.log('1111');
        console.log(comments);
        this.setState({
          submitting: false,
          editId: -1,
          editComment: []
        })
        
      } else {
        let messageDate = {'author':this.state.author, 'content':this.state.value, 'datetime': messageDateTime}
        console.log(messageDate)
        let message = localStorage.getItem('message') ? JSON.parse(localStorage.getItem('message')) : []
        message.length > 0 ? message[message.length] = messageDate : message[0] = messageDate
        
        console.log(message)
        localStorage.setItem('message', JSON.stringify(message))    

        this.state.authorList.set(this.state.author, '');

        const { onTotalPeopleChange } = this.context
        onTotalPeopleChange && onTotalPeopleChange(this.state.authorList.size)

        this.setState({
          submitting: false,
          value: '',
          comments: [
            {
              author: this.state.author,
              content: this.state.value,
              datetime: messageDateTime
              //rowKey: this.state.comments.length
            },
            ...this.state.comments,
          ],
        });
      }
      
      
    }, 1000);
  };

  initComments = () => {
    if(!this.state.init) {
      let authorList = new Map();
      let oldMessage = localStorage.getItem('message') ? JSON.parse(localStorage.getItem('message')) : []
      oldMessage.map((value) => {
        console.log(value)
        let {author, content, datetime} = value
        authorList.set(author, '');
        console.log(authorList);
        this.state.comments = [
          {
            author: author,
            content: content,
            datetime: datetime,
          },
          ...this.state.comments,
        ]
      })
      this.state.authorList = authorList
      const { onTotalPeopleChange } = this.context
      onTotalPeopleChange && onTotalPeopleChange(this.state.authorList.size)
      this.state.init = true
    }
    
  }

  render() {
    this.initComments()

    const { comments, submitting, value, authorList, editId, editComment } = this.state;
    console.log('editId = '+editId)
    if(this.state.loading) {
      return (
        <div>
          <Spin />
          <MessageForm            
              onSubmitEvent={this.handleSubmit}
              submitting={submitting}
              value={value}
              editId={editId}
              editComment={editComment}
            />
        </div>
      );
    }
    return (
      <div>
        <BoardContext.Provider
            value={{
              editComments: this.editComments,
              removeComments: this.removeComments
            }}
          >
          {comments.length > 0 && 
            <MessageList 
            comments={comments} 
          />}
        <MessageForm            
              onSubmitEvent={this.handleSubmit}
              submitting={submitting}
              value={value}
              editId={editId}
              editComment={editComment}
            />
        </BoardContext.Provider>
        
      </div>
    );
  }

  componentDidMount() {
    // like calling an api
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 3000)
  }
}
