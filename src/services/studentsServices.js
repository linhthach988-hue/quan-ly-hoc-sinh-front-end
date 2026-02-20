import axios from "axios";
const endPoints = process.env.REACT_APP_API_BASE_URL;

export async function list() {
  const url = `${endPoints}/students`;
  console.log(url);
  const response = await axios.get(url);
  return response.data.data;
}

export async function remove(id) {
  const url = `${endPoints}/students/delete/${id}`;
  console.log(url);
  const response = await axios.get(url);
  return response.data.data;
}

export async function detail(id) {
  const url = `${endPoints}/students/${id}`;
  console.log(url);
  const response = await axios.get(url);
  return response.data.data;
}

export async function edit(id, name, className, age) {
  const url = `${endPoints}/students/${id}`;
  console.log(url);
  return await axios.post(url, {
    id,
    name,
    class_name: className,
    age: parseInt(age),
  });
}

export async function add(name, className, age) {
  const url = `${endPoints}/students`;
  console.log(url);

  return await axios.post(url, {
    name,
    class_name: className,
    age: parseInt(age),
  });
}
