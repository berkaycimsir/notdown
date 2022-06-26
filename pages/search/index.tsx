import { SearchRounded } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import { debounce } from 'lodash';
import React from 'react';
import Input from '../../components/ui/Input';
import SearchTabs from '../../components/ui/Search/SearchTabs';
import { useDebouncedValue } from '../../hooks/useDebounce';

const Search = () => {
  const [search, setSearch] = React.useState<string>('');

  const onSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebouncedValue(search.trim(), 300);

  return (
    <Container maxWidth="md">
      <Input
        value={search}
        onChange={onSearchChange}
        containerProps={{ sx: { borderRadius: 12, px: 2 } }}
        fullWidth
        placeholder="Search"
        endIcon={<SearchRounded />}
      />
      <SearchTabs search={debouncedSearch} />
    </Container>
  );
};

export default Search;
