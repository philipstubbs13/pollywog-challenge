// Global import of React.
import React from 'react';
// import styling and components from material ui library.
import Typography from '@material-ui/core/Typography';

// Function based component for Loading.
// This will display while waiting for UI to render/grab artwork data from IndexedDB.
function Loading() {
  return (
    <div>
      <Typography variant="h4">Loading...</Typography>
    </div>
  );
}

// export Loading component.
export default Loading;
