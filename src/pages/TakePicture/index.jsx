import { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Image, Input } from 'antd-mobile';
import { getQueues } from '@/api/t2i.js';
import LoadingView from '@components/loading/index.jsx';
import { t2iAddr } from '@/api/common.js';

function TakePictureCmp() {
  const [form] = Form.useForm();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState('');
  const code = params.get('id') ?? '';
  const [qId, oId] = code.split('$');
  const [queueId, setQueueId] = useState(qId);
  const [outputId, setOutputId] = useState(oId);

  useEffect(() => {
    const checkQueue = () => {
      getQueues()
        .then(res => {
          const { queue_pending, queue_running } = res;
          if (queue_pending.find(item => item[1] === queueId)) {
            setDesc(
              `等待中，队列位置${
                queue_pending.findIndex(item => item[1] === queueId) + 1
              }，请稍等`
            );
          } else if (queue_running.find(item => item[1] === queueId)) {
            setDesc('进行中，请稍等，大概需要15秒左右');
          } else {
            setDesc('已完成');
            setLoading(false);
            clearInterval(timer);
          }
        })
        .catch(() => {
          clearInterval(timer);
        });
    };
    const timer = setInterval(() => {
      checkQueue(timer);
    }, 3000);
    checkQueue(timer);
    return () => {
      clearInterval(timer);
    };
  }, [queueId]);
  const onValuesChange = () => {
    const [qId, oId] = form.getFieldValue('code').split('$');
    setQueueId(qId);
    setOutputId(oId);
    setLoading(true);
  };
  return (
    <Form layout='horizontal' form={form} initialValues={{ code }}>
      <Form.Item label='取图码' name='code'>
        <Input placeholder='请输入取图码' clearable onBlur={onValuesChange} />
      </Form.Item>
      <Form.Item label={'状态'}>
        <div>{desc}</div>
      </Form.Item>
      <Form.Item label={'图片'}>
        {loading ? (
          <LoadingView />
        ) : (
          <Image src={`${t2iAddr}/res/${outputId}_00001_.png`} fit={'cover'} />
        )}
      </Form.Item>
    </Form>
  );
}
const TakePicture = memo(TakePictureCmp);
export default TakePicture;
