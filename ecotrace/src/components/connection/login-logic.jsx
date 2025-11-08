import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginLogic = (setUser) => {
  const navigate = useNavigate();
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
      if (data.succeed) {
        navigate("/dashboard");
        setUser(data.user);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return { form, change, handleSubmit };
};

export default LoginLogic;
