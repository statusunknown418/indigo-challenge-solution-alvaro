import { createElement, useState } from 'react';
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

  const makeMarkdown = () => {
    const lines = markdown.split('\n');

    console.log(lines[0].substring(0, 3));

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
  };

  return (
    <div>
      <textarea onChange={handleChange} value={markdown} rows={5} />
      <div>{makeMarkdown()}</div>
    </div>
  );
}

export default App;
