import { useState } from "react";

function LoginStatus() {
  const [name, setName] = useState("Uddin");
  const [age, setAge] = useState(20);
  const [isLogin, setIsLogin] = useState(true);
  const [items, setItems] = useState(["React", "Vue", "Angular"]);
  const [user, setUser] = useState({ name: "Uddin", age: 20 });
}
