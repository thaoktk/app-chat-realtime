import { Form, Input, Modal, Progress } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { storage } from "../../firebase/config";
import { addDocument } from "../../firebase/service";

function AddRoomModal() {
  const [imgUrl, setImgUrl] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();

  const inputFileRef = useRef(null);

  const handleOk = () => {
    const { name, description } = form.getFieldValue();
    if (!name || !description) return;

    const imageRoomPhoto = imgUrl !== "" ? imgUrl : null;

    addDocument("rooms", {
      ...form.getFieldValue(),
      members: [user.uid],
      roomPhotoURL: imageRoomPhoto,
    });
    form.resetFields();
    inputFileRef.current.value = null;
    setImgUrl("");
    setProgressPercent(0);
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    inputFileRef.current.value = null;
    setImgUrl("");
    setProgressPercent(0);
    setIsAddRoomVisible(false);
  };

  const handleClick = () => {
    if (imgUrl) return;
    if (!imgUpload) return;
    const storageRef = ref(storage, `images/${imgUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" maxLength={15} />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea
              placeholder="Nhập mô tả"
              maxLength={20}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <div>
            <div className="mb-2">Ảnh phòng (không bắt buộc)</div>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="w-full border outline-none p-2 mb-3"
            />
            <div className="flex items-center justify-between">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="border-none outline-none bg-transparent"
                ref={inputFileRef}
                onChange={(e) => setImgUpload(e.target.files[0])}
              />
              <button onClick={handleClick} className="border px-2 py-1">
                Upload
              </button>
            </div>
            {imgUrl === "" && <Progress percent={progressPercent} />}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddRoomModal;
