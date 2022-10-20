import { useMemo, useState } from 'react';
import './styles/globals.css';

const tokens = {
  '#': (s: string) => <h1>{s.substring(1)}</h1>,
  '##': (s: string) => <h2>{s.substring(2)}</h2>,
  '---': (s: string) => (
    <>
      <hr />
      <p>{s.substring(3)}</p>
    </>
  ),
  'DEFAULT': (s: string) => <p>{s}</p>,
};

function App() {
  const [markdown, setMarkdown] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const parseMarkdown = useMemo(() => {
    const lines = markdown.split('\n');

    console.log(lines[0].substring(0, 2));

    return lines.map((line, i) => {
      const token = Object.keys(tokens).find((token) => {
        return line.substring(0, 3).startsWith(token);
      }) as keyof typeof tokens;

      return tokens[token || 'DEFAULT'](line);
    });
  }, [markdown]);

  return (
    <div>
      <textarea onChange={handleChange} value={markdown} rows={5} />
      <div>{parseMarkdown}</div>
    </div>
  );
}

export default App;
