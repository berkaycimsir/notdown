import dynamic from 'next/dynamic';
import React from 'react';
import '@uiw/react-markdown-preview/markdown.css';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

type Props = {
  content: string;
};

const NoteDetailsContent: React.FC<Props> = ({ content }) => {
  return <MarkdownPreview source={content} />;
};

export default NoteDetailsContent;
