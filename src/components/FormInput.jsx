import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import CreateInput from "./CreateInput";
import Theme from "./Theme";
import { TiCancel } from "react-icons/ti";

export default function FormInput() {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [editID, setEditID] = useState("");
  const [afterSave, setAfterSave] = useState(false);

  function handleChange(e) {
    setAfterSave(false);
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.detail || !form.price) {
      alert("Fill all please.");
      return;
    }
    setAfterSave(true);
    try {
      await addDoc(collection(db, "mycollection"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({});
    } catch (error) {
      console.log(error);
    }
  }

  function LoadDataBest() {
    const q = query(collection(db, "mycollection"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mydata = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setData(mydata);
    });
    return () => unsubscribe;
  }
  //! realtime
  useEffect(() => {
    LoadDataBest();
  }, []);

  async function handleDel(id) {
    try {
      await deleteDoc(doc(collection(db, "mycollection"), id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setEditID("");
    setForm({});
  }

  async function handleSave(id) {
    try {
      await updateDoc(doc(collection(db, "mycollection"), id), form);
      setEditID("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-4 ">
        <section className="flex flex-col items-center justify-center w-full p-8">
          <h1 className="text-3xl font-[700] underline mb-4 relative text-center">
            Real-time Form
          </h1>
          <Theme />

          <CreateInput
            handleChange={handleChange}
            handleAdd={handleAdd}
            afterSave={afterSave}
          />
          {/* Table */}
          <div className="w-full mt-4">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="text-sm"></th>
                  <th className="text-sm">Name</th>
                  <th className="text-sm">Detail</th>
                  <th className="text-sm">Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr className="font-[500]" key={idx}>
                    <th>{idx + 1}</th>
                    {editID === item.id ? (
                      <>
                        <input
                          value={
                            form.name !== undefined ? form.name : item.name
                          }
                          onChange={(e) => handleChange(e)}
                          type="text"
                          placeholder="name..."
                          name="name"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <input
                          value={
                            form.detail !== undefined
                              ? form.detail
                              : item.detail
                          }
                          onChange={(e) => handleChange(e)}
                          type="text"
                          placeholder="detail..."
                          name="detail"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <input
                          value={
                            form.price !== undefined ? form.price : item.price
                          }
                          onChange={(e) => handleChange(e)}
                          type="number"
                          placeholder="price..."
                          name="price"
                          className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </>
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{item.detail}</td>
                        <td>{item.price}</td>
                      </>
                    )}

                    <td className="grid md:grid-cols-2 md:max-w-[200px]">
                      {editID === item.id ? (
                        <>
                          <button
                            onClick={() => handleCancel()}
                            className="md:mr-2 btn btn-error hover:opacity-75"
                          >
                            <TiCancel />
                          </button>
                          <button
                            onClick={() => handleSave(item.id)}
                            className="btn btn-success"
                          >
                            <FaRegSave />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDel(item.id)}
                            className="md:mr-2 btn btn-error hover:opacity-75"
                          >
                            <MdDeleteOutline />
                          </button>
                          <button
                            onClick={() => setEditID(item.id)}
                            className="btn btn-info"
                          >
                            <FaRegEdit />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
