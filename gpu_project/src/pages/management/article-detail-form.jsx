import React, { Component } from 'react'
import { Form } from 'antd'

export default class ArticleDetailForm extends Component {
  render() {
    const {view_article} = this.props
    return (
      <Form>
        <Form.Item
          label='文章标题'
          initialValue={view_article.title}
          className='font-semibold'
        >
          <span className='font-normal'>{view_article.title}</span>
        </Form.Item>
        <Form.Item
          label='文章内容'
          initialValue={view_article.article_content.replace(/<[^<>]+>/g,"")}
          className='font-semibold'
        >
          <span className='font-normal'>{view_article.article_content.replace(/<[^<>]+>/g,"")}</span>
        </Form.Item>
        <Form.Item
          label='创建人'
          initialValue={view_article.author.email}
          className='font-semibold'
        >
          <span className='font-normal'>{view_article.author.email}</span>
        </Form.Item>
        <Form.Item
          label='创建时间'
          initialValue={view_article.created_at}
          className='font-semibold'
        >
          <span className='font-normal'>{view_article.created_at}</span>
        </Form.Item>
        <Form.Item
          label='更新者'
          initialValue={view_article.updater.email}
          className='font-semibold'
        >
          <span className='font-normal'>{view_article.updater.email}</span>
        </Form.Item>
        <Form.Item
          label='更新时间'
          initialValue={view_article.updated_at}
          className='font-semibold'
        >
          <span className='font-normal'>{view_article.updated_at}</span>
        </Form.Item>
      </Form>
    )
  }
}
