import { List, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

import { IconText, } from '../IconText'
import './styles/MessageList.css'

export class MessageList extends React.Component {

  render() {
    const { comments } = this.props
    console.log(comments)
    let grid = 0
    return (
      <div>
      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        id='commentsList'
        grid={grid}
        loading={false}
        
        renderItem={(item, key) => (

          <List.Item
            key={item.title}
            actions={[
              <IconText 
                type="delete"
                id={key}
              />,
              <IconText 
                type="edit"
                id={key}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.author}
              description={item.datetime}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
    );
  }
}