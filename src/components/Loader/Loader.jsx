import { Puff } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Puff
      height="60"
      width="60"
      radisu={1}
      color="#3f51b5"
      ariaLabel="puff-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
    />
  );
};
