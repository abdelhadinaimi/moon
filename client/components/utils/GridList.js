import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router-dom';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  imgStyle: {
    height:'100%',
    width:'100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left:'50%'
  }
};

const rootLink = "/api/media/";

const GridListComponent = ({tilesData}) => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.mediaid}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)"/></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <Link to={"/media/"+tile.mediaid} style={{}}>
            <img src={tile.type === 'pi' ? rootLink+tile.mediaid : rootLink+tile.thumbnail} style={styles.imgStyle}/>
          </Link>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListComponent;
