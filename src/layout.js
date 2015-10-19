import React , { PropTypes } from 'react';
import MovieCard from "./moviecard";
class Layout extends React.Component {

  constructor(props,context) {
      super(props,context);
      this.state = {movies:[],rank:[],view:[]}
  }

  renderTopRank(){
      let rank = this.state.movies;
      this.setState({view:rank.slice(0,9)});
  }

  renderSortBy(term,direction){
      let movies = this.state.movies;
      let sort_by = function(field, reverse, primer){
                       var key = primer ?
                           function(x) {return primer(x[field])} :
                           function(x) {return x[field]};

                       reverse = !reverse ? 1 : -1;

                       return function (a, b) {
                           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                         }
                    }
      let sort = movies.sort(sort_by(term,direction))
      this.setState({view:rank.slice(0,9)});
  }

  renderWithActor(actor){
    let movies = this.state.movies;
    let hasActor = function(element, index, array){
                      return element['Actors'].indexOf(actor) > -1 ? true : false
                    }
    this.setState({view:movies.find(hasActor)});
  }

  componentDidMount(){
      $.get("https://interview.zocdoc.com/api/1/FEE/AllMovies?authToken=3b502b3f-b1ff-4128-bd99-626e74836d9c",function(res){
                this.setState({movies:res,view:res.slice(0,9)});
      }.bind(this));
  }

  render() {
    let movies = this.state.view;
    return (
      <div>
      <div className="ui secondary  menu">
          <a className="active item">
            Top 10
          </a>
          <a className="item">
            By Director
          </a>
          <a className="item">
            By Raiting
          </a>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search Movies" />
                <i className="search link icon"></i>
              </div>
            </div>
            <a className="ui item">
              Reset
            </a>
          </div>
        </div>
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
