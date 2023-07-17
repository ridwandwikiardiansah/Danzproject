import React, { useEffect, useState } from "react";
import Header from "../component/header";
import { Link, useParams } from "react-router-dom";
import { Card, Typography, CardContent, Grid } from "@mui/material";
import axios from "axios";
import { isEmpty } from "lodash";

const Detail = () => {
    const params = useParams();
    const [data, setData] = useState({});


    const getDetailPage = async () => {
        const getDetail = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${params.id}`)
        setData(getDetail.data)
    }
    useEffect(() => {
        getDetailPage();
    });

    return (
        <div>
            <Header />
            <hr />
            <Link to='/list' style={{ marginLeft: 10 }}> BACK </Link>
            <hr />
            <div style={{ backgroundColor: 'white', padding: 10, }}>
                <Grid container spacing={1}>
                    <Grid xs={10} marginLeft={5}>
                        <h5>{data.type}/{data.location}</h5>
                        <h3>{data.title}</h3>
                    </Grid>
                    <Grid xs={8} padding={5}>
                        <h4>{data.company}</h4>
                        <br />
                        <h4> Job Description:</h4>
                        <p>{!isEmpty(data) ? data.description.replace(/<[^>]+>/g, '') : ''}</p>
                    </Grid>
                    <Grid xs={4} padding={5}>
                        <img style={{ width: '100%', minHeight: 150 }} src='https://source.unsplash.com/random?company' alt="company_logo" />
                        <div>Website Company : <a>{data.company_url}</a></div>
                        <Card variant="outlined" style={{ marginTop: 20, borderColor: 'blue', padding: 10 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    How to apply
                                </Typography>
                                <Typography variant="body2">
                                    {!isEmpty(data) ? data.how_to_apply.replace(/<[^>]+>/g, '') : ''}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Detail;
