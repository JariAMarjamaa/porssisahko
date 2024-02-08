import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

// The severity prop accepts four values representing different states—success 
// (the default), info, warning, and error–with corresponding icon and color combinations for each:

const WARNING_NOTIFICATION_CLOSED_KEY = 'warningNotificationClosed';

const Notication = ({ type, text }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        // Check if the notification has been closed before
        const isWarningNotificationClosed =
            type === 'warning' && sessionStorage.getItem(WARNING_NOTIFICATION_CLOSED_KEY) === 'true';
    
        setOpen(!isWarningNotificationClosed);
    }, [type]);

    const jepClicked = () => {
        // Your custom function logic here
        console.log('JEP button clicked');
  
        // Close the Alert
        setOpen(false);

        // Save in localStorage that the warning notification has been closed
        if (type === 'warning') {
            sessionStorage.setItem(WARNING_NOTIFICATION_CLOSED_KEY, 'true');
        }
    };
    
    return (
 <div>
      {open && (
        <Alert
          severity={type}
          action={
            <Button color="inherit" size="small" onClick={jepClicked}>
              JEP
            </Button>
          }
          onClose={jepClicked}
        >
          {text}
        </Alert>
      )}
    </div>
   );
  };
  
  export default Notication;

