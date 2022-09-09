import React, { useEffect, useState } from 'react';
import styles from './ErrorPopup.module.scss';

const ErrorPopup = ({ open }: { open: boolean }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setTimeout(() => setIsVisible(false), 5000);
  }, []);

  return (
    <>{isVisible && <div className={styles.root}>Some Error Occurred</div>}</>
  );
};

export default ErrorPopup;
