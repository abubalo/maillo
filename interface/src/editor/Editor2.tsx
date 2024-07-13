import { useRef, useEffect, useState } from 'react';
import Formatter from './Formatter';

const Editor2: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [formatter, setFormatter] = useState<Formatter | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const newFormatter = new Formatter('bold', '');
      setFormatter(newFormatter);
    }
  }, []);

  useEffect(() => {
    const updateActiveFormats = () => {
      if (formatter) {
        setActiveFormats(formatter.getActiveFormats());
      }
    };

    document.addEventListener('selectionchange', updateActiveFormats);
    return () => {
      document.removeEventListener('selectionchange', updateActiveFormats);
    };
  }, [formatter]);

  const handleFormat = (type: string) => {
    if (formatter) {
      formatter.type = type;
      formatter.handleSelection();
    }
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => handleFormat('bold')} className={activeFormats.includes('bold') ? 'active' : ''}>Bold</button>
        <button onClick={() => handleFormat('italic')} className={activeFormats.includes('italic') ? 'active' : ''}>Italic</button>
        {/* Add more buttons for other formatting options */}
      </div>
      <div ref={contentRef} className="content" contentEditable>
        Edit this text...
      </div>
    </div>
  );
};

export default Editor2;