import { useState } from "react";

const RegisLogic = (con, setName) => {
  const [form, setForm] = useState({
    noHP: "",
    nama: "",
    pass: "",
    passConfirm: "",
    email: "",
    alamat: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.succeed) {
        alert(data.message);
        setName("Masuk");
        con(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi");
    }
  };
  return { form, change, handleSubmit };
};

export default RegisLogic;
