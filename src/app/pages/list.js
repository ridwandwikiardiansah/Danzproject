import axios from "axios";
import React from "react";
import { concat, isEmpty, map } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../component/header";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const style = {
    border: "1px solid blue",
    borderRadius: 10,
    padding: 8,
    marginTop: 10
};

class list extends React.Component {
    state = {
        items: Array.from({ length: 5 }),
        job: [],
        page: 1,
        desc: '',
        loc: '',
        type: false
    };

    async componentDidMount() {
        const getJob = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json')
        this.setState({
            job: getJob.data
        })
    }

    fetchMoreData = async () => {
        setTimeout(async () => {
            const getMoreJob = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${this.state.page + 1}`)
            this.setState({
                job: concat(this.state.job, getMoreJob.data)
            });
        }, 1500);
    };

    onchangeDesc = (e) => {
        this.setState({
            desc: e.target.value
        })
    }

    onchangeLoc = (e) => {
        this.setState({
            loc: e.target.value
        })
    }

    onPressSearch = async () => {
        if (!isEmpty(this.state.desc) && isEmpty(this.state.loc)) {
            const getJob = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${this.state.desc}`)
            this.setState({
                job: getJob.data
            })
        } else if (!isEmpty(this.state.loc) && isEmpty(this.state.desc)) {
            const getJob = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?location=${this.state.loc}`)
            this.setState({
                job: getJob.data
            })
        } else {
            const getJob = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${this.state.desc}&location=${this.state.loc}`)
            this.setState({
                job: getJob.data
            })
        }
    }


    render() {
        console.log(this.state.job)
        return (
            <div>
                <Header />
                <hr />
                <div style={{ padding: 20 }}>
                    <Grid container spacing={2} rowGap={2} direction={'row'} width={'100%'}>
                        <Grid item xl={8}>
                            <TextField
                                id="outlined-required"
                                label="Description"
                                onChange={this.onchangeDesc}
                            />
                        </Grid>
                        <Grid item xl={8}>
                            <TextField
                                id="outlined-required"
                                label="Location"
                                onChange={this.onchangeLoc}
                            />
                        </Grid>
                        <Grid item xl={4}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Full Time Only" />
                            </FormGroup>
                        </Grid>
                        <Grid item xl={4}>
                            <Button variant="contained" onClick={this.onPressSearch}>Search</Button>
                        </Grid>
                    </Grid>
                    {
                        !isEmpty(this.state.desc) || !isEmpty(this.state.loc) ? (
                            <h3>Search Results : {this.state.job.length} Job</h3>
                        ) : null
                    }
                    {
                        !isEmpty(this.state.job) ? (
                            <InfiniteScroll
                                dataLength={this.state.items.length}
                                next={this.fetchMoreData}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                            >
                                {map(this.state.job, (i, index) => (
                                    <div>
                                        {
                                            i !== null ? (
                                                <Link to={{
                                                    pathname: `/detail/${i.id}`,
                                                    state: i.id,
                                                }} style={{ textDecoration: 'none', color: '#000' }}>
                                                    <div style={style} key={index}>
                                                        <h3>{i.title}</h3>
                                                        <h5>{i.company} - {i.type}</h5>
                                                    </div>
                                                </Link>
                                            ) : null
                                        }
                                    </div>

                                ))}
                            </InfiniteScroll>
                        ) : null
                    }

                </div>
            </div>
        );
    }
}

export default list;
