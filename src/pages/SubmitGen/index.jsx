import { Button, ImageUploader, ImageViewer, Toast } from 'antd-mobile';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AddOutline } from 'antd-mobile-icons';
import GenButton from '@components/GenButton/index.jsx';
import { queueT2I, uploadImage } from '@/api/t2i.js';
import { copyTextToClipboard } from '@/utils/common.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { t2iAddr } from '@/api/common.js';

function SubmitGenCmp() {
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  let fileName = useRef('');
  const onUploadImage = useCallback(async file => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('overwrite', 'true');
    const data = await uploadImage(formData);
    return { url: URL.createObjectURL(file), name: data?.name };
  }, []);
  const [params] = useSearchParams();
  const templateId = params.get('id') ?? 'test';
  const submit = useCallback(() => {
    if (!fileName.current) {
      Toast.show({ content: '请先上传图片', position: 'bottom' });
      return;
    }
    setSubmitting(true);
    queueT2I({
      template_id: templateId,
      images: { 13: fileName.current },
      type: 't2i',
    }).then(res => {
      setSubmitting(false);
      if (res.data) {
        const { prompt_id, output_prefix } = res.data;
        const picId = `${prompt_id}$${output_prefix}`;
        copyTextToClipboard(picId);
        Toast.show({ content: '取图码已复制，请妥善保管', position: 'bottom' });
        navigate('/take-picture?id=' + picId, { replace: true });
      } else {
        Toast.show({ content: res.msg, position: 'bottom' });
      }
    });
  }, [navigate, templateId]);
  const imgUploadStyle = useMemo(() => {
    return {
      width: 160,
      height: 160,
      borderRadius: 40,
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }, []);
  const fileChange = useCallback(list => {
    fileName.current = list[0]?.name;
    setFileList(list);
  }, []);
  const showDemoImage = () => {
    ImageViewer.show({
      image: `${t2iAddr}/res/template_cover/${templateId}.jpg`,
    });
  };
  return (
    <div>
      <div className={'flex flex-col items-center mt-10'}>
        <div className={'text-xl mb-10'}>请上传要生成的人像照片</div>
        <Button onClick={showDemoImage}>样张预览</Button>
        <div className={'mt-10'} />
        <ImageUploader
          value={fileList}
          style={{ '--cell-size': '160px' }}
          onChange={fileChange}
          maxCount={1}
          showUpload={fileList.length < 1}
          upload={onUploadImage}>
          <div style={imgUploadStyle}>
            <AddOutline style={{ fontSize: 32 }} />
          </div>
        </ImageUploader>
      </div>
      <div className={'flex justify-center mt-14'}>
        <GenButton txt={'开 始 生 成'} onClick={submit} loading={submitting} />
      </div>
    </div>
  );
}

export default SubmitGenCmp;
