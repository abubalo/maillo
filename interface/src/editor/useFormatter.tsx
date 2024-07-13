import {  useEffect, useState, useCallback } from 'react';

type FormatType = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'link';

const useFormatter = (contentRef: React.RefObject<HTMLDivElement>) => {
  const [activeFormats, setActiveFormats] = useState<FormatType[]>([]);

  const applyFormat = useCallback((range: Range, tag: string) => {
    const element = document.createElement(tag);
    range.surroundContents(element);
  }, []);

  const formatHandlers = {
    bold: (range: Range) => applyFormat(range, 'strong'),
    italic: (range: Range) => applyFormat(range, 'em'),
    underline: (range: Range) => applyFormat(range, 'u'),
    strikethrough: (range: Range) => applyFormat(range, 's'),
    link: (range: Range) => {
      const url = prompt('Enter the URL:');
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        range.surroundContents(link);
        console.log(link);
      }
    }
  };

  const handleFormat = useCallback((type: FormatType) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      formatHandlers[type](range);
      selection.removeAllRanges();
      updateActiveFormats();
    }
  }, []);

  const isFormatActive = useCallback((format: string): boolean => {
    return document.queryCommandState(format);
  }, []);

  const updateActiveFormats = useCallback(() => {
    const formats: FormatType[] = ['bold', 'italic', 'underline', 'strikethrough'];
    setActiveFormats(formats.filter(format => isFormatActive(format)));
  }, [isFormatActive]);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('mouseup', updateActiveFormats);
      document.addEventListener('selectionchange', updateActiveFormats);
    }

    return () => {
      if (content) {
        content.removeEventListener('mouseup', updateActiveFormats);
        document.removeEventListener('selectionchange', updateActiveFormats);
      }
    };
  }, [contentRef, updateActiveFormats]);

  return { handleFormat, activeFormats };
};

export default useFormatter;