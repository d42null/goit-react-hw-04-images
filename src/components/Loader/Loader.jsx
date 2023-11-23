import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';
export const Loader = ({ visible }) => (
  <>
    {visible && (
      <LoaderContainer>
        <RotatingLines
          strokeColor="#303f9f"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={visible}
        />
      </LoaderContainer>
    )}
  </>
);
Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
