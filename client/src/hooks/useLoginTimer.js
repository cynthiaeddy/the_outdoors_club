import { useState, useEffect } from 'react';

const useLoginTimer = () => {
  const [isWalking, setIsWalking] = useState(false);// initial state of the walking is false

  //start walking is a function that execcutes when our state is true.
  const startWalking = () => {
    setIsWalking(true);
  };

//we stop walking when our state is false
  const stopWalking = () => {
    setIsWalking(false);
  };

//useEffect is a react hook that makes a function re-render or execute again if our "state" has changed.
//that is why it is named as a dependency
  useEffect(() => {
    //our walking state is true
    if (isWalking) {
      alert('Walking...');
    } else {
      alert('Not walking');
    }
  }, [isWalking]);// here . Here is our dependency.

// so this useEffect takes place if it logs/ notices any changes in our isWalking state.

  return { isWalking, startWalking, stopWalking };
};

export default useLoginTimer;
