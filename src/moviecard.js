import React , { PropTypes } from 'react';

class MovieCard extends React.Component {

  constructor(props,context) {
      super(props,context);
  }
  render() {
      var genres = this.props.genres || [];
      var actors = this.props.actors || [];
    return (

        <div className="item">
          <div className="image">
            <img src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
          <div className="content">
            <a className="header"><h3 className="ui header">{this.props.name}</h3></a>
            <span><i className="dashboard icon" alt="Rank"></i>#{this.props.rank}</span>
            <div className="meta">
              <div className="ui row">
                <span><i className="wait icon"></i>{this.props.duration}</span>
              </div>
              <div className="ui row">
                <span><i className="ticket icon"></i> Genres:</span>
                <div className="ui horizontal list">
                  { genres.map( function(gen){ return <div className="item">{ gen }</div> } ) }
                </div>
              </div>

            </div>
            <div className="description">
              <p>{this.props.description}</p>
            </div>
            <div className="extra">
              <h4 className="ui header">Director</h4>
              <div className="ui row">
                <div className="ui horizontal list">
                  <div className="item">{ this.props.director }</div>
                </div>
              </div>
              <h4 className="ui header">Actor{actors.length > 1 ? 's' : ''}</h4>
              <div className="ui row">
                <div className="ui horizontal list">
                  { actors.map( function(actor){ return <div className="item">{ actor }</div> } ) }
                </div>
              </div>
            </div>
          </div>
        </div>
          )
  }

}

MovieCard.propTypes = {
  name: PropTypes.string,
  rank: PropTypes.number,
  description: PropTypes.string,
  genres: PropTypes.array,
  duration: PropTypes.string,
  director: PropTypes.string,
  actors: PropTypes.array,
}

export default MovieCard;