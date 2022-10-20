import { createElement, useMemo, useState } from 'react';
import './styles/globals.css';

const tokens = {
  '#': 'h1',
  '##': 'h2',
  '---': 'hr',
  'DEFAULT': 'p',
};

function App() {
  const [markdown, setMarkdown] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const makeMarkdown = useMemo(() => {
    const lines = markdown.split('\n');

    return lines.map((line, i) => {
      const newLine = line.replace(/[#-]/g, '');

      const findToken = Object.keys(tokens).find((token) => {
        return line.substring(0, 3).replace(/\s/g, '').replace(/[a-z]/g, '') === token;
      }) as keyof typeof tokens;

      if (!findToken) {
        return createElement(tokens.DEFAULT, { key: i }, newLine);
      }

      if (findToken === '---') {
        return createElement(tokens[findToken], { key: i });
      }

      return createElement(tokens[findToken], { key: i }, newLine);
    });
  }, [markdown]);

  return (
    <div
      className="w-full h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate 
      flex flex-col min-h-screen items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center gap-10 p-5 rounded-lg bg-white/40 backdrop-filter backdrop-blur">
        <h1 className="font-black text-white">Markdown Live Editor</h1>

        <section className="grid grid-cols-2 gap-10">
          <textarea
            className="p-4 rounded-lg border bg-neutral-100/60 placeholder:text-neutral-500 font-mono text-sm"
            placeholder="Write some markdown here..."
            onChange={handleChange}
            value={markdown}
            rows={5}
          />

          <article className="relative">
            <p className="text-xs absolute -top-4 text-neutral-100 font-bold">Preview</p>
            <div className="bg-white p-4 rounded-lg shadow-md truncate overflow-scroll max-w-md h-full">
              {makeMarkdown}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;
