import { List } from '@mui/material';
import React from 'react';
import { useGetNotesByTitleQuery } from '../../../generated/graphql';
import HomeNoteListItemSkeleton from '../Home/HomeNoteListItemSkeleton';
import HomeNoteListItem from '../Home/HomeNoteListItem';

type Props = {
  search: string;
};

const SearchArticles: React.FC<Props> = ({ search }) => {
  const { data, loading } = useGetNotesByTitleQuery({
    variables: { title: search },
  });

  const notes = data?.getNotesByTitle;

  return (
    <List disablePadding>
      {loading
        ? [0, 1].map((i) => <HomeNoteListItemSkeleton key={i} />)
        : (notes || []).map((note, i) => (
            <HomeNoteListItem
              shouldRenderDivider={(notes || []).length - 1 !== i}
              note={note}
              key={note?.id}
            />
          ))}
    </List>
  );
};

export default SearchArticles;
