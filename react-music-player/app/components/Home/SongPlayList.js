import React, {
	Component
} from 'react';
import request from '../../util/request';
import API from '../../util/API';
import 'babel-polyfill';
import {
	Link
} from 'react-router-dom';
import Loading from '../Common/Loading';
export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// 是否已经加载完成
			loaded: false
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		try {
			let response_song_play = await request.asyncGet(API.getRecommendSong());
			let data_song_play = await response_song_play.json();
			// albums action
			// /actions/music.getAlbums()
			this.props.albumActions.getAlbums(data_song_play.plist.list);
			// 重设加载状态为完成
			this.setState({
				loaded: true,
			});
		} catch (err) {
			console.error("Error", err);
		}

	}

	render() {
		// console.log('SongPlayList render>>', this.props)
		if (this.state.loaded) {
			const songPlay = this.props.totalAlbums.info.map((ele, index) => {
				if (index < 9) {
					return (
						<li key={index}>
							<Link to={`/album/${ele.specialid}`} >
								<img src={ele.imgurl.replace(/\{size\}/g,400)}/>
								<p>{ele.specialname}</p>
								<div className="albumTips">
									<i className="icon-headset"></i>
									<span>{ele.playcount > 9999 ? 
										(ele.playcount / 10000).toFixed(2) + '万': 
										ele.playcount}</span>
								</div>
							</Link>
						</li>
					)
				}
			});

			return (
				<ul className="songPlay">
					{songPlay}
				</ul>
			)
		} else {
			return(<Loading />)
		}
	}
}
