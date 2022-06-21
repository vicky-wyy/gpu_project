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
  Modal,
  Drawer,
  Upload
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import qs from 'qs';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import 'braft-extensions/dist/code-highlighter.css';
import ArticleForm from './article-form';
import ArticleDetailForm from './article-detail-form';

BraftEditor.use()

const { TabPane } = Tabs;
const { Dragger } = Upload;
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
    },
    isShow: 0
  }
  formRef = React.createRef();
  getArticles =async (current_page=1)=>{
    const { pagination } = this.state
    const data = {'page':current_page, 'per_page': pagination.pageSize};
    this.setState({
      loading: true,
    });
    await axios({
      method: 'get',
      url: '/api1/api/v1/articles',
      params: data,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    })
    .then(response => {
      const res = response.data
      if(response.status===200){
         this.setState({
          loading: false,
          articles: res.items,
          pagination: {
            ...pagination,
            total: res.total_items,
            current: current_page
          }
        })
      }
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

  /* 发布文章 */
  onFinish = async (values)=>{
    if(this.state.editorState.isEmpty()){
      message.warning('请先输入内容')
      return
    }
    const htmlContent = this.state.editorState.toHTML()
    const data = {'title': values.title, 'article_content': htmlContent}
    const data1 = qs.stringify(data)
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
      if(response.status===201){
        message.success('上传成功');
        this.getArticles();
        this.formRef.current.resetFields();
        this.setState({
          editorState: ContentUtils.clear(this.state.editorState)
        })
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
  /* 编辑文章的Modal */
  editArticleModal = (record)=>{
    this.article_record = record
    this.setState({
      isShow: 1
    })
  }
  /* 编辑文章 */
  editArticle = async ()=>{
    this.form.current.validateFields()
      .then(async(values) => {
        this.setState({
          isShow: 0
        })
        const article_record = this.article_record
        const data = {'title':values.title, 'article_content': values.article_content}
        const data1 = qs.stringify(data)
        await axios({
          method: 'put',
          url: `/api1/api/v1/articles/${article_record.article_id}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
          },
          data: data1
        })
        .then(response => {
          if(response.status===200){
            message.success('修改成功');
            this.getArticles();
          }
        })
        .catch(error => {
          if(error.response){
            const res = error.response
            if(res.status===400){
              message.error('验证失败')
            }else if(res.status===401){
              message.error('您没有该操作的权限');
            }else if(res.status===404){
              message.error('文章找不到')
            }else {
              message.error('服务器错误，请稍后再试')
            }
          }else {
            message.error('修改失败');
            console.log(error.message)
          }
        })
      })
  }
  /* 查看文章Drawer */
  viewArticleDrawer = (record)=>{
    this.view_article = record
    this.setState({
      isShow: 2
    })
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
      console.log(response)
      if(response.status===204){
        message.success('删除成功');
        this.getArticles();
      }
    })
    .catch(error => {
      if(error.response){
        const res = error.response
        if(res.status===400){
          message.error('验证失败')
        }else if(res.status===401){
          message.error('您没有该操作的权限');
        }else if(res.status===404){
          message.error('文章找不到')
        }else {
          message.error('服务器错误，请稍后再试')
        }
      }else {
        console.log(error.message)
      }
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

  /**
   * 视频的一系列操作
   * @returns 
   */
  onFinishVideo = async(values)=>{
    console.log(values)
  }
  render() {
    const { editorState, loading, articles, pagination, isShow } = this.state
    const article_record = this.article_record || {}
    const view_article = this.view_article || {}
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
            <Button type='link' onClick={()=>this.editArticleModal(record)}>编辑</Button>
            <Button type='link' className='text-green-300 hover:text-green-400' onClick={()=>this.viewArticleDrawer(record)}>查看</Button>
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
      <Layout className='m-3 bg-white rounded shadow-md p-4 layout-container'>
        <Tabs
          defaultActiveKey='1'
        >
          <TabPane tab='用户管理' key='1'>
            <Table />
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
                  scroll={{ x:768,y:450 }}
                  pagination={pagination}
                  onChange={this.onTableChange}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab='视频管理' key='3'>
            <Tabs tabPosition='left'>
              <TabPane tab='发布视频' key='1'>
               <Form onFinish={this.onFinishVideo}>
                <Form.Item
                  name='title'
                  label='视频名称'
                  rules={[
                    {
                      required: true,
                      message: '请输入视频名称'
                    }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='请输入视频名称' allowClear className='rounded-md'/>
                </Form.Item>
                <Form.Item
                  name='content'
                  label='视频内容'
                  rules={[
                    {
                      required: true,
                      message: '请输入视频名称'
                    }
                  ]}
                >
                  <Dragger style={{ borderRadius: 5}}>
                    <p className='ant-upload-drag-icon'>
                      <InboxOutlined/>
                    </p>
                    <p className='ant-upload-text'>单击或拖动文件到该区域进行上传</p>
                  </Dragger>
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit' className='float-right px-4'>上传</Button>
                </Form.Item>
               </Form>
              </TabPane>
              <TabPane tab='视频管理' key='2'>
              </TabPane>      
            </Tabs>
          </TabPane>
        </Tabs>
        <Modal
          title='编辑文章'
          destroyOnClose
          visible={isShow===1}
          onOk={this.editArticle}
          onCancel={()=>{
            this.setState({
              isShow: false
            })
          }}
        >
          <ArticleForm
            setForm={form => this.form = form}
            article_record={article_record}
          />
        </Modal>
        <Drawer
          title='文章详情'
          closable={false}
          placement='right'
          visible={isShow===2}
          onClose={()=> {
            this.setState({
              isShow: false
            })
          }}
          footer={
            <Button type='primary' ghost onClick={()=>this.setState({isShow:false})} className='float-right'>取消</Button>
          }
        >
          <ArticleDetailForm 
            view_article={view_article}
          />
        </Drawer>
      </Layout>
    )
  }
}
