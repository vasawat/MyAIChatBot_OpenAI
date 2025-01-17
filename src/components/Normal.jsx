import { Button, Form, Input } from "antd";
import axios from "axios";
import environment from "../environments/environment";

export default function Normal(params) {
  const { setDataTest, dataTest } = params;
  const onFinish = async (values) => {
    console.log(values.context);
    try {
      const response = await axios.post(
        environment.apiUrl + "/api/ask",
        values
      );

      await setDataTest([
        ...dataTest,
        values.context,
        response.data.choices[0].message.content,
      ]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="formNormal"
        labelCol={{}}
        wrapperCol={{}}
        style={{
          maxWidth: "100%",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="context"
          style={{
            width: "100%",
          }}
          rules={[
            {
              required: true,
              message: "Please input your text!",
            },
          ]}
        >
          <Input placeholder="Massage ChatGPT" />
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
