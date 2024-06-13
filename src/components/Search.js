import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import githubImage from '../img/github-mark-white.png';

function Search() {
    const TOKEN = process.env.REACT_APP_API_TOKEN;
    const URL = process.env.REACT_APP_API_URL;
    const options = { headers: { Authorization: `Bearer ${TOKEN}` } };

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        watch,
        handleSubmit,
    } = useForm();

    const username = watch('username');

    const getUser = async (username) => {
        try {
            const res = await axios.get(`${URL}/${username}`, options);
            if (res.status === 200) {
                setUser(res.data);
                setErrorMessage('');
            }
        } catch (error) {
            if (error.message.includes('404')) {
                setErrorMessage("User not found");
            } else {
                setErrorMessage("Some error occured, try again");
            }
            console.log(error.message);
        }
    }

    const onSubmit = async () => {
        if (username.trim().length === 0) {
            setErrorMessage('Username cannot be empty');
            return;
        }
        await getUser(username);
    }

    useEffect(() => {
        if (user !== null) {
            navigate(`/User?${searchParams}`, { state: { user } });
        }
    }, [user, navigate, searchParams]);

    useEffect(() => {
        setSearchParams({ username: username }, { replace: true });
    }, [username, setSearchParams]);

    return (
        <section className='search-content'>
            <div className='img-box'>
                <img src={githubImage} alt='github icon' />
            </div>
            <p>Welcome to Github Finder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='text'
                    placeholder='Username'
                    {...register('username',
                        {
                            required: true,
                        })}
                    autoComplete='off'
                />
                <p className='message'>{errorMessage}</p>
            </form>
        </section>
    )
}

export default Search