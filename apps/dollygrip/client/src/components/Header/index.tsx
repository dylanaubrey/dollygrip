import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import type { Location } from 'history';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useConfig from '../../hooks/useConfig';
import usePrevious from '../../hooks/usePrevious';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuSpacing: {
      marginRight: theme.spacing(2),
    },
    primaryMenuItem: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
  })
);

const viewColorMap = {
  default: 'primary',
  search: 'default',
} as const;

const Header = () => {
  const { routes } = useConfig();
  const history = useHistory();
  const { location } = history;
  const previousLocation = usePrevious<Location>({ ...location });
  const defaultActiveView = location.pathname === routes.searchResults ? 'search' : 'default';
  const [activeView, setActiveView] = useState<'default' | 'search'>(defaultActiveView);
  const isSearchView = activeView === 'search';
  const classes = useStyles();

  const renderDefaultView = () => (
    <>
      {location.pathname === routes.root && (
        <IconButton aria-label="menu" className={classes.menuSpacing} color="inherit" edge="start">
          <MenuIcon />
        </IconButton>
      )}
      <Typography className={classes.primaryMenuItem} variant="h6">
        Dollygrip
      </Typography>
      <IconButton
        aria-label="search"
        color="inherit"
        edge="end"
        onClick={() => {
          setActiveView('search');
        }}
      >
        <SearchIcon />
      </IconButton>
    </>
  );

  const renderSearchBarView = () => <SearchBar setActiveView={setActiveView} />;

  return (
    <header className={`Header ${classes.root}`}>
      <AppBar color={viewColorMap[activeView]} position="static">
        <Toolbar>
          {location.pathname !== routes.root && (
            <IconButton
              aria-label="back"
              className={classes.menuSpacing}
              color="inherit"
              edge="start"
              onClick={() => {
                history.push(
                  {
                    hash: previousLocation?.hash ?? '',
                    pathname: previousLocation?.pathname ?? routes.root,
                    search: previousLocation?.search ?? '',
                  },
                  previousLocation?.state
                );
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {isSearchView ? renderSearchBarView() : renderDefaultView()}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
