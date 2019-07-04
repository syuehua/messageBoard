import { Form, Button, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const { TextArea } = Input;

export class MessageForm extends React.Component {

  state = {
    author: "",
    content: "",
    editText: "Add Comment",
    editState: false
  }

  onSubmit = e => {
    console.log('onSubmit')
    console.log(this.props.onSubmitEvent)
    
    this.props.onSubmitEvent(this.state)

    this.state.author = ''
    this.state.content = ''
    this.state.editText = 'Add Comment'
    this.state.editState = false
    
  }

  onChangeAuthor = e => {
    this.setState({
      author : e.target.value
    })
  }

  onChangeContent = e => {
    this.setState({
      content : e.target.value
    })
  }

  render() {
    const { submitting, editId, editComment } = this.props
    if(editId > -1 && !this.state.editState) {
      console.log('edit = '+editComment)
      this.state.author = editComment.author
      this.state.content = editComment.content
      this.state.editText = 'Edit Comment'
      this.state.editState = true
    } 
    return (
      <div>
      <Form.Item>
        <Input onChange={this.onChangeAuthor} placeholder="請輸入暱稱" value={this.state.author}></Input>
        <TextArea rows={4} onChange={this.onChangeContent} placeholder="請輸入留言"  value={this.state.content}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={this.onSubmit} type="primary">
          {this.state.editText}
        </Button>
      </Form.Item>
    </div>
    );
  }
}