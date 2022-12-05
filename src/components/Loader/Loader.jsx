import { Puff } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Puff
      height="40"
      width="40"
      radisu={1}
      color="#3f51b5"
      ariaLabel="puff-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
    />
  );
};
