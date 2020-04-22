import React from "react";
import { useHistory, Link } from "react-router-dom";
import Default from "../components/templates/Default";
import TitleBox from "../components/organisms/TitleBox";
import InputText from "../components/atoms/TextInput";
import Button from "../components/atoms/Button";
import List from "../components/molecules/List";
import ListItem from "../components/atoms/ListItem";
import useInput from "../helpers/hooks/useInput";

import cookies from "../helpers/cookies";

interface User {
  email: string;
  password: string;
}

export default function Signin() {
  const history = useHistory();

  const [form, handleChange, resetForm] = useInput({
    email: "cedric.pradels@gmail.com",
    password: "123456",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, email } = form;
    await signinUser({
      email,
      password,
    });
    history.push("/");
  };

  const signinUser = async (userDatas: User) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDatas),
        }
      );

      if (response.ok) {
        const token = (await response.json()).token;
        cookies.create("geekTasksToken", token);
      } else {
        throw Error(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Default>
      <TitleBox title="Sign In">
        <form onSubmit={handleSubmit}>
          <List>
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
          </List>
          <Button type="submit">Create</Button>
        </form>
      </TitleBox>
      <Link to="/signup">Sign Up ?</Link>
    </Default>
  );
}
