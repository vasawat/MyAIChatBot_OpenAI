import { Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import environment from "../environments/environment";

export default function WithJson(params) {
  // const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList?.map((file) => ({
      ...file,
    }));
  };

  return (
    <>
      <Form
        layout="inline"
        name="formWithJson"
        labelCol={{}}
        wrapperCol={{}}
        style={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="jsonFile"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload an json",
            },
          ]}
          help="* Accept only JSON files"
        >
          <Upload
            maxCount={1}
            customRequest={dummyRequest}
            beforeUpload={(file) => {
              const isJSON = file.type === "application/json";
              if (!isJSON) {
                message.error("You can only upload JSON file!");
              }
              return isJSON || Upload.LIST_IGNORE;
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
