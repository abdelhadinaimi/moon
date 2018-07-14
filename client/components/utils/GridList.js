import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router-dom';
import  {CardText} from 'material-ui/Card';
const fetchTypes = {
  popularAll:{
    gridListCols : 1,
    style:{
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    }
  },
  popularAllCat: {
    gridListCols : 4,
    style:{
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    }
  },
  searchMedia: {
    gridListCols : 4,
    style:{
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    }
  },
  recentAll : {
    gridListCols : 4,
    style:{
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    }
  },
  popularUser : {
    gridListCols : 1
  },
  recentUser : {
    gridListCols : 1,
    style:{
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    }
  },
  similarMedia : {
    gridListCols : 1
  }
};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  imgStyle: {
    height:'100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left:'50%'
  }
};

const rootLink = "/api/media/";
class GridListComponent extends React.Component{

  render(){
    const {tilesData,display} = this.props;
    const fetchType = fetchTypes[display];
    return(
      !tilesData.error ?
        (<div style={styles.root}>
          <GridList style={fetchType.style}
            cellHeight={180}
            cols={fetchType.gridListCols}>
            {tilesData.map((tile) => (
              <GridTile
                key={tile.mediaid}
                title={tile.title}
                titleStyle={styles.titleStyle}
                subtitle={<span>by <Link to={'/profile/'+tile.username}><b>{tile.username}</b></Link></span>}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <Link to={"/media/"+tile.mediaid} style={{}}>
                  <img src={tile.type === 'pi' ? rootLink+tile.mediaid : rootLink+tile.thumbnail} style={styles.imgStyle}/>
                </Link>
              </GridTile>
            ))}
          </GridList>
        </div>)
        :
        (<CardText>{tilesData.error}</CardText>)
    );
  }
}


export default GridListComponent;
