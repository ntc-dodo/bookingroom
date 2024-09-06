import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

function AccessEdit() {
  const [nameacces, setNameacces] = useState("");
  const [amountacces, setAmountacces] = useState("");

  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [iduser, setIduser] = useState("");

  const [prevAccesdata, setPrevAccesdata] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/showacces/" + id)
      .then(res => {
        const accesData = res.data[0];

        setNameacces(accesData.name_acces);
        setAmountacces(accesData.amount_acces);
      })
      .catch((err) => console.log(err));
  }, [id]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/admin")
      .then((res) => {
        if (res.data.Status === "OK") {
          setAuth(true);
          setFirstname(res.data.firstname);
          setIduser(res.data.iduser);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, []);

  const handleSubmitEditAccess = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/accesedit/" + id, {
        nameacces,
        amountacces
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          navigate("/accessorie");
          Swal.fire({
            icon: "success",
            title: "แก้ไขสำเร็จ",
          });
        } else if (res.data.Error === "Update fail") {
          Swal.fire({
            icon: "error",
            title: "แก้ไขไม่สำเร็จ",
          });
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          {prevAccesdata.map((data, i) => (
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit room {data.nameacces}
            </h2>
          ))}
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="Edit-page">

            <form onSubmit={handleSubmitEditAccess}>
              <div className="textbox">
                <label htmlFor="email">ชื่อห้อง</label>
                <input
                  type="text"
                  required
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nameacces}
                  onChange={(event) => {
                    setNameacces(event.target.value);
                  }}
                />
              </div>

              <div className="textbox">
                <label htmlFor="email">ชื่อห้อง</label>
                <input
                  type="text"
                  placeholder="qwdqwd"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={amountacces}
                  required
                  onChange={(event) => {
                    setAmountacces(event.target.value);
                  }}
                />
              </div>
              <div className="w-48 sm:mx-auto sm:w-full sm:max-w-sm mt-5 flex justify-between">
                <button
                  className=" bg-blue-500  hover:bg-blue-400 p-2 rounded-md"
                  type="submit"
                >
                  ยืนยันการแก้ไข
                </button>
                <Link
                  className="bg-red-500  hover:bg-red-300  p-2 rounded-md"
                  to={"/accessorie"}
                >
                  ยกเลิก
                </Link>
              </div>

            </form>

          </div>
        </div>


      </div>
    </>
  );
}

export default AccessEdit;
