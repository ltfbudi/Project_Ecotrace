import { useState } from "react";

const RegisLogic = () => {
  const [form, setForm] = useState({
    noHP: "",
    nama: "",
    pass: "",
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

      const data = res.json();
      alert(data.message);
    } catch (err) {
      alert("Terjadi kesalahan koneksi");
    }
  };

  return { form, change, handleSubmit };
};

export default RegisLogic;
