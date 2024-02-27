import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { useAuth } from "../../../lib/auth";
import { Button } from "../../../controls/Button/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../controls/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../../lib/validation";
import { ErrorMessages } from "../../../lib/constants";

type LoginFromInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginFromInputs>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signin } = useAuth();

  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const submit: SubmitHandler<LoginFromInputs> = async (data) => {
    try {
      await signin(data);
    } catch (err: any) {
      setSubmitError(
        ErrorMessages[err?.error as keyof typeof ErrorMessages] ||
          ErrorMessages.somethingWentWrong
      );
      return;
    }

    navigate("/");
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h1>Plataforma Luxus</h1>
        <div>
          <label htmlFor="email">
            Email<span className={styles.required}>*</span>
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="password">
            Contraseña<span className={styles.required}>*</span>
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="password"
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
              />
            )}
          />
        </div>
        <div className={styles.required}>{submitError && submitError}</div>
        <Button color="base" onClick={handleSubmit(submit)}>
          Ingresar
        </Button>
      </form>
    </div>
  );
};
