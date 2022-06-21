import React, { Component } from 'react'
import { Form, Input } from 'antd'

const {TextArea} = Input;
export default class ArticleForm extends Component {
  formRef = React.createRef()

  UNSAFE_componentWillMount() {
    this.props.setForm(this.formRef)
  }
  render() {
    const {article_record} = this.props
    return (
      <Form ref={this.formRef}>
        <Form.Item
          name='title'
          label="文章标题"
          initialValue={article_record.title}
          rules={[
            {
              required: true,
              message: '请输入文章标题'
            }
          ]}
          hasFeedback
        >
          <Input placeholder='请输入文章标题' allowClear className='rounded-md'/>
        </Form.Item>
        <Form.Item
          name='article_content'
          label="文章内容"
          initialValue={article_record.article_content.replace(/<[^<>]+>/g,"")}
          rules={[
            {
              required: true,
              message: '请输入文章内容'
            }
          ]}
          hasFeedback
        >
          <TextArea placeholder='请输入文章内容' rows={6} allowClear className='rounded-md'/>
        </Form.Item>
      </Form>
    )
  }
}

