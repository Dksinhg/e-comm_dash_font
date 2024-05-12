import { useEffect, useState } from "react";
import "./footer.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const getId = `http://localhost:5000/companylist`;
const updateurl =`http://localhost:5000/companylist`

const Updateproduct = () => {
  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  //  console.log(value.name)
  useEffect(() => {
    axios
      .get(`${getId}/${id}`)
      .then((res) => {
        setValues(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const getProductDetails = async () => {
  //   // try {
  //   //   let result = await fetch(`http://localhost:5000/companylist/${params.id}`)
  //   //   // console.log(params.id)
  //   //   result = await result.json();
  //   //   setValues(result.data)
  //   // } catch (error) {
  //   //   console.log(error)
  //   // }
  // };
  
  // console.log(values)

  const updateProduct = async (event) => {
    event.preventDefault();
    axios
    .put(`${updateurl}/${id}`, values)
    .then((res) => {
      // console.log(res.data);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });

    //   // console.log(name, price, category, company)
    //  let result = await fetch(`http://localhost:5000/companylist/${params.id}`,{
    //   method:'Put',
    //   // body:JSON.stringify({name, price, category, company}),
    //   headers:{
    //     'Content-Type':'Application/json'
    //   }
    //  });
    //  result = await result.json()
    //   console.log(result)

    navigate("/");
  };

  return (
    <>
      <h1> Update Products</h1>
      <input type="text"
       name="name" 
       value={values.name} 
       onChange={handler} />

      <input
        type="number"
        name="price"
        value={values.price}
        onChange={handler}
      />

      <input
        type="text"
        name="category"
        value={values.category}
        onChange={handler}
      />

      <input
        type="text"
        name="company"
        value={values.company}
        onChange={handler}
      />

      <br></br>
      <button onClick={updateProduct} className="Addbutton">
        Update product{" "}
      </button>
    </>
  );
};

export default Updateproduct;
