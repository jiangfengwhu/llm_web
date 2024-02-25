import { ImageUploader } from "antd-mobile";
import { useCallback, useMemo, useRef, useState } from "react";
import { AddOutline } from "antd-mobile-icons";
import GenButton from "../../components/GenButton/index.jsx";
import { queueT2I, uploadImage } from "../../api/t2i.js";

function SubmitGenCmp() {
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  let fileName = useRef("");
  const onUploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("overwrite", "true");
    const data = await uploadImage(formData);
    fileName.current = data?.name;
    return { url: URL.createObjectURL(file) };
  }, []);
  const submit = useCallback(() => {
    setSubmitting(true);
    console.log(fileName.current, "fileName");
    queueT2I({
      template_id: "test",
      images: { 13: fileName.current },
      type: "t2i",
    }).then((res) => {
      console.log(res);
      setSubmitting(false);
    });
  }, []);
  const imgUploadStyle = useMemo(() => {
    return {
      width: 160,
      height: 160,
      borderRadius: 40,
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  }, []);
  return (
    <div>
      <div className={"flex flex-col items-center mt-10"}>
        <div className={"text-xl mb-10"}>请上传要生成的人像照片</div>
        <ImageUploader
          value={fileList}
          style={{ "--cell-size": "90px" }}
          onChange={setFileList}
          maxCount={1}
          showUpload={fileList.length < 1}
          upload={onUploadImage}
        >
          <div style={imgUploadStyle}>
            <AddOutline style={{ fontSize: 32 }} />
          </div>
        </ImageUploader>
      </div>
      <div className={"flex justify-center mt-14"}>
        <GenButton txt={"开 始 生 成"} onClick={submit} loading={submitting} />
      </div>
    </div>
  );
}

export default SubmitGenCmp;
