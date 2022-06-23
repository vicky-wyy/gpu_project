import React, { Component } from 'react'
import { Form, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
export default class VideoForm extends Component {
  formRef = React.createRef()

  UNSAFE_componentWillMount() {
    this.props.setForm(this.formRef)
  }
  render() {
    const { video_record } = this.props;
    const normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
          return e;
      }
      return e && e.fileList;
    };
    const beforeUpload = ({ fileList }) => {
      return false;
    }
    return (
      <Form ref={this.formRef}>
        <Form.Item
          name='title'
          label='视频标题'
          initialValue={video_record.title}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入视频标题'
            }
          ]}
        >
          <Input placeholder='请输入视频标题' allowClear className='rounded-md'/>
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
          <Dragger beforeUpload={beforeUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到该区域进行上传</p>
          </Dragger>
        </Form.Item>
      </Form>
    )
  }
}
