
import { useLocalStorage } from "../hooks/useLocalStorage";

function StorageDemo() {
  const [name, setName] = useLocalStorage("portfolio-name", "");

  return (
    <section className="space-y-4 p-6">
      <h2 className="text-xl font-bold">
        Persistent Profile
      </h2>

      <label htmlFor="name">Your display name</label>

      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
        className="rounded border px-3 py-2"
      />

      <p>Hello, {name || "Developer"}!</p>
    </section>
  );
}

export default StorageDemo;
