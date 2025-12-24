import TagihanLangsung from "../btn-assets/tagigan-langsung";
import TagUser from "../connection/tag-user";
import { useEffect, useState } from "react";

const TagAdm = ({ user, create, setCreate }) => {
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    const Get = async () => {
      const res = await fetch(
        `https://api.ecotrace.id/api/get-tagihan-all-user`
      );
      const temp = await res.json();

      if (temp.succeed) {
        setData(temp.data);
      }
    };
    const Get2 = async () => {
      const res = await fetch(`https://api.ecotrace.id/api/get-user-all`);
      const temp = await res.json();

      if (temp.succeed) {
        setDataAll(temp.data);
      }
    };
    Get();
    Get2();
  }, []);
  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      {create && <TagihanLangsung setCreate={setCreate} data={dataAll} />}
      <TagUser data={data} />
    </div>
  );
};
export default TagAdm;
