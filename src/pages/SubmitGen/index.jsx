import { Form, ImageUploader } from "antd-mobile";
import { useCallback, useRef, useState } from "react";
import { AddOutline } from "antd-mobile-icons";
import SelectStyle from "./SelectStyle.jsx";
import GenButton from "../../components/GenButton/index.jsx";
import { uploadImage } from "../../api/t2i.js";

function SubmitGenCmp() {
  const [fileList, setFileList] = useState([]);
  let fileName = useRef("");
  const selectStyleRef = useRef(null);
  const onUploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("overwrite", "true");
    const data = await uploadImage(formData);
    fileName.current = data?.name;
    return { url: URL.createObjectURL(file) };
  }, []);
  return (
    <div>
      <Form>
        <Form.Item label="您的照片">
          <ImageUploader
            value={fileList}
            style={{ "--cell-size": "90px" }}
            onChange={setFileList}
            maxCount={1}
            showUpload={fileList.length < 1}
            upload={onUploadImage}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#999999",
              }}
            >
              <AddOutline style={{ fontSize: 32 }} />
            </div>
          </ImageUploader>
        </Form.Item>
      </Form>
      <div className={"flex justify-center mt-14"}>
        <GenButton txt={"开 始 生 成"} />
      </div>
    </div>
  );
}

export default SubmitGenCmp;
