import React from "react";

import { Button } from "@mui/base/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import styles from "./LoginForm.module.css";

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

  const onSubmit: SubmitHandler<LoginFromInputs> = (data) => console.log(data);

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h1>Войти на сайт</h1>
        <div>
          <label htmlFor="email">Email</label>
          <BaseInput {...register("email")} />
          {errors.email && <span>Обязательное поле</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <BaseInput {...register("password")} />
          {errors.password && <span>Обязательное поле</span>}
        </div>
        <Button className="ok_btn" onClick={handleSubmit(onSubmit)}>
          Отправить
        </Button>
      </form>
    </div>
  );
};
