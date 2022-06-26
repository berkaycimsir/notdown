import dynamic from 'next/dynamic';
import React from 'react';
import '@uiw/react-markdown-preview/markdown.css';
import MarkdownPreviewLoader from './MarkdownPreviewLoader';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
  loading: () => <MarkdownPreviewLoader />,
});

type Props = {
  content: string;
};

const NoteDetailsContent: React.FC<Props> = ({ content }) => {
  return <MarkdownPreview source={content} />;
};

export default NoteDetailsContent;
