import { GetServerSideProps } from 'next';

import { setAuth } from 'redux/auth/authSlice';
import { wrapper } from 'redux/store';
import { axios } from 'shared/lib/axios';

export const loginRegisterAuthChecker: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const token = req.cookies['token'];
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.get('/auth', config);

      if (res.data) {
        store.dispatch(setAuth(res.data));

        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
          props: req,
        };
      }
    } catch (error: any) {}

    return {
      props: {},
    };
  });

export const authCheck: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const token = req.cookies['token'];
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const res = await axios.get('/auth', config);
        store.dispatch(setAuth(res.data));

        const emailVerified = res.data?.email_verified_at;
        const verifyPage = req.url?.includes('verify-email');
        const linkClicked =
          req.url?.includes('user') && req.url?.includes('verified');

        if (verifyPage && emailVerified) {
          if (linkClicked) return {  props: {}};
          return {
            redirect: {
              permanent: false,
              destination: '/',
            },
          };
        }
        if (!verifyPage && !emailVerified) {
          return {
            redirect: {
              permanent: false,
              destination: '/verify-email',
            },
          };
        }

        if (
          req.url?.includes('overview') ||
          req.url?.includes('chat') ||
          req.url?.includes('board')
        ) {
          await axios.get(
            `/api/project/${params?.id}/member/${res.data.id}`,
            config
          );
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          return {
            notFound: true,
          };
        }
        if (error.response.status === 500) {
          throw new Error('Internal Server Error');
        }
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
          props: {},
        };
      }

      return {
        props: {},
      };
    }
);
