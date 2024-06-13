import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../App';

function User() {
    const TOKEN = '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';
    const URL = 'https://api.github.com/users';
    const options = { headers: { Authorization: `Bearer ${TOKEN}` } };

    const [searchParams] = useSearchParams();
    const [repos, setRepos] = useState([]);

    const username = searchParams.get('username');
    const { state } = useLocation();
    const user = state?.user;

    useEffect(() => {
        const getRepos = async () => {
            if (username.length > 0) {
                try {
                    const res = await axios.get(`${URL}/${username}/repos`, options);
                    setRepos(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getRepos();
    }, []);

    return (
        <>
            <section className='user-detail'>
                <div className='img-box-2'>
                    <img src={user.avatar_url} alt='user' />
                </div>
                <h1>{user.name}</h1>
                <div className='user-info'>
                    <div>
                        <p>{repos.length}</p>
                        <p>REPOSITORIES</p>
                    </div>
                    <div>
                        <p>{user.followers}</p>
                        <p>FOLLOWERS</p>
                    </div>
                    <div>
                        <p>{user.following}</p>
                        <p>FOLLOWING</p>
                    </div>
                </div>
                <a href={user.html_url} className='user-github-link'>Go to Github</a>
            </section>
            <section className='repo-container'>
                <h2>Repositories</h2>
                {repos.map(repo => (
                    <div key={repo.id} className='repo'>
                        <div className='repo-title'>
                            <a className='repo-link' href={repo.html_url}>{repo.name}</a>
                            <p className='repo-update-date'>{`Updated at ${formatDate(repo.updated_at)}`}</p>
                        </div>
                        {repo.description && <p className='repo-descrip'>{repo.description}</p>}
                    </div>
                ))}
            </section>
        </>
    )
}

export default User