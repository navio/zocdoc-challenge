import React , { PropTypes } from 'react';
import MovieCard from "./moviecard";
class Layout extends React.Component {

  constructor(props,context) {
      super(props,context);
      this.state = {movies:[],rank:[],view:[],holds:[],reset:[],direction:true}
  }

  addToHold(){
    var that = this;
    var holds = this.state.holds;
    return function(movie){
      if(holds.indexOf(movie) == -1 ) holds.push(movie)
      that.setState({holds:holds});
    }
  }

  resetTo10st(){
      this.state = {movies:[],rank:[],view:[],holds:[],reset:[],direction:true}
      $.get("https://interview.zocdoc.com/api/1/FEE/AllMovies?authToken=3b502b3f-b1ff-4128-bd99-626e74836d9c",function(res){
                this.setState({movies:res,view:res.slice(0,9)});
      }.bind(this));
  }

  renderSortBy(term){
      let movies = this.state.movies;
      let direction = this.state.direction;
      let sort_by = function(field, reverse, primer){
                       var key = primer ?
                           function(x) {return primer(x[field])} :
                           function(x) {return x[field]};

                       reverse = !reverse ? 1 : -1;

                       return function (a, b) {
                           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                         }
                    }
      let sort = movies.sort(sort_by(term,direction));
      this.setState({view:sort,direction:!direction});
  }

  renderMoviesName(el){
    let term =  el['target'].value;
    let movies = this.state.movies;

    let movieList = movies.map(function(movie){
      return movie['Name'].match(new RegExp(term)) ? movie : null;
    });

    // let results = movieList.find(containName);

    this.setState({view:movieList});
  }



  componentDidMount(){
      this.resetTo10st();
  }

  render() {
    let movies = this.state.view;
    let holds = this.state.holds;
    let add = this.addToHold();
    let rank10 = this.resetTo10st.bind(this);
    let sortDirector = this.renderSortBy.bind(this,'Director');
    let sortRaiting = this.renderSortBy.bind(this,'Rank');
    let renderMoviesName = this.renderMoviesName.bind(this);


    return (
      <div>
      <div className="ui secondary  menu">
          <a className="active item">
            Top 10
          </a>
          <a className="item" onClick={sortDirector} >
            By Director
          </a>
          <a className="item" onClick={sortRaiting} >
            By Raiting
          </a>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                /<input type="text" placeholder="Search Movies"  /> //onChange={ renderMoviesName }
                <i className="search link icon"></i>
              </div>
            </div>
            <a className="ui item" onClick={rank10} >
              Reset
            </a>
          </div>
        </div>
        {holds.length > 0 ?
        <div className="ui tall stacked segment">
          <div className="ui items">
            {
              holds.map(function(hold){
                return <MovieCard name={hold['Name']}
                                  duration={hold["Duration"]}
                                  genres={hold["Genres"]}
                                  description={hold["Description"]}
                                  rank={hold["Rank"]}
                                  actors={hold["Actors"]}
                                  director={hold["Director"]}
                                  action={add}
                                  movie={hold}
                                  added={true}
                                  />
              })
            }
          </div>
        </div>
        : null
        }

        <div className="ui items">
          {
            movies.map(function(movie){
              return <MovieCard name={movie['Name']}
                                duration={movie["Duration"]}
                                genres={movie["Genres"]}
                                description={movie["Description"]}
                                rank={movie["Rank"]}
                                actors={movie["Actors"]}
                                director={movie["Director"]}
                                action={add}
                                movie={movie}
                                />
            })
          }
        </div>
      </div>
          )
  }

}

Layout.contextTypes= {

};

export default Layout;
