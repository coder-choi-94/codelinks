import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// const styles = theme => ({
//   progress: {
//     margin: theme.spacing.unit * 30,
//   },
// });



const Wrapper = styled.div`

    /* position : fixed;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%); */
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
`;
const Progress = ({size}) => {

  return (
    <Wrapper>
      <CircularProgress size={size ? size : 50}/>
    </Wrapper>
  );
}

// Progress.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Progress;
// export default withStyles(styles)(Progress);