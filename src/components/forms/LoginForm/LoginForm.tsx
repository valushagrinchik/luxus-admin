import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { useAuth } from "../../../lib/auth";
import { Button } from "../../../controls/Button/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../controls/TextField";

type LoginFromInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFromInputs>();
  let { signin } = useAuth();

  const [submitError, setSubmitError] = useState("");
  let navigate = useNavigate();

  const submit: SubmitHandler<LoginFromInputs> = async (data) => {
    try {
      await signin(data);
    } catch (err: any) {
      setSubmitError(err?.message[0]);
      return;
    }

    navigate("/");
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h1>Войти на сайт</h1>
        <div>
          <label htmlFor="email">Email</label>
          <TextField {...register("email")} style={{ width: "100%" }} />
          {errors.email && <span>Обязательное поле</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <TextField {...register("password")} style={{ width: "100%" }} />
          {errors.password && <span>Обязательное поле</span>}
        </div>
        {submitError && submitError}
        <Button color="base" onClick={handleSubmit(submit)}>
          Отправить
        </Button>
      </form>
    </div>
  );
};
