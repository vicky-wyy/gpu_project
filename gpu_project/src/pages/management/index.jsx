import React, { Component } from 'react'
import { 
  Button, 
  Layout, 
  message, 
  Tabs, 
  Form, 
  Input, 
  Card,
  Table,
  Popconfirm,
  Modal
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import 'braft-extensions/dist/code-highlighter.css'

BraftEditor.use()

const { TabPane } = Tabs;
const token = localStorage.getItem('token')

function createMarkup(html){
  return { __html: html }
}
export default class Management extends Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
    loading: false,
    articles: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    }
  }
  formRef = React.createRef();
  getArticles =async (current_page=1)=>{
    const { pagination } = this.state
    const data = {'page':current_page, 'per_page': pagination.pageSize};
    // const token = localStorage.getItem('token');
    this.setState({
      loading: true,
    });
    await axios({
      method: 'get',
      url: 'http://10.0.76.190:5000/api/v1/articles',
      params: data,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    })
    .then(response => {
      const res = response.data
      this.setState({
        loading: false,
        articles: res.items,
        pagination: {
          ...pagination,
          total: res.total_items,
          current: current_page
        }
      })
    })
    .catch(error => {
      message.error('请求失败');
      console.log(error);
    })
  }
  
  getUser =async ()=>{
    const data = JSON.stringify({});
    const token = localStorage.getItem('token');
    await axios({
      method: 'get',
      url: '/api1/api/v1/auth/user',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    })
    .then(response => {
      message.success('请求成功');
      console.log(response);
    })
    .catch(error => {
      message.error('请求失败');
      console.log(error);
    })
  }

  handleEditorChange = (editorState)=>{
    this.setState({
      editorState
    })
  }

  /* 发布文章时的调用 */
  onFinish = async (values)=>{
    if(this.state.editorState.isEmpty()){
      message.warning('请先输入内容')
      return
    }
    const htmlContent = this.state.editorState.toHTML()
    const data = {'title': values.title, 'article_content': htmlContent}
    const data1 = qs.stringify(data)
    // const token = localStorage.getItem('token')
    await axios({
      method: 'post',
      url: '/api1/api/v1/articles',
      data: data1,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      const res = response.data
      if(res.status==='success'){
        console.log(res)
        message.success('上传成功');
        this.formRef.current.resetFields();
      }
    })
    .catch(error => {
      message.error('上传失败');
    })
  }
  /* 重置文章按钮 */
  onReset = ()=>{
    this.formRef.current.resetFields();
  }
  /* 编辑文章 */
  editArticle = async (record)=>{
    const article_id = record.article_id
    const title = record.title
    const article_content = record.article_content
    await axios({
      method: 'put',
      url: `/api1/api/v1/articles/${article_id}`,
      headers: {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }
    })
    .then(response => {
      const res = response.data
      console.log(res)
      // if(res===''){
      //   message.success('删除成功');
      //   this.getArticles();
      // }
    })
    .catch(error => {
      message.error('删除失败');
    })
  }
  /* 查看文章 */
  viewArticle = ()=>{
    console.log('查看文章');
  }
  /* 删除文章 */
  confirmDel = async(record)=>{
    await axios({
      method: 'delete',
      url: `/api1/api/v1/articles/${record.article_id}`,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      const res = response.data
      console.log(res)
      if(res===''){
        message.success('删除成功');
        this.getArticles();
      }
    })
    .catch(error => {
      message.error('删除失败');
    })
  }
  /* table分页 */
  onTableChange = async(page)=>{
    await this.setState({
      pagination: page
    })
    this.getArticles(page.current)
  }
  /* 获取文章内容 */
  componentDidMount = ()=>{
    this.getArticles();
  }
  /* 更新文章时重新加载 */
  componentDidUpdate(prevProps) {
    if(this.props.articles !== prevProps.articles) {
      this.getArticles(this.state.pagination.current)
    }
  }
  render() {
    const { editorState, loading, articles, pagination } = this.state
    const columns = [
      {
        title: '序号',
        dataIndex: 'article_id',
        width: '10%',
        align: 'center'
      },
      {
        title: '标题',
        dataIndex: 'title',
        align: 'center',
        width: '20%'
      },
      {
        title: '内容',
        dataIndex: 'article_content',
        align: 'center',
        render: (text,record) => (
          <div dangerouslySetInnerHTML={createMarkup(text)}></div>
        )
      },
      {
        title: '操作',
        width: 300,
        align: 'center',
        render: (text,record)=> (
          <div>
            <Button type='link' onClick={()=>this.editArticle(record)}>编辑</Button>
            <Button type='link' className='text-green-300 hover:text-green-400' onClick={()=>this.viewArticle(record)}>查看</Button>
            <Popconfirm 
              title='您确定删除该条文章吗？'
              onConfirm={()=>this.confirmDel(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button type='link' danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    return (
      <Layout className='m-3 bg-white rounded shadow-md p-4'>
        <Tabs
          defaultActiveKey='1'
        >
          <TabPane tab='用户管理' key='1'>

          </TabPane>
          <TabPane tab='新闻管理' key='2'>
            <Tabs tabPosition='left'>
              <TabPane tab='发布文章' key='1'>
                <Card
                  title="发布文章"
                  hoverable
                  className='rounded-md shadow-sm m-1'
                >
                  <Form
                    onFinish={this.onFinish}
                    ref={this.formRef}
                  >
                    <Form.Item
                      label='文章标题'
                      name='title'
                      rules={[
                        {
                          required: true,
                          message: '请输入文章标题'
                        }
                      ]}
                    >
                      <Input className='rounded-md shadow-sm' />
                    </Form.Item>
                    <Form.Item
                      label='文章内容'
                      name='content'
                      rules={[
                        {
                          required: true,
                          message: '请输入文章内容'
                        }
                      ]}
                    >
                      <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        contentStyle={{height:300}}
                        className='rounded-md shadow-sm border'
                      />
                    </Form.Item>
                    <Form.Item>
                      <div className='flex space-x-4 float-right'>
                        <Button type='primary' htmlType='submit' className='rounded-md'>上传</Button>
                        <Button type='primary' ghost className='rounded-md' onClick={this.onReset}>重置</Button>
                      </div>
                    </Form.Item>
                  </Form>
                </Card>
              </TabPane>
              <TabPane tab='文章管理' key='2'>
                <Table
                  bordered
                  rowKey='article_id'
                  loading={loading}
                  dataSource={articles}
                  columns={columns}
                  scroll={{ x:768 }}
                  pagination={pagination}
                  onChange={this.onTableChange}
                >
                </Table>
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
        <EditArticleModal />
      </Layout>
    )
  }
}
