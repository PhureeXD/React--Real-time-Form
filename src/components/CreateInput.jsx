export default function CreateInput({ handleChange, handleAdd, afterSave }) {
  const inputs = [
    { type: "text", name: "name" },
    { type: "text", name: "detail" },
    { type: "number", name: "price" },
  ];
  
  return (
    <form onSubmit={(e) => handleAdd(e)} className="flex flex-col">
      <article className="flex flex-col justify-center gap-4 mt-4 md:flex-row">
        {inputs.map((i, idx) => (
          <input
            key={idx}
            onChange={(e) => handleChange(e)}
            type={i.type}
            placeholder={i.name + "..."}
            name={i.name}
            className="px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
            value={afterSave ? "" : undefined}
          />
        ))}
      </article>

      <button
        type="submit"
        className="px-4 py-2 mt-6 font-[600] text-white transition duration-300 ease-in-out bg-green-500 rounded-full hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
