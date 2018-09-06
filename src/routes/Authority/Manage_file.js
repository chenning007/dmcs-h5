import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Card, List, Avatar, Upload, message, Icon, Form, Button, Input} from 'antd';
import { routerRedux, Route, Switch } from 'dva/router';
import reqwest from 'reqwest';
 
const source_data = [{
    id: 1, 
    image_address: 'http://localhost:80/image/firstpage/shili1.png',
    description: 'IPT70135/6/7测控节点电路封装盒',
    document_address:'',
    title: '',
    },{
    id: 2,
    image_address: 'http://localhost:80/image/firstpage/shili2.png',
    description: 'IPT10533/10550 3.3V/5.0V非隔离式电源转换',
    document_address:'',
    title: '',
    },{
    id: 3,
    image_address: 'http://localhost:80/image/firstpage/shili3.png',
    description: 'IPT12105 IPCAN总线供电转换模块',
    document_address:'',
    title: '',
    },{
    id: 4,
    image_address: 'http://localhost:80/image/firstpage/shili4.png',
    description: 'IPT22105/22106 IPCAN电源转换节点', 
    document_address:'',
    title: '',
    },{
    id: 5,
    image_address: 'http://localhost:80/image/firstpage/shili5.png',  
    description: 'IPT70540 PCB表贴植锡丝印台',
    document_address:'',
    title: '',
    }
];
const props = {
    name: 'file',
    action: '',
    onChange(info) {
       const status = info.file.status;
       if(status !=='uploading'){
           console.log(info.file, info.fileList);
       }
       if(status === 'done'){
           message.success(`${info.file.name} file uploaded successfully.`);
       }
       else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
       }
    },
};

@connect()
@Form.create()
export default class Manage_file extends PureComponent {
    state={
        data: [], 
        loading: true,
        fileList: [],
        imageList: [],
        uploading: false,
        bu_able_1: false, //是否禁止上传图片
        bu_able_2: false, //是否禁止上传文件
    }
    componentDidMount() {
        this.setState({data: source_data, loading: false});
        if(this.props.location.state === undefined){
           this.props.dispatch(routerRedux.push('manage_list'));
        }
    }
    componentWillUnmount() {
       this.setState({
            data: [], 
            loading: true,
            fileList: [],
            imageList: [],
            uploading: false,
            bu_able_1: false, //是否禁止上传图片
            bu_able_2: false, 
       });
    }
    onChangefile(key) {
       const {dispatch} = this.props;
       /**完成链接操作, 根据key信息反馈到后台，从而删除信息 */
       /**此外需要对data进行操作，将data更新状态，不应该与后台重新访问 */
    }

    handleUpload = () => {
       const { fileList, imageList } = this.state;
       const { form } = this.props;
       const title = form.getFieldValue('title');
       const description = form.getFieldValue('description');
       if(!title || !description) {
           return message.error('未完整输入文档信息!!!');
       }
       const formData = new FormData();
       fileList.forEach((file) => {
           formData.append('file',file);
       })
       imageList.forEach((file) => {
           formData.append('image',file);
       })
       formData.append('title',title);
       formData.append('description',description);
       
       this.setState({uploading: true,});

       reqwest({
            url: '/api/v1/tech_document/addocument',
            method: 'post',
            processData: false,
            data: formData,
    
            success: () => {
            this.setState({
                fileList: [],
                imageList: [],
                uploading: false,
                bu_able_1: false,
                bu_able_2: false,
            });
            message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    }
    /**
     * 
     */
    render() {
        const props1 = {
            action:'/api/v1/tech_document/addocument',
            accept:'image/*',
            //listType: 'picture',
            beforeUpload:(file) => {
                this.setState({bu_able_1:true});
                this.setState(({imageList}) =>({
                    imageList: [...imageList, file]
                }));
            return false;
            },
            fileList: this.state.imageList,
        };
        const props2 = {
            action:'/api/v1/tech_document/addocument',
            beforeUpload:(file) => {
                this.setState({bu_able_2:true});
                this.setState(({fileList})=>({
                    fileList: [...fileList, file]
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        const { getFieldDecorator } = this.props.form;
        const { uploading } = this.state;
        return(
            <div>
                <Card>
                    <List 
                        loading={this.state.loading}
                        header={this.props.location.state !==undefined ? this.props.location.state.title:'未知'}
                        itemLayout='horizontal'
                        dataSource={source_data}
                        renderItem={(item) => (
                            <List.Item actions={[<Button type='danger' onClick={() =>this.onChangefile(item.id)}>删除</Button>]}>
                                <span>
                                <List.Item.Meta 
                                    avatar={<Avatar src={item.image_address} size='large'/>}
                                    title={item.title}
                                />
                                </span>
                                <span style={{marginLeft:200, width:300}} ><h3>{item.description}</h3></span>
                            </List.Item>
                        )}
                    />
                </Card>
                <Card style={{marginTop:28}} title="上传文件">
                    <Upload {...props1}> 
                        <Button disabled={this.state.bu_able_1}>
                            <Icon type="upload"/>
                              上传图片
                        </Button>
                    </Upload> 
                    <Upload {...props2}> 
                        <Button disabled={this.state.bu_able_2}>
                            <Icon type="upload"/>
                              上传文件
                        </Button>
                    </Upload>
                    <Form>
                        <Form.Item 
                            colon={false}
                            labelCol={{span: 4, offset: 0}}
                            wrapperCol={{span: 8, offset: 2}}
                            label={<b>标题:</b>}
                        >
                            {getFieldDecorator('title', {
                                rules: [{ 
                                required: true,
                                message: '输入文档标题', 
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item 
                            colon={false}
                            labelCol={{span: 4, offset: 0}}
                            wrapperCol={{span: 8, offset: 2}}
                            label={<b>描述:</b>}
                        >
                            {getFieldDecorator('description', {
                                rules: [{ 
                                required: true,
                                message: '简要描述内容', 
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>    
                    </Form>
                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={ this.state.imageList.length === 0 || this.state.fileList.length === 0 }
                        loading={uploading}
                    >
                        {uploading ? 'Uploading' : 'Start Upload' }
                    </Button>  
                </Card>
            </div>
        );
    }
}