export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <a href="/login" className="bg-red-400">login</a>
        <a href="/tasks">tasks</a>
        <a href="/profile">profile</a>
      </div>
    </>
  );
}
