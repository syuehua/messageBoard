
import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Popconfirm } from 'antd';
import { BoardContext } from '../MessageBoard/BoardContext'


export class IconText extends React.Component {

  static contextType = BoardContext

  onReomve = id => {
    const { removeComments } = this.context
    removeComments && removeComments(id)
  }

  onEdit = id => {
    const { editComments } = this.context
    editComments && editComments(id)  
  }

  render() {

    const { type, id } = this.props;
    
    if(type == 'delete') {
      return (
        <span>
          <Popconfirm
            title="Are you sure？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={this.onReomve.bind(null, id)}
          >
            <Icon type={type} style={{ marginRight: 8 }} id={id} />
          </Popconfirm>
        </span>
      );
    } else if (type == 'edit') {
      return (
        <span>
          <Icon type={type} style={{ marginRight: 8 }} id={type+id} onClick={this.onEdit.bind(null, id)}/>
        </span>
      );
    }
  }
}
