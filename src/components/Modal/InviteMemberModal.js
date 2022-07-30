import { Avatar, Form, Modal, Select, Spin } from "antd";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { db } from "../../firebase/config";
import { updateDocument } from "../../firebase/service";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      // value là cái giá trị dc search
      fetchOptions(value, props.curmembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout, props.curmembers]);

  return (
    <Select
      // labelInValue
      onFocus={() => setOptions([])}
      filterOption={false} // để tránh so sánh 1 lần nữa
      // khi mà search thì cái value mà dc search sẽ truyền vào cái debounceFetcher
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => {
        // { label, value, photoURL}
        return (
          <Select.Option
            key={option.value}
            value={option.value}
            title={option.label}
          >
            <Avatar size="small" src={option.photoURL} className="mr-3">
              {!option.photoURL && option.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {`${option.label}`}
          </Select.Option>
        );
      })}
    </Select>
  );
}

// fetchOption, value của fetchOption sẽ là cái search dc truyền vào
async function fetchUserList(search, curMembers) {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("keywords", "array-contains", search),
    // orderBy("displayName"),
    limit(20)
  );

  return getDocs(q).then((snapshot) => {
    return snapshot.docs
      .map((doc) => ({
        label: doc.data().displayName,
        photoURL: doc.data().photoURL,
        value: doc.data().uid,
      }))
      .filter((doc) => !curMembers.includes(doc.value)); // lọc ra những thằng đã có trong phòng r
  });
}

function InviteMemberModal() {
  const [value, setValue] = useState([]);
  const {
    roomSelected,
    selectedRoomId,
    isInviteMemberVisible,
    setIsInviteMemberVisible,
  } = useContext(AppContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    const userAdd = value.map((val) => {
      return {
        uid: val,
        nickName: null,
      };
    });
    const roomAddUsers = {
      ...roomSelected,
      members: [...roomSelected.members, ...userAdd],
      membersId: [...roomSelected.membersId, ...value],
    };

    updateDocument("rooms", selectedRoomId, roomAddUsers);

    setValue([]);
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    setValue([]);
    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title="Mời bạn"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curmembers={roomSelected?.members} // uid của các member
          />
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMemberModal;
