import React from "react";
import { useHistory } from "react-router-dom";

import Default from "../components/templates/Default";
import TitleBox from "../components/organisms/TitleBox";
import InputText from "../components/atoms/TextInput";
import Button from "../components/atoms/Button";
import List from "../components/molecules/List";
import ListItem from "../components/atoms/ListItem";
import useInput from "../helpers/hooks/useInput";

interface User {
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const history = useHistory();

  const [form, handleChange, resetForm] = useInput({
    username: "Ced",
    email: "cedric.pradels@gmail.com",
    password: "123456",
    confirm: "123456",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirm, username, email } = form;
    if (confirm === password) {
      try {
        await createUser({
          email,
          password,
          username,
        });
        history.push("/signin");
      } catch (error) {
        console.log(error);
      }
    }
    resetForm();
  };

  const createUser = async (userDatas: User) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDatas),
        }
      );

      if (!response.ok) {
        throw Error(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Default>
      <TitleBox title="Sign Up">
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              Username
              <InputText
                name="username"
                onChange={handleChange}
                value={form.username}
                type="text"
              />
            </ListItem>
            <ListItem>
              Email
              <InputText
                name="email"
                onChange={handleChange}
                value={form.email}
                type="email"
              />
            </ListItem>
            <ListItem>
              Password
              <InputText
                name="password"
                onChange={handleChange}
                value={form.password}
                type="password"
              />
            </ListItem>
            <ListItem>
              Confirm password
              <InputText
                name="confirm"
                onChange={handleChange}
                value={form.confirm}
                type="password"
              />
            </ListItem>
          </List>
          <Button type="submit">Create</Button>
        </form>
      </TitleBox>
    </Default>
  );
}
