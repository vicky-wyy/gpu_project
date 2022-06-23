import React, { Component } from 'react'
import { Upload, Modal } from 'antd';

const { Dragger } = Upload;
export default class PictureWall extends Component {

  state = {
    previewVisible: false, // 标识是否显示大图预览Modal
    previewImage: '', // 大图的url
    fileList: [],
  }

  constructor(props){
    super(props)
    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList:[] // 所有已上传图片的数组
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file)=>{
    console.log('handlePreview()',file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = async ({file,fileList})=>{
    console.log(file)
    console.log('handlechange',file.status,fileList.length, file===fileList[fileList.length-1])
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div>
        <Dragger
          action="/api1/api/v1/videos" /*上传图片的接口地址*/
          name='image' /*请求参数名*/
          listType='picture-card'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到该区域进行上传</p>
        </Dragger>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
