import { List, ListItem } from '@mui/material';
import React from 'react';
import {
  GetAuthorsByNameUserFragment,
  useGetAuthorsByNameQuery,
} from '../../../../generated/graphql';
import AuthorCard from './AuthorCard';
import AuthorCardSkeleton from './AuthorCardSkeleton';

type Props = {
  search: string;
};

const SearchAuthors: React.FC<Props> = ({ search }) => {
  const { data, loading } = useGetAuthorsByNameQuery({
    variables: { searchString: search },
  });

  if (loading || !data) return <AuthorCardSkeleton />;

  return (
    <div>
      <List disablePadding>
        {(data.getAuthorsByName || []).map(
          (author) =>
            author && (
              <ListItem disablePadding key={author.id}>
                <AuthorCard author={author} />
              </ListItem>
            )
        )}
      </List>
    </div>
  );
};

export default SearchAuthors;
