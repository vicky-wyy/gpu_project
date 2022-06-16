import React, { Component } from 'react'
import { Card, List } from 'antd';
import './index.less';
export default class ModifyPassword extends Component {
  render() {
    return (
      <Card
        className='shadow-lg rounded-md border-gray-200 m-4'
        title='我的账户'
      >
        <h1 className='font-semibold text-sm'>基础信息</h1>
        <List>
          
        </List>
        {/* <table class="mt-4 block border border-gray-300 rounded-md">
          <tbody>
            <tr>
              <th>
                <label for="category_id">分类</label>
              </th>
              <td>
                <select class="border border-gray-300 w-32 rounded h-8 ml-1.5">
                  <option value="请选择">(请选择)</option>
                  <option value="所有项目">所有项目</option>
                  <option value="项目一">项目一</option>
                  <option value="项目二">项目二</option>
                  <option value="项目三">项目三</option>
                  <option value="项目四">项目四</option>
                  <option value="项目五">项目五</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label for="category_frequency">出现频率</label>
              </th>
              <td>
                <button id="suspendButton-one" onclick="suspendButtononClick(this);">100%复现</button>
                <button id="suspendButton-two" onclick="suspendButtononClick(this);">总是</button>
                <button id="suspendButton-three" onclick="suspendButtononClick(this);">有时</button>
                <button id="suspendButton-four" onclick="suspendButtononClick(this);">随机</button>
                <button id="suspendButton-five" onclick="suspendButtononClick(this);">仅一次</button>
              </td>
            </tr>
            <tr>
              <th>
                <label for="serious_question">严重性</label>
              </th>
              <td>
                <button id="seriousButton-one" onclick="seriousButtononClick(this);">轻微问题</button>
                <button id="seriousButton-two" onclick="seriousButtononClick(this);">普通问题</button>
                <button id="seriousButton-three" onclick="seriousButtononClick(this);">严重问题</button>
                <button id="seriousButton-four" onclick="seriousButtononClick(this);">致命问题</button>
              </td>
            </tr>
            <tr>
              <th>
                <label for="priority">优先级</label>
              </th>
              <td>
                <button id="priorityButton-one" onclick="priorityButtononClick(this);">无</button>
                <button id="priorityButton-two" onclick="priorityButtononClick(this);">低</button>
                <button id="priorityButton-three" onclick="priorityButtononClick(this);">中</button>
                <button id="priorityButton-four" onclick="priorityButtononClick(this);">高</button>
                <button id="priorityButton-five" onclick="priorityButtononClick(this);">紧急</button>
                <button id="priorityButton-six" onclick="priorityButtononClick(this);">非常紧急</button>
              </td>
            </tr>
            <tr>
              <th>
                <label for="platform">平台配置</label>
              </th>
              <td>
                <select class="border border-gray-300 w-32 rounded h-8 ml-1.5">
                  <option value="请选择">(请选择)</option>
                  <option value="Windows">Windows</option>
                  <option value="Debian">Debian</option>
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="RedHat">RedHat</option>
                  <option value="Centos">Centos</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label for="assign">分派给</label>
              </th>
              <td>
                <select class="border border-gray-300 w-32 rounded h-8 ml-1.5">
                  <option value="请选择">(请选择)</option>
                  <option value="vicky">vicky</option>
                  <option value="lili">lili</option>
                  <option value="lucy">lucy</option>
                  <option value="tom">tom</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table> */}
      </Card>
    )
  }
}
