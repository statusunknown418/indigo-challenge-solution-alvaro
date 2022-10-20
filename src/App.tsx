function App() {
  return (
    <div>
      <textarea onChange={(e) => console.log(e.target.value)} rows={5} />
    </div>
  );
}

export default App;
