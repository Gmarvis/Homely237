'use client';
import { useState } from 'react';
import FormInput from '../atoms/FormInput';
import { SIGNUP } from '@/utils/queries';
import Spinner from '../atoms/Spinner';
import { IoWarningOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { decodeToken } from '@/utils/jwtDecode';

// STORE IMPORTS
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import FormBtn from '../atoms/buttons/FormBtn';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassoword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setUser } = useUserStore();
    const router = useRouter();

    const handleSignUp = (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password) {
            setError('pleace fill the form completely');
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }
        SIGNUP({ name, email, password }).then((res: any) => {
            if (res.token) {
                // SAVE TOKEN TO LOCALSTORAGE SO I CAN BE DECODED LETTER AND USED
                localStorage.setItem('token', res.token);
                // DECODE TOKEN AND PASS USER DATE TO APP STORE
                const userData = decodeToken(res.token);
                setUser(userData);
                console.log(userData);
                router.push('/');
                setLoading(false);
            } else {
                setError(`${res.message} try to login`);
                setLoading(false);
                setTimeout(() => {
                    setError('');
                }, 5000);
                return;
            }
        });
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h3 className="font-bold text-[24px]">Create Your Account</h3>
            <form
                onSubmit={handleSignUp}
                className="max-w-[25vw] w-[20vw] p-2 flex flex-col mobile:max-sm:w-[95vw] mobile:max-sm:max-w-[95vw] gap-3"
            >
                <FormInput
                    label={'Name'}
                    onChange={(e: { target: { value: any } }) => setName(e.target.value)}
                />
                <FormInput
                    label={'Email'}
                    onChange={(e: { target: { value: any } }) => setEmail(e.target.value)}
                />

                <FormInput
                    label={'Password'}
                    onChange={(e: { target: { value: any } }) => setPassoword(e.target.value)}
                />

                <FormBtn title="Signup" onClick={() => handleSignUp} isLoading={loading} />
                {error && (
                    <motion.p
                        initial={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-red-300 p-4 flex justify-center items-center text-xs gap-1 mobile:max-sm:mb-4"
                    >
                        <IoWarningOutline
                            style={{
                                color: 'yellow'
                            }}
                            size={20}
                        />

                        {error}
                    </motion.p>
                )}
            </form>
        </div>
    );
};

export default SignUp;
