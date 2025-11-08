import { useState } from "react";

const LoginLogic = () => {
  const [form, setForm] = useState({
    noHP: "",
    pass: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (err) => {
    err.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert(`${data.message}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return { form, change, handleSubmit };
};

export default LoginLogic;
