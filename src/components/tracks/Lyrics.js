import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };
  componentDidMount = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MMKEY}`
      )
      .then(res => {
        // this.setState({ track_list: res.data.message.body.track_list });
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MMKEY}`
        );
      })
      .then(res => this.setState({ track: res.data.message.body.track }))
      .catch(err => console.log(err));
  };
  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID: {track.album_id}</strong>
            </li>
            <li className="list-group-item">
              <strong>Album Name: {track.album_name}</strong>
            </li>
            <li className="list-group-item">
              <strong>Artist Name: {track.artist_name}</strong>
            </li>
            <li className="list-group-item">
              <strong>Explicit: {track.explicit === 0 ? "No" : "Yes"} </strong>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
