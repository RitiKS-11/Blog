import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BlogListService from "../../services/BlogListService";
import HeroBlog from "../../components/heroblog/HeroBlog";
import Post from "../../components/post/Post";
import Loading from "../../components/loading/Loading";
import makeRoute from "../../services/makeRoute";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import "./Home.css";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = localStorage.getItem("accessToken");

    const fetchData = async () => {
        try {
            const response = await BlogListService();
            if (response) {
                setData(response);
                console.log('Fetched data:', response);
                setLoading(false);
            } else {
                console.log("No response");

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const check_result = (data) => {
        if (data && data.results && data.results.length > 0) {
            return (
                <div>
                    <div className="hero">
                        <Link
                            to={`/post/${makeRoute(data.results[0].title)}`}
                            state={data.results[0]}
                            className="center-hero"
                        >
                            <HeroBlog
                                post={
                                    data.results && data.results.length > 0
                                        ? data.results[0]
                                        : null
                                }
                            />
                        </Link>
                    </div>
                    <div className="banner">Stay Curious</div>
                    <div className="blog_posts">
                        {data.results.slice(1).map((post) => (
                            <Post post={post} key={post.id} id={post.id} />
                        ))}
                    </div>
                </div>
            );
        } else {
            return <div>No Content</div>;
        }
    };
    

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            {loading ? (
                <Loading />
            ) : (
                <>
                  {check_result(data)}  
                </>
            )}
            <Footer />
        </>
    );
};

export default Home;
