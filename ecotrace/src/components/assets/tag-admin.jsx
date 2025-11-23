import CreateTag from "../btn-assets/tag-create";
import TagUser from "../connection/tag-user";
import { useEffect, useState } from "react";

const TagAdm = ({ user, create, setCreate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Get = async () => {
      const res = await fetch(`/api/get-tagihan-all-user`);
      const temp = await res.json();

      if (temp.succeed) {
        setData(temp.data);
      }
    };
    Get();
  }, []);
  return (
    <div className="w-full flex justify-center">
      {create && <CreateTag setCreate={setCreate} />}
      <TagUser data={data} />
    </div>
  );
};
export default TagAdm;
