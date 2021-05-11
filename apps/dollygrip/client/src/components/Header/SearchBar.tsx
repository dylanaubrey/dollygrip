import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { isString } from 'lodash';
import qs from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuSpacing: {
      marginRight: theme.spacing(2),
    },
    searchBar: {
      alignItems: 'center',
      backgroundColor: theme.palette.grey[200],
      display: 'flex',
      flexGrow: 1,
      marginRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    searchInput: {
      flexGrow: 1,
    },
  })
);

export type Props = {
  setActiveView: (view: 'default') => void;
};

const Search = ({ setActiveView }: Props) => {
  const { routes } = useConfig();
  const history = useHistory();
  const { location } = history;
  const { keyphrase = '' } = qs.parse(location.search);
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState(isString(keyphrase) ? keyphrase : '');
  const classes = useStyles();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      inputRef.current = undefined;
    };
  }, []);

  return (
    <>
      <div className={classes.searchBar}>
        <SearchIcon className={classes.menuSpacing} color="action" />
        <InputBase
          autoFocus
          className={classes.searchInput}
          inputProps={{ 'aria-label': 'search' }}
          inputRef={inputRef}
          onChange={event => {
            setInputValue(event.target.value);
          }}
          onKeyDown={event => {
            if (event.code === 'Enter' && !!inputValue) {
              history.push(
                {
                  pathname: routes.searchResults,
                  search: `?keyphrase=${inputValue}`,
                },
                {
                  keyphrase: inputValue,
                }
              );
            }
          }}
          placeholder="Search…"
          value={inputValue}
        />
      </div>
      {location.pathname !== routes.searchResults && (
        <IconButton
          aria-label="close"
          color="inherit"
          edge="end"
          onClick={() => {
            setActiveView('default');
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </>
  );
};

export default Search;
