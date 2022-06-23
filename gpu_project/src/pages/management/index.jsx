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
  Upload,
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import FormData from 'form-data';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import 'braft-extensions/dist/code-highlighter.css';
import { InboxOutlined } from '@ant-design/icons';
import { unauthorized } from '@/utils/session';
import LoadableComponent from '@/utils/LoadableComponent';

const ArticleForm = LoadableComponent(() => import('./article-form'));
const ArticleDetailForm = LoadableComponent(() => import('./article-detail-form'));
const VideoForm = LoadableComponent(() => import('./video-form'));
// const PictureWall = LoadableComponent(() => import('./picture-wall'))

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
    videos: [],
    fileList: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    videoPagination: {
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
      if(error.response){
        const res = error.response
        if(res.status===400){
          message.error('您没有权限退出');
        }else if(res.status===401){
          message.error('Token无效或者过期');
          unauthorized();
        }else {
          message.error('服务器错误，请稍后再试')
        }
      }
    })
  }

  getVideos = async (current_page=1)=>{
    const { videoPagination } = this.state;
    const data = {'page':current_page, 'per_page': videoPagination.pageSize};
    this.setState({
      loading: true,
    });
    await axios({
      method: 'get',
      url: '/api1/api/v1/videos',
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
          videos: res.items,
          videoPagination: {
            ...videoPagination,
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
    console.log(token)
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
  editArticle = ()=>{
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
  /* article的table分页 */
  onTableChange = async(page)=>{
    await this.setState({
      pagination: page
    })
    this.getArticles(page.current)
  }
  /* 获取文章内容 */
  componentDidMount = ()=>{
    this.getArticles();
    this.getVideos();
  }
  /* 更新文章时重新加载 */
  componentDidUpdate(prevProps) {
    if(this.props.articles !== prevProps.articles) {
      this.getArticles(this.state.pagination.current)
    }
    if(this.props.videos !== prevProps.videos) {
      this.getVideos(this.state.videoPagination.current)
    }
  }

  /**
   * 视频的一系列操作
   * @returns 
   */
  pw = React.createRef();

  /** 上传视频 */
  uploadVideo = ()=>{
    this.pw.current.validateFields()
      .then(async(values) => {
        if(!this.state.fileList.length){
          message.warning('请选择要上传的文件');
        }
        var data = new FormData();
        data.append('files[]', this.state.fileList[0].originFileObj);
        data.append('title', values.title);
        this.setState({
          loading: true
        })
        await axios({
          method: 'post',
          url: '/api1/api/v1/videos',
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          data: data
        }).then(response => {
          if(response.status===201){
            message.success('上传成功');
            this.getVideos();
            this.pw.current.resetFields();
          }
        }).catch(error => {
          console.log(error);
          message.error('上传失败');
        }).finally(()=> {
          this.setState({
            loading: false
          })
        })
      })
      .catch( error => {
        console.log(error);
        console.log('视频操作失败');
      })
  }
  /** 编辑视频Modal */
  editVideoModal = (record)=>{
    this.video_record = record
    this.setState({
      isShow: 3
    })
  }
  /** 编辑视频 */
  editVideo = ()=>{
    this.form.current.validateFields()
      .then(async(values) => {
        console.log(values)
        this.setState({
          isShow: 0,
          loading: true
        })
        var data = new FormData();
        data.append('files[]', values.content[0].originFileObj);
        data.append('title', values.title);
        const video_record = this.video_record
        await axios({
          method: 'put',
          url: `/api1/api/v1/videos/${video_record.video_id}`,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        }).then(response => {
          if(response.status===200){
            message.success('视频更新成功');
            this.setState({
              loading: false
            })
            this.getVideos();
          }
          console.log(response)
        }).catch(error => {
          message.error('视频更新失败');
          this.setState({
            loading: false
          })
          console.log(error)
        })
      })
      .catch( error => {
        console.log('视频操作失败');
        console.log(error)
        this.setState({
          loading: false
        })
      })
  }
  /** 下载视频 */
  downVideo = async (record)=>{
    this.setState({
      loading: true,
    });
    await axios({
      method: 'get',
      url: `/api1/api/v1/videos/stream/${record.video_filepath}`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    })
    .then(response => {
      console.log(response)
      if(response.status===200){
         this.setState({
          loading: false,
        })
        message.success('下载成功')
      }
    })
    .catch(error => {
      message.error('下载失败');
      console.log(error);
    })
  }
  /** 删除视频 */
  confirmVideoDel = async(record)=>{
    await axios({
      method: 'delete',
      url: `/api1/api/v1/videos/${record.video_id}`,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response)
      if(response.status===204){
        message.success('删除成功');
        this.getVideos();
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

  onVideoTableChange = async(page)=>{
    await this.setState({
      videoPagination: page
    })
    this.getVideos(page.current)
  }

  handleFileChange =({file, fileList}) => [
    this.setState({
      'fileList': fileList.length ? [fileList[fileList.length - 1]] : []
    })
  ]
  render() {
    const { editorState, loading, articles, pagination, isShow, videos, videoPagination, fileList } = this.state
    const article_record = this.article_record || {}
    const video_record = this.video_record || {}
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
    const videoColumns = [
      {
        title: '序号',
        dataIndex: 'video_id',
        width: '10%',
        align: 'center'
      },
      {
        title: '标题',
        dataIndex: 'title',
        align: 'center',
        width: '10%'
      },
      {
        title: '文件路径',
        dataIndex: 'video_filepath',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        align: 'center'
      },
      {
        title: '操作',
        width: 300,
        align: 'center',
        render: (text,record)=> (
          <div>
            <Button type='link' onClick={()=>this.editVideoModal(record)}>编辑</Button>
            <Button type='link' className='text-green-300 hover:text-green-400' onClick={()=>this.downVideo(record)}>下载</Button>
            <Popconfirm 
              title='您确定删除该条视频吗？'
              onConfirm={()=>this.confirmVideoDel(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button type='link' danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    const normFile = (e) => {
      console.log('Upload event:', e);
      this.setState({
        fileContent: e.fileList
      })
      if (Array.isArray(e)) {
          return e;
      }
      return e && e.fileList;
    };
    const beforeUpload = ({ fileList }) => {
      return false;
    }
    return (
      <Layout className='m-3 bg-white rounded shadow-md p-4'>
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
                  scroll={{ x:768 }}
                  pagination={pagination}
                  onChange={this.onTableChange}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab='视频管理' key='3'>
            <Tabs tabPosition='left'>
              <TabPane tab='发布视频' key='1'>
              <Card
                  title="发布视频"
                  hoverable
                  className='rounded-md shadow-sm m-1'
                >
                <Form onFinish={this.uploadVideo} ref={this.pw}>
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
                        message: '请上传视频'
                      }
                    ]}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Dragger 
                      beforeUpload={beforeUpload} 
                      fileList={fileList} 
                      onChange={this.handleFileChange}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">单击或拖动文件到该区域进行上传</p>
                    </Dragger>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='float-right px-4'>上传</Button>
                  </Form.Item>
                </Form>
              </Card>
              </TabPane>
              <TabPane tab='视频管理' key='2'>
                <Table
                  bordered
                  rowKey='video_id'
                  loading={loading}
                  dataSource={videos}
                  columns={videoColumns}
                  scroll={{ x:768 }}
                  pagination={videoPagination}
                  onChange={this.onVideoTableChange}
                />
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
              isShow: 0
            })
          }}
        >
          <ArticleForm
            setForm={form => this.form = form}
            article_record={article_record}
          />
        </Modal>
        <Modal
          title='编辑视频'
          destroyOnClose
          visible={isShow===3}
          onOk={this.editVideo}
          onCancel={()=>{
            this.setState({
              isShow: 0
            })
          }}
        >
          <VideoForm
            setForm={form => this.form = form}
            video_record={video_record}
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
